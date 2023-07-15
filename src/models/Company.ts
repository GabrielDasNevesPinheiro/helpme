import mongoose from "mongoose";

interface ICompany {
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

const Company = mongoose.model<ICompany>("Company", companySchema);

export { Company, type ICompany };