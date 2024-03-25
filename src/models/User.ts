import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema<UserSchemaType<Document>>({

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

const User = mongoose.models.User || mongoose.model<UserSchemaType<Document>>("User", userSchema);

export { User };