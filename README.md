# InnerOrbit: *Mood Journal, Mood Tracker, & Reflective Social Space*

## **Description**

**InnerOrbit** is a full-stack, responsive, and interactive single-page application built using the MERN stack with GraphQL and JWT authentication. This application solves a real-world problem using real data and is designed with a smooth user experience and polished, professional UI in mind. 

**Problem Solved:** People struggle to understand emotional patterns and maintain consistent emotional routines. Traditional journals often lack visual feedback, encouragement, or the option to connect meaningfully with others without oversharing or losing privacy.

**Concept:** InnerOrbit is a social ritual app — a place where users occasionally share glimpses of their mood or thoughts into a public “galaxy” while still maintaining control, anonymity, and consent.


* Mood Tracker: Calendar-based mood logging with color coding and editable daily entries.
* Mood Journal: Private journal visualized as constellations of stars, each representing an entry.
* Mood Nebulas: Optional public feed for anonymous, tagged reflections with light interaction.
* Constellation Cards: Weekly reflection prompts with the option to share responses anonymously.
* Orbits: Invite-only pods for sharing progress and encouragement with close friends.
* Self-Care Companion: Digital pet that reflects your real-world wellness habits.
* Privacy & Auth: Secure JWT authentication with private-first, consent-based sharing.
* Design & Deployment: Mobile-first calm UI, Tailwind CSS, and CI/CD deployment on Render.


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

