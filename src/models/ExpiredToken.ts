import mongoose, { Document } from "mongoose";

interface IToken extends Document {
    token: string;
}

const tokenSchema = new mongoose.Schema<IToken>({

    token: {
        type: String,
        required: true
    }

});

const ExpiredToken = mongoose.models.ExpiredToken || mongoose.model<IToken>("ExpiredToken", tokenSchema);

export { ExpiredToken, type IToken };