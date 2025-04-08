# .github/workflows
This folder contains GitHub Actions workflow configuration files used for automating tasks such as continuous integration (CI), deployment, and testing.

### Typical Uses:
- Running tests automatically when code is pushed
- Linting code for style consistency
- Building and deploying the app to services like Render
- Notifying developers of build status

### Example Files:
- `deploy.yml`: Automatically deploys the app when changes are pushed to a specific branch
- `ci.yml`: Runs build and test scripts for every pull request or push

> Workflows are triggered by GitHub Events such as `push`, `pull_request`, or scheduled intervals.
