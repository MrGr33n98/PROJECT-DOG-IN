# Dogs Inn Cuiabá

This project uses GitHub Actions for continuous integration and deployment.

## CI workflow

The workflow defined in `.github/workflows/ci.yml` installs dependencies, builds the project and deploys it to a remote server via SSH.

### Required repository secrets

The following secrets must be added to the repository settings for deployment to succeed:

- `SSH_HOST` &mdash; address of the server.
- `SSH_USER` &mdash; SSH user used to connect.
- `SSH_KEY` &mdash; private key for authentication.
- `SSH_PORT` &mdash; SSH port (default is 22).
- `DEPLOY_PATH` &mdash; directory on the server where the repository should be deployed.
