import mongoose, { Document } from "mongoose";
const companySchema = new mongoose.Schema<CompanySchemaType<Document>>({

    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    }

}, {
    timestamps: true,
});

const Company = mongoose.models.Company as mongoose.Model<CompanySchemaType<Document>> || mongoose.model<CompanySchemaType<Document>>("Company", companySchema);

export { Company };