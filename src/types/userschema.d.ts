declare type UserSchemaType<T = {}> = {
    _id: mongoose.ObjectId;
    name: string;
    email: string;
    level: Number;
    company?: mongoose.ObjectId;
    sector?: string;
    createdAt?: Date;
    updatedAt?: Date;
} & T;