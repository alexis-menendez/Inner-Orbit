# InnerOrbit: *Mood Journal, Mood Tracker, & Reflective Social Space*

## **Description**

**InnerOrbit** is a full-stack, responsive, and interactive single-page application built using the MERN stack with GraphQL and JWT authentication. This application solves a real-world problem using real data and is designed with a smooth user experience and polished, professional UI in mind. 

**Problem Solved:** People struggle to understand emotional patterns and maintain consistent emotional routines. Traditional journals often lack visual feedback, encouragement, or the option to connect meaningfully with others without oversharing or losing privacy.

**Concept:** InnerOrbit is a social ritual app — a place where users occasionally share glimpses of their mood or thoughts into a public “galaxy” while still maintaining control, anonymity, and consent.

* **Mood Journal Dashboard:**
  Protected dashboard where users log their daily mood (emoji + optional journal entry). Past entries are visualized as stars in a user’s personal orbit.

* **Mood Nebulas (Public Mood Feed):**
  Users can opt to anonymously share a mood + short message to a public cloud. Others can view and click “🌠 Resonate” if the entry speaks to them.

* **Constellation Cards (Prompted Reflections):**
  Weekly prompts (e.g., “a small thing that brought you peace”) appear as themed constellations. Entries remain anonymous and grouped by prompt.

* **Orbit Circles (Private Pods):**
  Small invite-only groups (2–5 people) for mutual mood tracking, shared badge streaks, and non-verbal encouragement like “⭐ send a star.”

* **Cosmic Visualization:**
  Interactive galaxy-style UI where each mood log becomes a twinkling star. The longer your streak, the more constellations appear.

* **Secure Auth & Privacy:**
  JWT-protected routes, all entries private by default, no saved mental health data beyond mood logs. No comments, no messaging — just quiet connection.

* **Responsive & Polished UI:**
  Styled with Tailwind, featuring soft animations, low-sensory visuals, and mobile-first design.

* **Render Deployment & CI/CD:**
  Fully deployed on Render with GitHub Actions for build and deploy automation.

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

- [Screenshots](#screenshots)
- [Walkthrough Video](#walkthrough-video)
- [Live Demo](#live-demo)
- [Future Development](#future-development)
- [Tests](#tests)
- [Documentation](#documentation)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

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

Project Lead: [**Alex Menendez**](https://alex-menendez.onrender.com/) – Full-Stack Developer with a focus on UI/UX and team collaboration.

- **Website**: [Crafted-By-Alex](https://alex-menendez.onrender.com/)
- **LinkedIn**: [in/alex-d-menendez](https://www.linkedin.com/in/alex-d-menendez/)
- **GitHub**: [alexis-menendez](https://github.com/alexis-menendez)
- **Email**: [alexis.menendez@austincc.edu](https://alex-menendez.onrender.com/contact)
 

- [**Portfolio**](https://FRONTEND-LEAD-NAME.onrender.com/)
- **LinkedIn**: [in/FRONTEND-LEAD-NAME](https://www.linkedin.com/in/FRONTEND-LEAD-NAME/)
- **GitHub**: [FRONTEND-LEAD-USERNAME](https://github.com/alexis-menendez)
- **Email**: [FRONTEND-LEAD-NAME@email.com](https://FRONTEND-LEAD-NAME.onrender.com/contact)

Backend Lead: [**BACKEND-LEAD-NAME**](https://BACKEND-LEAD-NAME.onrender.com/) – BLAH, BLAH, BLAH  

- [**Portfolio**](https://BACKEND-LEAD-NAME.onrender.com/)
- **LinkedIn**: [in/FRONTEND-LEAD-NAME](https://www.linkedin.com/in/FRONTEND-LEAD-NAME/)
- **GitHub**: [FRONTEND-LEAD-USERNAME](https://github.com/alexis-menendez)
- **Email**: [FRONTEND-LEAD-NAME@email.com](https://FRONTEND-LEAD-NAME.onrender.com/contact)

