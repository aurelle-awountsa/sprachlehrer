import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Reviews Schema
const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    reviewText: {
        type: String,
        required: true
    },
    created: {
        type: String
    },
    updated: {
        type: String
    }
});

// Users Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        require: true
    },
    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    level: {
        type: String,
        default : "A1",
        enum: ["A1", "A2", "B1", "B2", "C1", "C2"]
    },
    role: {
        type: String,
        default: 'student',
        enum: ["student", "teacher", "admin"]
    },
    reviews: [reviewSchema]
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema, 'users');
export { mongoose }
