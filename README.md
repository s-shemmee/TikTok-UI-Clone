
# TikTok: Future X Past 

This document provides details about the frontend and backend implementation for the TikTok: Future X Past project.
- [Frontend Section](#tiktok-future-x-past-frontend)
- [Backend Section](#tiktok-future-x-past-backend)

# TikTok: Future X Past Frontend

The TikTok: Future X Past is a web application developed to replicate the user interface of the TikTok app. It is built using React.js, CSS, and JSX, and allows users to browse and view TikTok-style videos in a familiar and interactive interface.

## Features
- Browse TikTok-style videos with ease.
- Experience smooth, responsive video playback.
- Navigate a user-centric interface intuitively.
- Seamlessly discover new content with infinite scrolling.
- Engage with content: like, comment, and share.
- Connect with creators and enjoy a tailored content experience.
- Explore a themed Digital Storefront powered by TikTok's recommendation algorithm and Generative AI.
- Unlock achievements and showcase them on TikTok profiles, enhancing social engagement.
- Tailored product recommendations based on user behavior and previous purchase habits.
- Gamified shopping experience with achievement-driven incentives.

## Technologies & Tools Used
- React.js
- CSS
- JSX
- VS Code

## Installation and Usage
To use this TikTok: Future X Past, follow these steps:

1. Clone the repository or download the source code.
2. Open the project in your preferred code editor.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and navigate to `http://localhost:3000` to access the app.

## Demo
A live demo of the TikTok: Future X Past is available [here]([https://tik-tok-ui-clone-shemmee.vercel.app](https://tik-tok-ui-clone-iota.vercel.app)).

## Project Context
The aim of this project was to innovate and enhance the shopping experience on TikTok. We identified a gap between the primary TikTok app and the TikTok Shop and sought to bridge it. Our solution introduces a themed Digital Storefront powered by TikTok's recommendation algorithm and Generative AI. This storefront tailors product recommendations based on a user's behavior on the TikTok For You Page (FYP) and their previous purchase habits. Additionally, we've added gamification elements, allowing users to unlock achievements and showcase them on their TikTok profiles.

### Problem Statement
E-commerce platforms are integral to our lives, but often, recommended products don't align with our true desires. Our requirements evolve with time, moments, or simply a vibe. On TikTok, the primary app and TikTok Shop exist almost as distinct entities. We saw a need to infuse social elements and TikTok's content recommendation capabilities into the Shop.

### Solution
Our innovative solution is a themed Digital Storefront featuring curated TikTok Shop products. It offers personalized recommendations through an immersive experience, allowing for creative presentation and storytelling. As users shop on TikTok, they unlock cosmetic achievements, turning shopping into a gamified adventure.

## Design Process
We were inspired by platforms like IKEA and Drake's E-Commerce platform, which prioritize the human experience while shopping. Our solution emphasizes the importance of contextualization and consistent design language.

## Technological Stack
Our frontend is developed using React.js, while the backend is built with Flask and integrates Openai for advanced functionalities. You can view the complete code on [GitHub](https://github.com/jordanleewei/TikTok-UI-Clone).

## Credits
The TikTok UI Clone was created by [s-shemmee](https://github.com/s-shemmee), which much of the code for the frontend is based off on

---

# TikTok: Future X Past Backend

## APIs

### Clipdrop
Clipdrop is used to create images via stable diffusion 1.0XL. It uses an SDK for API interfacing between our project and the stable diffusion models by stability.ai. Although more constraining due to limited documentation, it suffices for our storefront and achievements generation.

### Openai
Openai is utilized for achievement generation based on date and product. This helps us create unique achievements associated with events near a particular date. By having a variable component, we can create new achievements on-the-go for consumers, easily variated through prompt engineering.

## Assets

### Generated Images in DB
Our SQL alchemy database contains binary data for our images in PNG format. These are accessible via API routes. This method of storage simplifies server design and ensures data reliability.

## Libraries and Frameworks

### Front end - React.js
React's component-based structure simplifies development. The vast libraries available and one-way data flow between components ensure a high-performance front-end.

### Backend- Flask with Openai
Flask's MVC architecture and in-built SQL alchemy suffice for our backend microservice. Our backend to frontend architecture is RESTful. The backend framework is a deployable microservice that will interact with the frontend using HTTP requests.

## Backend Architecture

Our backend to frontend architecture is in the form of RESTful API calls. The backend framework is a deployable microservice, interacting with the frontend using the parameters and content body of HTTP requests.

### Backend Routes
| Route                               | Method  | Parameters                                                | Expected Data Format |
|-------------------------------------|---------|-----------------------------------------------------------|----------------------|
| /gen-new-storefront-images          | POST    | user_id, shop_theme                                       | JSON                 |
| /get-user-storefront-images         | GET     | user_id                                                   | JSON                 |
| /download-user-storefront-image     | GET     | user_id, storefront_id                                    | Binary image (PNG)   |
| /get-all-user-storefront-image      | GET     | user_id                                                   | JSON                 |
| /delete-all-storefronts             | DELETE  | None                                                      | JSON                 |
| /gen-achievement-image              | POST    | date, product                                              | JSON                 |
| /add-achievement                    | POST    | user_id, achievement_id                                   | JSON                 |
| /view-all-achievement               | GET     | None                                                      | JSON                 |
| /view-achievement-image             | GET     | achievement_id                                            | JSON                 |
| /get-achievement-image              | GET     | achievement_id                                            | Binary image (PNG)   |
| /view-all-achievement-user          | GET     | user_id                                                   | JSON                 |
| /assign-achievements-to-user        | POST    | user_id, achievement_list                                 | JSON                 |
| /get-recommendations                | GET     | user_id                                                   | JSON                 |
| /seed-specific                      | POST    | None                                                      | JSON                 |
| /seedrandom                        | POST    | JSON payload with users, achievements, and storefronts    | JSON                 |

After defining our routes, we integrated external APIs into our server backend by including their function calls within the route methods.

To simplify testing, external APIs have their own `.py` files. This allows for isolated testing and reduces complexity in maintenance and code creation.


## License
This project is licensed under the MIT license.
