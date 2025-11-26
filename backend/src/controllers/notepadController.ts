import { Request, Response } from 'express';
import Notepad from '../models.ts/notepad';

export const createNotepad = async (req: Request, res: Response) => {
  try {
    const notepad = await Notepad.create(req.body);
    res.status(201).json(notepad);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getNotepads = async (_: Request, res: Response) => {
  try {
    const notepads = await Notepad.findAll();
    res.json(notepads);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getNotepad = async (req: Request, res: Response) => {
  try {
    const notepad = await Notepad.findByPk(req.params.id);
    if (!notepad) return res.status(404).json({ error: 'Notepad not found' });
    res.json(notepad);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateNotepad = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ error: 'ID is required in request body' });
    const notepad = await Notepad.findByPk(id);
    if (!notepad) return res.status(404).json({ error: 'Notepad not found' });
    await notepad.update(req.body);
    res.json(notepad);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteNotepad = async (req: Request, res: Response) => {
  try {
    const notepad = await Notepad.findByPk(req.params.id);
    if (!notepad) return res.status(404).json({ error: 'Notepad not found' });
    await notepad.destroy();
    res.json({ message: 'Notepad deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}; 