# TikTok: Future x Past - Backend Services

This repository contains the backend services for the "TikTok: Future x Past" project, focusing on content generation and management for the digital storefront and achievements.

## 📁 Project Structure
- `main.py`: Main script where the server is initialized and routes are defined.
- `stability_gen.py`: Script for generating content using Stability.AI.
- `clipdrop_gen.py`: Script for generating images using the Clipdrop API.
- `achievement_gen.py`: Script for generating and managing achievements.
- **Assets**:
  - `image.png` and `image2.png`: Image assets utilized in the project.
- **Miscellaneous**:
  - `answer.txt`: Contains specific information or data.

## 🛠 Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/trollorder/backend_tik_tok.git
   cd backend_tik_tok
   ```

2. **Install Dependencies**:
   Make sure you have Python installed on your machine.
   ```bash
   pip install -r requirements.txt
   ```

3. **Running the Server**:
   ```bash
   python main.py
   ```

## 🌐 API Endpoints

### /gen-new-storefront-images
- **Method**: POST
- **Parameters**: 
  - user_id (Query Parameter)
  - shop_theme (Query Parameter)
- **Expected Data Format**: JSON

### /get-user-storefront-images
- **Method**: GET
- **Parameters**: 
  - user_id (Query Parameter)
- **Expected Data Format**: JSON

### /download-user-storefront-image
- **Method**: GET
- **Parameters**: 
  - user_id (Query Parameter)
  - storefront_id (Query Parameter)
- **Expected Data Format**: Binary image (PNG)

### /get-all-user-storefront-image
- **Method**: GET
- **Parameters**: 
  - user_id (Query Parameter)
- **Expected Data Format**: JSON

### /delete-all-storefronts
- **Method**: DELETE
- **Parameters**: None
- **Expected Data Format**: JSON

### /gen-achievement-image
- **Method**: POST
- **Parameters**: 
  - date (Query Parameter)
  - product (Query Parameter)
- **Expected Data Format**: JSON

### /add-achievement
- **Method**: POST
- **Parameters**: 
  - user_id (Query Parameter)
  - achievement_id (Query Parameter)
- **Expected Data Format**: JSON

### /view-all-achievement
- **Method**: GET
- **Parameters**: None
- **Expected Data Format**: JSON

### /view-achievement-image
- **Method**: GET
- **Parameters**: 
  - achievement_id (Query Parameter)
- **Expected Data Format**: JSON

### /get-achievement-image
- **Method**: GET
- **Parameters**: 
  - achievement_id (Query Parameter)
- **Expected Data Format**: Binary image (PNG)

### /view-all-achievement-user
- **Method**: GET
- **Parameters**: 
  - user_id (Query Parameter)
- **Expected Data Format**: JSON

### /assign-achievements-to-user
- **Method**: POST
- **Parameters**: 
  - user_id (Query Parameter)
  - achievement_list (Query Parameter as JSON)
- **Expected Data Format**: JSON

### /get-recommendations
- **Method**: GET
- **Parameters**: 
  - user_id (Query Parameter)
- **Expected Data Format**: JSON

### /seed-specific
- **Method**: POST
- **Parameters**: None
- **Expected Data Format**: JSON

### /seedrandom
- **Method**: POST
- **Parameters**: JSON payload with parameters users, achievements, and storefronts
- **Expected Data Format**: JSON

## 🔄 External Integrations

- **Stability.AI**: Utilized for content generation. See `stability_gen.py`.
- **Clipdrop**: Used for image generation tasks. Refer to `clipdrop_gen.py`.
- **Openai**: Utilized for achievement generation based on date and product.

## 📚 Libraries and Frameworks

### Frontend - React.js
React's component-based structure ensures development simplicity and performance optimization.

### Backend - Flask with Openai
Optimized for rapid development and prototyping, Flask provides a lightweight framework for our backend services. The architecture focuses on RESTful API calls, enabling seamless interaction with the frontend.

## Backend Architecture
The backend to frontend architecture revolves around RESTful API calls. The backend is designed as a deployable microservice, ensuring flexibility and scalability.

## 🙌 Contributing

If you wish to contribute, please make a pull request. For major changes, please open an issue first.
