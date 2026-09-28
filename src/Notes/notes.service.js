import { findUserById } from "../Users/users.repo.js"

import {
    aggregateNotesRepo,
    createNoteRepo,
    deleteAllNotesRepo,
    deleteNoteRepo,
    findNoteByContentRepo,
    findNoteById,
    findNotesByUserIdRepo,
    findNotesWithUserRepo,
    findPaginatedNotesRepo,
    replaceNoteRepo,
    updateAllNotesByUserIdRepo,
    updateNoteRepo
} from "./note.repo.js";

export const createNoteService = async (noteData, userId) => {
    const userExist = await findUserById(userId);
    if (!userExist) throw new Error("user not found");
    const noteToCreate = {
        ...noteData,
        userId: userId
    };

    return await createNoteRepo(noteToCreate);
}

export const updateNoteService = async (id, userId, updateData) => {
    const noteExist = await findNoteById(id);

    if (!noteExist) throw new Error('note not found');

    if (userId !== noteExist.userId.toString()) throw new Error('Unauthorized access');

    const updated = await updateNoteRepo(id, updateData)
    return updated;


}

export const replaceNoteService = async (id, userId, newData) => {
    const noteExist = await findNoteById(id);

    if (!noteExist) throw new Error('note not found');

    if (userId !== noteExist.userId.toString()) throw new Error('Unauthorized access');

    return await replaceNoteRepo(id, newData);

}

export const updateTitleNoteService = async (userId, newTitle) => {

    const notes = await findNotesByUserIdRepo(userId);
    if (!notes) throw new Error('No note found');

    return await updateAllNotesByUserIdRepo(userId, newTitle);
}

export const deleteNoteService = async (id, userId) => {
    const noteExist = await findNoteById(id);

    if (!noteExist) throw new Error('note not found');

    if (userId !== noteExist.userId.toString()) throw new Error('Unauthorized access');

    return await deleteNoteRepo(id);
}

export const getNotesByUserId = async (userId, page, limit) => {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 3;
    const skip = (pageNum - 1) * limitNum;

    const notes = await findPaginatedNotesRepo(userId, skip, limitNum);
    return notes;

}

export const getNoteService = async (id, userId) => {
    const noteExist = await findNoteById(id);

    if (!noteExist) throw new Error('note not found');

    if (userId !== noteExist.userId.toString()) throw new Error('Unauthorized access');

    return noteExist;


}

export const getNoteByContentService = async (content, userId) => {
    const noteExist = await findNoteByContentRepo(userId,content);

    if (!noteExist) throw new Error('note not found');

    return noteExist;


}

export async function getNotesWithUserService(userId) {
    const notes = await findNotesWithUserRepo(userId);
    return notes;
};


export async function getAggregatedNotesService(userId, title) {
    const notes = await aggregateNotesRepo(userId, title);
    return notes;
}

export async function deleteAllNotesService(userId) {
    await deleteAllNotesRepo(userId);
    return { message: "Deleted" };
};