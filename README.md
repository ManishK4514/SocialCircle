    Last updated on: 9th September 2023

<div align=center>
    <a href="https://socialcircle.vercel.app/">
        <img width="702" src="https://i.ibb.co/wBxTP2b/Screenshot-302.png" alt="sociopedia">
    </a>
</div>

# [SocialCircle: A Social Media Web-App for Sociopaths](https://socialcircle.vercel.app/)

![line]

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack Used](#tech-stack-used)
- [Installation](#installation)
- [Preview](#preview)
- [License](#license)

![line]

## Introduction

- SocialCircle is a full-stack social media application that allows users to connect with others, share posts, upload images, like, comment, and share posts, add friends, and view friends' profiles, The project utilizes Redux Toolkit for state management and incorporates full-stack authentication and authorization.

![line]

## Features

- **User Authentication**: Users can create an account, log in, and log out securely. This ensures that user data and interactions are protected.

- **User Authorization**: Proper authorization mechanisms are implemented to ensure that users can only access and modify their own data. This prevents unauthorized access and protects user privacy.

- **Profile Management**: Users can update their profile information, including their name, profile picture, and location. This allows users to personalize their profiles and share relevant information with others.

- **Post Creation**: Users can create and publish posts, including text descriptions and optional image attachments. This allows users to share their thoughts, experiences, and media content with others.

- **Image Upload**: Users can upload images to accompany their posts. The application handles image uploads securely and efficiently, allowing users to enrich their posts with visuals.

- **Like, Comment and Share Functionality**: Users can like, comment, and share posts to engage in conversations and show appreciation for shared content. This fosters social interaction and community engagement within the application.

- **Friends Management**: Users can add friends within the application, view their friends' profiles, and interact with their friends' posts. This enhances the social aspect of the application and facilitates connections between users.
- **Users Feedback**: Users can also share feedback or ask for help, there is a dedicated option for help and feedback.

![line]

## Tech Stack Used

- MongoDB: Database
- Express: Back-End Framework
- React: Front-End Framework
- Node.js: Back-End Runtime
- Material UI: Styling
- Redux: State Management
- JWT: Authentication
- Image Upload: Imgbb API
- Git & Github: Version Control
- Vercel: Frontend Hosting
- Digital Ocean: Back-End Web Services

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 


![line]

## Preview

![line]

## Installation

To set up and run the SocialCircle application locally, follow these steps:

- Clone the repository:

      git clone https://github.com/your-username/SocialCircle.git
    
- Install the dependencies in both the client-side and server-side directories:

      cd SocialCircle/Frontend
      npm install

      cd ../Backend
      npm install
  
- Configuration ⚙️

Create a .env file in the server directory and provide the necessary environment variables, such as the MongoDB connection URL and the desired port number:

      MONGO_URL=your_mongodb_connection_url
      PORT= your-port (e.g: 3001)

- Starting the Application ▶️

Start the Backend:

      cd ../Backend
      npm start

Start the Frontend:

      cd ../Frontend
      nodemon Server.js

- Access the application 🌍

Open your web browser and visit `http://localhost:your_port(e.g: 3000)` to access the Sociop

Please refer to the project's documentation or README files for detailed instructions on setting up and running the application locally.

![line]

## Contributing

Contributions to the SocialCircle project are welcome! If you find any issues, have feature suggestions, or would like to contribute code improvements, please refer to the project's GitHub repository for guidelines on how to contribute.

![line]

## License

The SocialCircle project is released under the [MIT License](LICENSE).

[line]: https://user-images.githubusercontent.com/75939390/137615281-3a875960-92cc-407f-97fe-fd2319bdb252.png
[License]: https://github.com/ManishK4514/SocialCircle/blob/main/LICENSE
[badges]: https://github.com/Ileriayo/markdown-badges
