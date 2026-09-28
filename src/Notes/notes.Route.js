import { Router } from 'express';
import {
    createNote,
    deleteAllNotes,
    deleteNote,
    getAggregatedNotes,
    getNote,
    getNoteByContent,
    getNotes,
    getNotesWithUser,
    replaceNote,
    updateNote,
    updateTitle
} from './notes.controller.js';
const noteRouter = Router();

noteRouter.post('/create-note', createNote);

noteRouter.patch('/update/:id', updateNote);
noteRouter.patch('/update-title', updateTitle);

noteRouter.put('/update/:id', replaceNote);

noteRouter.delete('/delete/:id', deleteNote);
noteRouter.delete('/delete-all/:id', deleteAllNotes);

noteRouter.get('/all', getNotesWithUser);
noteRouter.get('/get-notes', getNotes);
noteRouter.get("/aggregate", getAggregatedNotes);
noteRouter.get('/:id', getNote);
noteRouter.get('/', getNoteByContent);





export default noteRouter;