import { Router } from 'express';
import {
  createNotepad,
  getNotepads,
  getNotepad,
  updateNotepad,
  deleteNotepad,
} from '../controllers/notepadController';

const router = Router();

router.post('/', createNotepad);
router.get('/', getNotepads);
router.get('/:id', getNotepad);
router.put('/', updateNotepad);
router.delete('/:id', deleteNotepad);

export default router; 