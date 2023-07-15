import mongoose, { Document } from "mongoose";

interface ICompany extends Document {
    name: string;
    owner: mongoose.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const companySchema = new mongoose.Schema<ICompany>({

    name: {
        type: String,
        required: true,
        unique: true,
    },

    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    }

}, {
    timestamps: true,
});

const Company = mongoose.models.Company || mongoose.model<ICompany>("Company", companySchema);

export { Company, type ICompany };