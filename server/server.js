const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

function generateToken() {
  return Math.random().toString(36).substring(2);
}

app.post('/api/register', (req, res) => {
  const { name, email, password, phone, type } = req.body;
  if (!email || !password || !name || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
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

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const existing = users.find(u => u.email === email && u.password === password);
  if (!existing) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken();
  const { password: _pw, ...safeUser } = existing;
  res.json({ token, user: safeUser });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
