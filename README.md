# PROJECT 3 TITLE

## **Description**

**PROJECT 3 TITLE** is a full-stack, responsive, and interactive single-page application built using the MERN stack with GraphQL and JWT authentication. This application solves a real-world problem using real data and is designed with a smooth user experience and polished, professional UI in mind.

Users can:

- [Insert key user abilities or features] **(DO NOT FORGET TO UPDATE THIS!)**
- Interact with real-time data via GraphQL queries and mutations
- Securely register, log in, and manage personal accounts
- Experience seamless navigation across the single-page interface
- [Other standout features here] **(DO NOT FORGET TO UPDATE THIS!)**

Deployed via Render with a focus on accessibility and mobile responsiveness, this application is the culmination of six months of development training and collaboration.

| **Key Features**                                  | **Technology Stack**                                                  |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| Mobile-first, responsive design                   | **Languages:** JavaScript                                             |
| Component-based architecture                      | **Front-End:** React, Apollo Client, React Router                     |
| GraphQL for client-server communication           | **Back-End:** Node.js, Express.js, Apollo Server, GraphQL             |
| MongoDB integration with Mongoose ODM             | **Database:** MongoDB                                                 |
| Secure user authentication with JWT               | **Authentication:** JWT                                               |
| Protected routes and user sessions                | **Security:** bcrypt, dotenv                                          |
| GitHub Actions for CI/CD                          | **CI/CD:** GitHub Actions                                             |
| Styled with [chosen approach]                     | **Styling:** [styled-components / Chakra UI / Ant Design / Pure CSS]  |   
| Deployed on Render                                | **Deployment:** Render                                                |


## Table of Contents  **(DO NOT FORGET TO UPDATE THIS AND DELETE ANY SECTIONS YOU ARE NOT USING!)**

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Walkthrough Video](#walkthrough-video)
- [Live Demo](#live-demo)
- [Database Schema](#database-schema) 
- [Future Development](#future-development)
- [Contributing](#contributing)
- [Tests](#tests)
- [Documentation](#documentation)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Installation 

This app is deployed on Render and can be [accessed here.](https://URL-GOES-HERE.onrender.com/)  **(DO NOT FORGET TO UPDATE THIS!)**  
To run the app locally:
     
**1. Clone the Repository**

   - bash:
     >  git clone https://github.com/alexis-menendez/YOUR-PROJECT-URL.git   **(DO NOT FORGET TO UPDATE THIS!)**  
     >  cd project-name  

**2. Install Client Dependencies**

   - **Open an Integrated terminal in /client:**
   - bash:
     >  cd how-not-to-die/client  
     >  npm install  

**3. Install Server Dependencies**
   - **Open an Integrated terminal in /server:**
   - bash:
     >  cd ../server  
     >  npm install  


**4. Create a .env file in the root directory with the following:**

   - **.env:**
     >  DB_NAME=your_db             (DELETE IF NOT USING DATABASES!)
     >  DB_USER=your_user           (DELETE IF NOT USING DATABASES!)
     >  DB_PASSWORD=your_password   (DELETE IF NOT USING DATABASES!)
     >  MONGODB_URI=your_mongo_connection_string 
     >  JWT_SECRET=your_secret  
     >  API_KEY_1=xxxx  

**5. Ensure PostgreSQL is running. Then create your database and apply any migrations/seeds:**  **(DO NOT FORGET TO UPDATE THIS! DELETE THIS STEP IF NOT USING POSTGRESSQL!)**  

   - **Open an Integrated terminal in /server:**
   - bash:
     >  npx sequelize-cli db:create  
     >  npx sequelize-cli db:migrate  
     >  npx sequelize-cli db:seed:all  


**6. Install concurrently in the root directory**
   - **Open an Integrated terminal in your projects root:**
   - bash:
     >  npm install concurrently --save-dev   

**7. Start the Client**
   - **Open an Integrated terminal in your projects root:**
   - bash:
     >  npm run dev  


## Usage

Once the server and client are both running:

1. Navigate to http://localhost:5173 (or the port shown in your terminal)
2. Register or log in
3. Begin interacting with the full suite of app features including:
   - Secure account management
   - Data submission and editing
   - Navigation between protected routes
   - [Any other unique usage info]


## Screenshots

![projectscreenshot](LINK-GOES-HERE!)  **(DO NOT FORGET TO UPDATE THIS!)**  

## Walkthrough Video

- currently unavailable

## Live Demo

- [NAME-OF-PROJECT](https://NAME-OF-PROJECT.onrender.com/)  **(DO NOT FORGET TO UPDATE THIS!)**  

## Database Schema **(DO NOT FORGET TO UPDATE THIS!)**  
Field     |  Type      |  Required  |  Description              |
| ------- | ---------- | ---------- | ------------------------- |
_id       |  ObjectId  |  Yes       |  Auto-generated unique ID |
username  |  String    |  Yes       |  User's display name      |
email     |  String	   |  Yes       |  Must be unique           |
password  |  String    |  Yes       |  Hashed password          |
logs      |  [Log]     |  No        |  Reference to user's logs |


## Future Development

 - Expand data model and relationships
 - Integrate additional APIs
 - Add user dashboard with analytics
 - Implement automated testing
 - Enhance accessibility and internationalization

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix: git checkout -b feature-name
3. Make your changes and commit them with descriptive messages: git commit -m "Description"
4. Push your changes and create a pull request: git push origin feature-name

## Tests

There are currently no automated tests for this project

## Documentation

> **Note:** INSERT ANY NOTES ABOUT DOCUMENTATION HERE, DELETE IF THERE ARE NONE!

- [Repository](https://github.com/YOUR-REPO-URL-GOES-HERE) **(DO NOT FORGET TO UPDATE THIS!)**  
- [Google Slides](https://docs.google.com/presentation/YOUR-SLIDES-URL-GOES-HERE) **(DO NOT FORGET TO UPDATE THIS!)**  
- [Google Doc](https://docs.google.com/document/YOUR-GOOGLE-DOC-URL-GOES-HERE) **(DO NOT FORGET TO UPDATE THIS!)**  

## Acknowledgements

1. (ANY OUTSIDE AID) **(DO NOT FORGET TO UPDATE THIS!)**  
2. (ANY INSPIRATIONS OR RESOURCES) **(DO NOT FORGET TO UPDATE THIS!)**  

## Contact

If you have any questions, feel free to contact the team:

Project Lead: [**Alex Menendez**](https://alex-menendez.onrender.com/) – Junior Developer, Junior Project Manager, Junior UI/UX Designer

- **Website**: [Crafted-By-Alex](https://alex-menendez.onrender.com/)
- **LinkedIn**: [in/alex-d-menendez](https://www.linkedin.com/in/alex-d-menendez/)
- **GitHub**: [alexis-menendez](https://github.com/alexis-menendez)
- **Email**: [alexis.menendez@austincc.edu](https://alex-menendez.onrender.com/contact)

Frontend Lead: [**FRONTEND-LEAD-NAME**](https://FRONTEND-LEAD-NAME.onrender.com/) – BLAH, BLAH, BLAH  

- [**Portfolio**](https://FRONTEND-LEAD-NAME.onrender.com/)
- **LinkedIn**: [in/FRONTEND-LEAD-NAME](https://www.linkedin.com/in/FRONTEND-LEAD-NAME/)
- **GitHub**: [FRONTEND-LEAD-USERNAME](https://github.com/alexis-menendez)
- **Email**: [FRONTEND-LEAD-NAME@email.com](https://FRONTEND-LEAD-NAME.onrender.com/contact)

Backend Lead: [**BACKEND-LEAD-NAME**](https://BACKEND-LEAD-NAME.onrender.com/) – BLAH, BLAH, BLAH  

- [**Portfolio**](https://BACKEND-LEAD-NAME.onrender.com/)
- **LinkedIn**: [in/FRONTEND-LEAD-NAME](https://www.linkedin.com/in/FRONTEND-LEAD-NAME/)
- **GitHub**: [FRONTEND-LEAD-USERNAME](https://github.com/alexis-menendez)
- **Email**: [FRONTEND-LEAD-NAME@email.com](https://FRONTEND-LEAD-NAME.onrender.com/contact)

