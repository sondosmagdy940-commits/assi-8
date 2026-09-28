import { Note } from "./notes.model.js";
import { User } from "../Users/users.model.js";
import mongoose from "mongoose";
export async function createNoteRepo(noteData) {
    return await Note.create(noteData);
   
}

export async function findNoteById(id) {
    const note = await Note.findById(id);
    return note;
}
export async function findNoteByContentRepo(userId, content) {
    return await Note.findOne({ userId, content });
}

export async function updateNoteRepo(noteId, updateData) {
    const updatedNote = await Note.findByIdAndUpdate(noteId, updateData, { new: true });
    return updatedNote;
}

export async function replaceNoteRepo(noteId, newNoteData) {
    const replacedNote = await Note.findByIdAndUpdate(
        noteId, 
        newNoteData, 
        { new: true, overwrite: true } 
    );
    return replacedNote;
}

export async function findNotesByUserIdRepo(userId) {
    return await Note.find({ userId });
}

export async function updateAllNotesByUserIdRepo(userId, newTitle) {
    return await Note.updateMany(
        { userId }, 
        { $set: { title: newTitle } }
    );
}

export async function deleteNoteRepo(noteId) {
    return await Note.findByIdAndDelete(noteId);
}

export async function findPaginatedNotesRepo(userId, skip, limit) {
    return await Note.find({ userId })
        .sort({ createdAt: -1 }) 
        .skip(skip) 
        .limit(limit);  
}


export async function findNotesWithUserRepo(userId) {
    return await Note.find({ userId })
        .select("title userId createdAt") 
        .populate({
            path: "userId",           
            select: "email"           
        });
}

export async function aggregateNotesRepo(userId, title) {
    const matchCondition = { userId: new mongoose.Types.ObjectId(userId) };

    if (title) {
        matchCondition.title = { $regex: title, $options: "i" };
    }

    return await Note.aggregate([
        { $match: matchCondition }, 
        {
            $lookup: {
                from: "users",         
                localField: "userId",  
                foreignField: "_id",   
                as: "user"             
            }
        },
        {
            $unwind: "$user"           
        },
        {
            $project: {
                title: 1,
                content: 1,
                userId: 1,
                createdAt: 1,
                updatedAt: 1,
                "user.name": 1,         
                "user.email": 1         
            }
        }
    ]);
}
export async function deleteAllNotesRepo(userId) {
    return await Note.deleteMany({ userId });
}