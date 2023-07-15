import mongoose, { Document } from "mongoose";

interface ISector extends Document {
    name: string;
}


const sectorSchema = new mongoose.Schema<ISector>({

    name: {
        type: String,
        required: true,
    }

});

const Sector = mongoose.models.Sector || mongoose.model<ISector>("Sector", sectorSchema);

export { Sector, type ISector };