# InnerOrbit

## **Description**

**InnerOrbit** is a full-stack wellness platform built with the MERN stack, GraphQL, and JWT authentication. It supports users in understanding and reflecting on their emotions through a set of visually rich, thoughtfully designed tools. With a mobile-first UI and consent-based privacy model, InnerOrbit balances personal introspection with optional social interaction in a calm, creative digital space.

**Concept:** is a reflective mental health app centered on visual rituals. Users map moods onto a tracker, write private journal entries visualized as constellations, and care for a virtual pet that responds to their emotional patterns. Optional sharing allows users to publish selected entries into a shared “galaxy,” offering glimpses into collective experience while preserving anonymity and consent.

**App Overview**
* Mood Tracker: Calendar-based mood logging with color coding and editable daily entries.
* Mood Journal: Private journal visualized as constellations of stars, each representing an entry.
* Pomodoro Timer: Simple, built-in timer to encourage focused productivity sessions and ability to customize the timer sound
* Library: Resource hub for videos, reflections, and guided exercises to support mental wellness and creative expression.
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
| Styled with [chosen approach]                     | **Styling:** Tailwind CSS, CSS MOdules                                |
| Deployed on Render                                | **Deployment:** Render                                                |


## Table of Contents 

- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Future Development](#future-development)
- [Tests and Workflows](#tests-and-workflows)
- [Documentation](#documentation)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Screenshots

### Authentication
![landing-page](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/home.png?raw=true) 
![login](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/login.png?raw=true) 
![register](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/register.png?raw=true) 

### User Settings
![account](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/account.png?raw=true) 
![terms](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/terms.png?raw=true) 
![privacy-policy](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/privacy.png?raw=true) 

### Multimedia Library
![library](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/library.png?raw=true) 

### Dashboard
![dashboard](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/dashboard.png?raw=true) 
![timer](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/timer.png?raw=true) 
![timer-settings](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/timer-settings.png?raw=true) 

### Mood Tracker
![mood-tracker](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/tracker.png?raw=true) 

### Journal
![journal-galaxy](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/journal-galaxy.png?raw=true) 
![journal-constellation](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/journal-constellation.png?raw=true) 
![journal-notebook](https://github.com/alexis-menendez/Inner-Orbit/blob/main/Assets/journal-notebook.png?raw=true) 


## Live Demo

- [Inner-Orbit Demo](https://inner-orbit.onrender.com/) 

## Future Development

- Expand data model and backend relationships
- Integrate additional APIs (e.g., mood classification or biometric syncing)
- Add a user dashboard with emotional analytics
- Implement automated unit and integration testing
- Improve accessibility and add internationalization support
- Enhance Squidy’s behavior to reflect diverse self-care inputs

## Tests and Workflows

While no automated tests are currently implemented, continuous integration workflows are set up using GitHub Actions. These include:

- TypeScript compiler checks
- Client and server build verifications
- Automated deployment to Render on main branch merges

## Documentation

- [Repository](https://github.com/alexis-menendez/Inner-Orbit) 
- [Google Slides](https://docs.google.com/presentation/d/1lu4M3LzP3j3UrpkP7yu15TR2FxfDZgrMphwa5gQ0oWA/edit?usp=sharing) 
- [Google Doc](https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?usp=sharing)

## Acknowledgements

- Squid Sqrite by [Penzilla](https://penzilla.itch.io/)

## Contact

If you have any questions, feel free to contact the team:

#### Project Lead, UI/UX Designer: [**Alex Menendez**](https://alex-menendez.onrender.com/) – Full-Stack Developer with a focus on UI/UX and team collaboration

- **Website**: [Crafted-By-Alex](https://alex-menendez.onrender.com/)
- **LinkedIn**: [in/alex-d-menendez](https://www.linkedin.com/in/alex-d-menendez/)
- **GitHub**: [alexis-menendez](https://github.com/alexis-menendez)
- **Email**: [alexis.menendez@austincc.edu](https://alex-menendez.onrender.com/contact)

#### Frontend Lead: [**Constance RobinE**](https://zomblic.netlify.app/) – Full stack Developer

- **Website**: [Portfolio](https://zomblic.netlify.app/)
- **LinkedIn**: [in/constance-robin](www.linkedin.com/in/constance-robin/)
- **GitHub**: [zomblic](https://github.com/zomblic)
- **Email**: [zomblic@hotmail.com](https://zomblic.netlify.app/contact)

#### Backend Lead: [**Blake Brittain**](https://blakenb-portfolio.netlify.app/) – Full stack Developer

- **Website**: [Blake's portfolio](https://blakenb-portfolio.netlify.app/)
- **LinkedIn**: [in/blake-n-brittain](https://www.linkedin.com/in/blake-n-brittain/)
- **GitHub**: [Blakenb](https://github.com/Blakenb)
- **Email**: [Blakenb87@gmail.com](Blakenb87@gmail.com)

#### Backend Developer: [**Blaine Bishop**](https://blainebishopportfolio.netlify.app/) – Fullstack Developer, specializing in backend database building, and rendering to production 

- **Website**: [Portfolio](https://blainebishopportfolio.netlify.app/)
- **LinkedIn**: [in/blainebishop](https://www.linkedin.com/in/blainebishop/)
- **GitHub**: [Halluci1nations](https://github.com/Halluc1nations)
- **Email**: Blaine.Bishop@comcast.net

