import { Request, Response } from 'express';
import Todo from '../models.ts/todo';

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getTodos = async (_: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ error: 'ID is required in request body' });
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    await todo.update(req.body);
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    await todo.destroy();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}; 