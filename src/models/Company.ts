import mongoose from "mongoose";

interface ICompany {
    name: string;
    owner: mongoose.ObjectId;
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

});