
declare type CallSchemaType<T = {}> = T & {
    _id: mongoose.ObjectId;
    user: mongoose.ObjectId;
    sector: mongoose.ObjectId;
    company: mongoose.ObjectId;
    description: string;
    status: boolean;
    closedBy: mongoose.Types.ObjectId | mongoose.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
