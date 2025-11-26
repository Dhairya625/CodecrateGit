import express from 'express';
import { db } from './db';
import userRoutes from './routes/index';
import todoRoutes from './routes/todoRoutes';
import Todo from './models.ts/todo';
import notepadRoutes from './routes/notepadRoutes';
import Notepad from './models.ts/notepad';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Test DB connection on startup
// Start server only if MySQL connects

db.getConnection()
  .then(() => {
    console.log('MySQL connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MySQL:', err);
    process.exit(1);
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/notepads', notepadRoutes);
// Sync the models
Todo.sync();
Notepad.sync();
