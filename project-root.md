# Project Root
This is the root directory of the project. It contains high-level configuration files and organizes the project into its core front-end (`client`) and back-end (`server`) sections.

### Key Files:
- `package.json`: Root-level package file used for shared scripts (e.g., `npm run dev` with `concurrently`)
- `.env`: Environment variables used across both client and server
- `.gitignore`: Specifies files and folders Git should ignore
- `.gitattributes`: Configures Git handling of line endings and text encoding
- `README.md`: Project overview and documentation
- `LICENSE`: (Optional) License information for your project

### Key Folders:
- `client/`: Contains all front-end code (React + Vite)
- `server/`: Contains all back-end code (Node.js, Express, GraphQL)
- `scripts/`: Contains deployment and utility scripts such as `render-build.sh`
- `.github/workflows/`: GitHub Actions for continuous integration and deployment
- `project-instructions/`: instructions and guides (such as `file-structure.md`) to aid in project development

This root serves as the base for running full-stack development commands and managing project-wide configuration.
