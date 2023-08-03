import mongoose, { Document } from "mongoose";

interface ICall extends Document {
    user: mongoose.ObjectId;
    sector: mongoose.ObjectId;
    company: mongoose.ObjectId;
    description: string;
    status: boolean;
    closedBy: mongoose.ObjectId;
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
    },
    closedBy: {
        type: mongoose.Types.ObjectId,
    }

}, {
    timestamps: true,
});

const Call = mongoose.models.Call || mongoose.model<ICall>("Call", callSchema);

export { Call, type ICall };