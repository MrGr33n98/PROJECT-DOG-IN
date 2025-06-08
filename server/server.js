const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

app.post('/api/register', async (req, res) => {
  const { name, email, password, phone, type } = req.body;
  if (!email || !password || !name || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    phone,
    type,
    verified: false,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  const token = generateToken();
  const { password: _pw, ...safeUser } = newUser;
  res.json({ token, user: safeUser });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (!existing) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const match = await bcrypt.compare(password, existing.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken();
  const { password: _pw, ...safeUser } = existing;
  res.json({ token, user: safeUser });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
