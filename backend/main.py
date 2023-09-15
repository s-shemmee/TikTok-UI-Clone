from flask import Flask, request, jsonify, send_file
from flask_cors import cross_origin , CORS
import os
from flask_sqlalchemy import SQLAlchemy
import glob
from faker import Faker  # Import Faker
from clipdrop_gen import clipdrop_get_image
import base64
from io import BytesIO
from achievement_gen import getgpt
import json

app = Flask(__name__)
fake = Faker()  
app.app_context()
CORS(app)

@cross_origin
@app.route('/gen-new-storefront-images', methods=['POST']) #changes
def gen_new_storefront_image():
    user_id = request.args.get('user_id')
    shop_theme = request.args.get('shop_theme')
    print(user_id)
    user = User.query.get(user_id)
    recommendations = dict(user.recommendations ) 
    if shop_theme not in recommendations.keys():
        return jsonify({'error' : 'Mismatch of Themes'}) , 404
    
    
    position_dict = {
        0: "bottom left",
        1: "top left",
        2: "bottom right",
        3: "top right"
    }
    
    for theme, items in recommendations.items():
        image_name = str(user.name) + "_" + str(theme)
        item_string = ", ".join(f"{item} at the {position_dict[idx]}" for idx, item in enumerate(items))
        formatted_string = f'Inside of a store that displays {item_string} one of each item only without any other items. Super realistic. Ultra HD, minimalistic, no clutter.'
        new_storefront = Storefront(
            name=image_name,
            description=formatted_string,
            style=theme,
            storefront_image_name=image_name,
            storefront_image_binary=clipdrop_get_image(formatted_string), 
            user=user  
        )
        db.session.add(new_storefront)
        db.session.commit()
        
    return jsonify({'user name': user.name , 'recommendations' : recommendations })
@cross_origin
@app.route('/get-user-storefront-images', methods=['GET'])
def get_storefront_images():
    
    user_id= request.args.get('user_id')
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    storefronts = Storefront.query.filter_by(user=user).all()
    
    if not storefronts:
        return jsonify({'message': 'No storefront images found for this user'})
    
    storefront_images = [
        {
            'name': storefront.name,
            'description': storefront.description,
            'style': storefront.style,
            'storefront_image_name': storefront.storefront_image_name,
            'storefront_image_binary': base64.b64encode(storefront.storefront_image_binary).decode('utf-8'),
        }
        for storefront in storefronts
    ]
    
    return jsonify({'user name': user.name, 'storefront_images': storefront_images })

@cross_origin
@app.route('/download-user-storefront-image', methods=['GET'])
def download_storefront_image():
    user_id = request.args.get('user_id')
    storefront_id = request.args.get('storefront_id')  # Assuming you have an identifier for each storefront

    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    storefront = Storefront.query.filter_by(id=storefront_id, user=user).first()
    if storefront is None:
        return jsonify({'error': 'Storefront not found for this user'}), 404

    # Send the storefront image as a download

    return send_file(BytesIO(storefront.storefront_image_binary), mimetype='image/png')

@cross_origin
@app.route('/get-all-user-storefront-image', methods=['GET'])
def get_all_storefront_image():
    user_id = request.args.get('user_id')
    storefronts = Storefront.query.filter_by(user_id=user_id).all() 
    if storefronts is None:
        return jsonify({'error' : 'achievements not found'}) ,404
    # Create a list of dictionaries representing storefront attributes
    storefront_list = [
        {
            'id': storefront.id,
            'name': storefront.name,
            'description': storefront.description,
            'style': storefront.style,
            'storefront_image_name': storefront.storefront_image_name,
        }
        for storefront in storefronts
    ]
    
    # Return the list of storefront dictionaries as JSON
    return jsonify({'storefronts': storefront_list})

@cross_origin
@app.route('/delete-all-storefronts', methods=['DELETE'])
def delete_all_storefronts():
    storefronts = Storefront.query.all()
    for storefront in storefronts:
        db.session.delete(storefront)
    db.session.commit()
    return jsonify({'message': 'All storefront entries deleted successfully'})
# Define a route to generate an achievement image
@cross_origin
@app.route('/gen-achievement-image', methods=['POST'])
def gen_achievement_image():
    date = request.args.get('date') # format is 05 Oct
    product = request.args.get('product') #the product associated with achievement
    content = json.loads(getgpt(date=date,product=product))
    print(content)
    achievement = content["Name of the Achievement"]
    try:
        desc=content["Description of the Achievement"]
    except:
        desc=content["Description of the achievement"] 
    prompt_stencil = f"{achievement} icon. digital art 21:9 aspect ratio simple elegant minimalist bright "
    image_binary = clipdrop_get_image(prompt_stencil)

    achievement = Achievement(
        name=achievement,
        description=desc,
        achievement_image_binary=image_binary
    )

    # Add the achievement to the database
    db.session.add(achievement)
    db.session.commit()
    return jsonify({'achievement_name': achievement.name , 'description' : desc })


@cross_origin
@app.route('/add-achievement' , methods=['POST'])
def add_achievement():
    user_id = request.args.get('user_id')
    achievement_id = request.args.get('achievement_id')
    user = User.query.get(user_id)
    achievement = Achievement.query.get(achievement_id)
    if user is not None and achievement is not None:
        # Add the achievement to the user's list of achievements
        user.achievements.append(achievement)
        
        # Commit the changes to the database
        db.session.commit()
    return jsonify('Successfully attributed user to achievement') , 201

@cross_origin
@app.route('/view-all-achievement', methods=['GET'])
def view_all_achievement():
    achievements = Achievement.query.all()
    if achievements is None:
        return jsonify({'error' : 'achievements not found'}) ,404
    achievements_list= []
    for achievement in achievements:
        achievement_dict = {
            'name': achievement.name,
            'description': achievement.description
        }
        achievements_list.append(achievement_dict)
    return jsonify({'achievements': achievements_list})

@cross_origin
@app.route('/view-achievement-image', methods=['GET'])
def view_achievement_image():
    achievement_id=request.args.get('achievement_id')
    achievements = Achievement.query.get(achievement_id)
    if achievements is None:
        return jsonify({'error' : 'achievement not found'}) ,404
    image_binary=achievements.achievement_image_binary
    image_base64 = base64.b64encode(image_binary).decode('utf-8')
    return jsonify({'achievements': image_base64})

@cross_origin
@app.route('/get-achievement-image', methods=['GET'])
def get_image():
    achievement_id=request.args.get('achievement_id')
    achievements = Achievement.query.get(achievement_id)
    if achievements is None:
        return jsonify({'error' : 'achievement not found'}) ,404
    image_binary=achievements.achievement_image_binary   
    image_buffer = BytesIO(image_binary)
    return send_file(image_buffer, mimetype='image/png')
# Define a route to view all achievements
@cross_origin
@app.route('/view-all-achievement-user', methods=['GET'])
def view_all_achievement_user():
    user_id= request.args.get("user_id")
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error' : 'user achievements not found'}) ,404
    achievements_list= []
    for achievement in user.achievements:
        achievement_dict = {
            'name': achievement.name,
            'description': achievement.description,
            'id':achievement.id
        }
        achievements_list.append(achievement_dict)
    return jsonify({'achievements': achievements_list})
@cross_origin
@app.route('/assign-achievements-to-user', methods=['POST'])
def assign_achievements_to_user():
    user_id=request.args.get('user_id')
    achievements_to_assign = json.loads(request.args.get('achievement_list'))
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    achievements = [Achievement.query.get(achievement_id) for achievement_id in achievements_to_assign]
    user.achievements = achievements
    db.session.commit()
    return jsonify({'message': 'Achievements assigned to user'})

# Define a route to get recommendations (Done)
@cross_origin
@app.route('/get-recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id')
    user = User.query.get(user_id)  # Use 'get' to retrieve a user by their ID
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    recommendations = user.recommendations  
    return jsonify({'recommendations': recommendations})

@cross_origin
@app.route('/seed-specific' , methods=['POST'] )
def specific_seed():
    user1 = {
    "tech": ["mouse", "desktop", "monitor", "laptops"],
    "food": ["soju", "whisky", "potato chips"],
    "fashion": ["high heels", "fur coats", "beautiful hats"]
    }
    user2 = {
    "tech": ["smartphone", "headphones", "gaming console", "tablet"],
    "food": ["sushi", "craft beer", "avocado toast"],
    "fashion": ["sneakers", "leather jackets", "sunglasses"]
    }

    user3 = {
        "tech": ["laptop", "fitness tracker", "e-book reader", "drone"],
        "food": ["pizza", "coffee", "smoothies"],
        "fashion": ["denim jeans", "sweatshirts", "wristwatches"]
    }
    reccos = {0:user1,1:user2,2:user3}
    for _ in range(3):
        user = User(name=fake.name(), recommendations=reccos[_])
        db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Database seeded with fake data'}), 201


@cross_origin
@app.route('/seedrandom', methods=['POST'])
def seed_database():
    num_users = request.json.get('users', 10)  # Number of fake users to create
    num_achievements = request.json.get('achievements', 10)  # Number of fake achievements to create
    num_storefronts = request.json.get('storefronts', 10)  # Number of fake storefronts to create

    

    # Generate fake achievements
    for _ in range(num_achievements):
        achievement = Achievement(name=fake.word(), description=fake.text())
        db.session.add(achievement)

    # Generate fake storefronts
    for _ in range(num_storefronts):
        storefront = Storefront(name=fake.word(), description=fake.text())
        db.session.add(storefront)
        # Generate fake users
    for _ in range(num_users):
        user = User(name=fake.name(), recommendations=fake.sentence())
        db.session.add(user)

    db.session.commit()
    return jsonify({'message': 'Database seeded with fake data'}), 201


# models
db_uri = 'sqlite:///temp.db'  # Database URI
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
db = SQLAlchemy(app)

# Define the Achievements model
class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    achievement_image_name = db.Column(db.String(255))
    achievement_image_binary = db.Column(db.LargeBinary)
    datecreated = db.Column(db.DateTime, default=db.func.current_timestamp())
    lastupdated = db.Column(db.DateTime, default=db.func.current_timestamp(),
                            onupdate=db.func.current_timestamp())

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    datecreated = db.Column(db.DateTime, default=db.func.current_timestamp())
    lastupdated = db.Column(db.DateTime, default=db.func.current_timestamp(),
                            onupdate=db.func.current_timestamp())
    
    # Define the many-to-many relationship between User and Achievement
    achievements = db.relationship('Achievement', secondary='user_achievements', backref='users')
    
    # Define the one-to-many relationship between User and Storefront
    storefronts = db.relationship('Storefront', back_populates='user', lazy='dynamic')

    # Define the recommendations field
    recommendations = db.Column(db.JSON)

class Storefront(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    style = db.Column(db.String(255))
    storefront_image_name = db.Column(db.String(255))
    storefront_image_binary = db.Column(db.LargeBinary)
    datecreated = db.Column(db.DateTime, default=db.func.current_timestamp())
    lastupdated = db.Column(db.DateTime, default=db.func.current_timestamp(),
                            onupdate=db.func.current_timestamp())
    
    # Add a foreign key column that references the User table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    # Define a relationship to the User model
    user = db.relationship('User', back_populates='storefronts')
# Define the UserAchievements association table for the many-to-many relationship
user_achievements = db.Table('user_achievements',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('achievement_id', db.Integer, db.ForeignKey('achievement.id'), primary_key=True)
)

if not os.path.exists(db_uri):
    with app.app_context():
        
        db.create_all()
if __name__ == '__main__':
    app.run()
    


