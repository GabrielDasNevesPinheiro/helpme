declare type CompanySchemaType<T = {}> = {
    _id: mongoose.ObjectId;
    name: string;
    owner: mongoose.ObjectId;
    createdAt: Date;
    updatedAt: Date;
} & T;