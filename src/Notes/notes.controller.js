import {
    createNoteService,
    deleteAllNotesService,
    deleteNoteService,
    getAggregatedNotesService,
    getNoteByContentService,
    getNotesByUserId,
    getNoteService,
    getNotesWithUserService,
    replaceNoteService,
    updateNoteService,
    updateTitleNoteService
} from "./notes.service.js";

export const createNote = async (req, res, next) => {
    try {
        const userId = req.query.id;
        const noteData = req.body;
        const newNote = await createNoteService(noteData, userId);
        res.status(201).json({
            message: "Note created successfully",
            success: true,
            data: newNote
        });

    } catch (err) {
        next(err)
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.query.id;
        const noteData = req.body;
        const newNote = await updateNoteService(id, userId, noteData);
        res.status(201).json({
            message: "Note updated successfully",
            success: true,
            data: newNote
        });

    } catch (err) {
        next(err)
    }
}

export const replaceNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.query.id;
        const noteData = req.body;
        const newNote = await replaceNoteService(id, userId, noteData);
        res.status(201).json({
            message: "Note updated successfully",
            success: true,
            data: newNote
        });

    } catch (err) {
        next(err)
    }
}

export const updateTitle = async (req, res, next) => {
    try {
        const userId = req.query.id;
        const {title} = req.body;
        const newNote = await updateTitleNoteService( userId, title);
        res.status(201).json({
            message: "All notes updated",
            success: true,
            data: newNote
        });

    } catch (err) {
        next(err)
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.query.id;
        const deletedNote = await deleteNoteService(id, userId);
        res.status(201).json({
            message: "Note deleted successfully",
            success: true,
            data: deletedNote
        });

    } catch (err) {
        next(err)
    }
}

export const getNotes = async (req, res, next) => {
    try {
        const userId = req.query.id;
        const page = req.query.page;
        const limit = req.query.limit;
        const notes = await getNotesByUserId(userId, page , limit);
        res.status(201).json({
            success: true,
            data: notes
        });

    } catch (err) {
        next(err)
    }
}

export const getNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.query.id;
        const note = await getNoteService(id, userId);
        res.status(201).json({
            success: true,
            data: note
        });

    } catch (err) {
        next(err)
    }
}

export const getNoteByContent = async (req, res, next) => {
    try {
        const content = req.query.content;
        const userId = req.query.id;
        const note = await getNoteByContentService(content, userId);
        res.status(201).json({
            success: true,
            data: note
        });

    } catch (err) {
        next(err)
    }
}

export const getNotesWithUser = async (req, res, next) => {
    try {
        const userId = req.query.id; 

        const notes = await getNotesWithUserService(userId);

        res.status(200).json(notes);

    } catch (err) {
        next(err);
    }
};


export const getAggregatedNotes = async (req, res, next) => {
    try {
        const userId = req.query.id;        
        const title = req.query.title; 

        const notes = await getAggregatedNotesService(userId, title);

        res.status(200).json(notes);

    } catch (err) {
        next(err);
    }
};

export const deleteAllNotes = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const result = await deleteAllNotesService(userId);

        res.status(200).json(result); 

    } catch (err) {
        next(err);
    }
};