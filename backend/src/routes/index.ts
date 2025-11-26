import { Router } from 'express';
import { db } from '../db';

const router = Router();

router.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: (result as any).insertId, name, email });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ error: message });
  }
});

export default router;
