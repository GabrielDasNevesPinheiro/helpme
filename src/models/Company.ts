import mongoose, { Document } from "mongoose";
const companySchema = new mongoose.Schema<CompanySchemaType<Document>>({

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

const Company = mongoose.models.Company || mongoose.model<CompanySchemaType<Document>>("Company", companySchema);

export { Company };