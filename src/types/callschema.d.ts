
declare type CallSchemaType<T = {}> = T & {
    _id: mongoose.ObjectId;
    user: mongoose.ObjectId;
    sector: string;
    company: mongoose.ObjectId;
    description: string;
    status: boolean;
    closedBy: mongoose.Types.ObjectId | mongoose.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
