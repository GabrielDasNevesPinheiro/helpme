declare type UserSchemaType<T = {}> = {
    _id: mongoose.ObjectId;
    name: string;
    email: string;
    level: Number;
    company?: mongoose.ObjectId;
    sector?: mongoose.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
} & T;