import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const TOKEN_EXPIRATION = '24h';

app.post('/api/register', async (req, res) => {
  const { name, email, password, phone, type } = req.body;
  if (!email || !password || !name || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

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

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
  const { password: _pw, ...safeUser } = newUser;
  res.json({ token, user: safeUser });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (!existing) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, existing.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: existing.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
  const { password: _pw, ...safeUser } = existing;
  res.json({ token, user: safeUser });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
