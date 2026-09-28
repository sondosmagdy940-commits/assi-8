import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
        validate: {
            validator: function(value) {
                return value !== value.toUpperCase();
            },
            message: "Title cannot be entirely uppercase!"
        }
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export const Note = model('Note', noteSchema);