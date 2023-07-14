import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    level: Number;
    company: mongoose.ObjectId;
    sector: mongoose.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({

    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    level: {
        type: Number,
        required: true,
    },
    company: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    sector: {
        type: mongoose.Types.ObjectId,
        required: true,
    }

}, {
    timestamps: true,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;