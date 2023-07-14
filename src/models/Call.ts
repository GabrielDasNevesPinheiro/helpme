import mongoose from "mongoose";

interface ICall {
    user: mongoose.ObjectId;
    sector: mongoose.ObjectId;
    company: mongoose.ObjectId;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const callSchema = new mongoose.Schema<ICall>({

    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
    },
    sector: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
    },
    company: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
    },
    description: {
        type: String,
        required: true,
        immutable: true,
    },
    status: {
        type: Boolean,
        required: true,
    }

}, {
    timestamps: true,
});

const Call = mongoose.model<ICall>("Call", callSchema);

export default Call;