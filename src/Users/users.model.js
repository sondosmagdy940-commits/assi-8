import { Schema , model } from "mongoose";

const userSchema = new Schema(
    {
       name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    }
    },
    {
        timeseries:true
    }
)

export const User = model('User',userSchema);