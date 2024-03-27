declare type CompanySchemaType<T = {}> = {
    _id: mongoose.ObjectId;
    code: string;
    name: string;
    owner: mongoose.ObjectId;
    createdAt: Date;
    updatedAt: Date;
} & T;