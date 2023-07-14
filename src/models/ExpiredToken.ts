import mongoose from "mongoose";

interface IToken {
    token: string;
}

const tokenSchema = new mongoose.Schema<IToken>({

    token: {
        type: String,
        required: true
    }

});

const ExpiredToken = mongoose.model<IToken>("ExpiredToken", tokenSchema);

export default ExpiredToken;