# Dogs Inn Cuiabá

This project includes a simple Express server used for development. The server now requires the [`bcrypt`](https://www.npmjs.com/package/bcrypt) package and uses the Node.js `crypto` module for token generation.

## Environment Variables

- `SALT_ROUNDS` (optional): Number of rounds used by `bcrypt` when hashing passwords. Defaults to `10` if not provided.

Start the API with:

```bash
npm run server
```

