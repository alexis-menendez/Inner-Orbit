# client src
This folder contains all the source code for the React frontend application.

### Subfolders:

- `assets/`: Static assets like fonts and other media used in the UI.
- `components/`: Reusable UI components such as buttons, modals, cards, navbars, etc.
- `context/`: React Context files for managing global state (e.g., authentication, theme).
- `graphql/`: Apollo Client setup including GraphQL queries and mutations.
- `hooks/`: Custom React hooks that encapsulate shared logic across components.
- `pages/`: Route-based React components, each representing a different page of the app.
- `styles/`: Global styles including Tailwind base files, resets, and utility classes.

### Main Files:

- `App.jsx`: Main application component; wraps the routing and shared layout.
- `main.jsx`: Renders the app into the DOM and wraps it in any global providers.
- `router.jsx`: Contains React Router configuration for page navigation.
