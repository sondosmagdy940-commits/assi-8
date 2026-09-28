import { User } from "./users.model.js";

export async function findUserByEmail(email) {
    const existingUser = await User.findOne({ email: email });
    return existingUser;
}
export async function createUser(userData) {
    const newUser = await User.create(userData);
    return newUser;
}
export async function findUserById(userId) {
    const user = await User.findById(userId);
    return user;
}

export async function updateUserRepo(userId, updateData) {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return updatedUser;
}
export async function deleteUserRepo(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
}