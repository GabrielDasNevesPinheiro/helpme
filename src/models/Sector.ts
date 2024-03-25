import mongoose, { Document } from "mongoose";

const sectorSchema = new mongoose.Schema<SectorSchemaType<Document>>({

    name: {
        type: String,
        required: true,
    }

});

const Sector = mongoose.models.Sector || mongoose.model<SectorSchemaType<Document>>("Sector", sectorSchema);

export { Sector };