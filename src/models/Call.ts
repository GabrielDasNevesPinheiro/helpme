import mongoose, { Document } from "mongoose";

const callSchema = new mongoose.Schema<CallSchemaType<Document>>({

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

const Call = mongoose.models.Call || mongoose.model<CallSchemaType<Document>>("Call", callSchema);

export { Call };