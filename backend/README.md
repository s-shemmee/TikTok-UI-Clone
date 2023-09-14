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
(Expand upon the API routes as needed.)

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
