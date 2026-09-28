import { createUser, deleteUserRepo, findUserByEmail, findUserById, updateUserRepo } from "./users.repo.js";
import bcrypt from 'bcrypt';

export const signup = async (userData) => {
    const exist = await findUserByEmail(userData.email);
    if (exist) {
        throw new Error('Email already exists.'); 
    }
    console.log("**",userData.Password)
    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    userData.Password = hashedPassword;
    console.log(userData.Password);
    

    return await createUser(userData);
};

export const loggin = async (email,password)=>{
    
    const exist = await findUserByEmail(email);
    if (!exist) throw new Error('user not found');

    const isPasswordValid = await bcrypt.compare(password, exist.Password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    return exist;

}

export const update = async (id , updateData )=>{
    // check id 
    const userExist = await findUserById(id);
    if(!userExist)throw new Error('user not exist');

    if (updateData.email && updateData.email !== userExist.email) {
        const emailExist = await findUserByEmail(updateData.email);
        if (emailExist) {
            throw new Error('Email already exists.'); 
        }}

    const updatedData= await updateUserRepo(id, updateData );
    return updatedData;
    
}
export const deleteUser= async (id)=>{
   const userExist = await findUserById(id);
    if(!userExist)throw new Error('user not exist');
    
   return await deleteUserRepo(id);

}

export const getUser=async(id)=>{
   return await findUserById(id)
}