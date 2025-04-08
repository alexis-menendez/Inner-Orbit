# client
This folder contains all front-end code for the application, built using React and Vite.

### Technologies:
- React
- Vite
- React Router
- Apollo Client
- Tailwind CSS
- CSS Modules

### Key Subfolders:
- `public/`: Static assets (e.g., `index.html`, icons, images)
- `src/`: All application source code, including:
  - `assets/`: Fonts, etc.
  - `components/`: Reusable UI elements
  - `context/`: Global state management (e.g. authentication)
  - `graphql/`: Client-side GraphQL queries and mutations
  - `hooks/`: Custom React hooks
  - `pages/`: Page components mapped to routes
  - `styles/`: Global or utility CSS (e.g. Tailwind base styles)               

### Entry Points:
- `App.jsx`: Main app wrapper
- `main.jsx`: Renders the app to the DOM
- `router.jsx`: Route declarations using React Router

### File Structure:  
client/ ........................... *# React front-end*    
  ├── public/ ..................... *# Static files (index.html, favicon, etc.)*    
  │     └── assets/ ............... *# Static assets (images, icons)*    
  ├── src/ ........................ *# Source code*    
  │     ├── assets/ ............... *# Static assets (fonts)*    
  │     ├── components/ ........... *# Reusable UI components*    
  │     ├── context/ .............. *# React Context for global state/auth*    
  │     ├── graphql/ .............. *# Apollo client queries/mutations*    
  │     ├── hooks/ ................ *# Custom React hooks*    
  │     ├── pages/ ................ *# Route-based page components*    
  │     ├── styles/ ............... *# Global or component-level styles*    
  │     ├── App.jsx ............... *# Main app component*    
  │     ├── main.jsx .............. *# Entry point (or index.jsx)*    
  │     └── router.jsx ............ *# React Router setup*    
  |  
  ├── package.json ................ *# Frontend dependencies*    
  ├── package-lock.json ........... *# Exact versions of installed frontend packages (auto-generated)*    
  ├── postcss.config.js ........... *# Configuration file for PostCSS (used by Tailwind to transform CSS)*    
  ├── tailwind.config.js .......... *# Tailwind CSS custom configuration (e.g., theme, breakpoints)*   
  └── vite.config.js .............. *# Vite configuration for dev server, plugins, aliases, etc.*  
