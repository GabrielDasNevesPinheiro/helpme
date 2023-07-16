import mongoose, { Document } from "mongoose";

enum UserLevel {
    BOSS = 0,
    OPERATOR = 1,
    EMPLOYEE = 2,
}

interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    level: Number;
    company?: mongoose.ObjectId;
    sector?: mongoose.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    level: {
        type: Number,
        required: true,
    },
    company: {
        type: mongoose.Types.ObjectId,
    },
    sector: {
        type: mongoose.Types.ObjectId,
    }

}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { User, type IUser, UserLevel };