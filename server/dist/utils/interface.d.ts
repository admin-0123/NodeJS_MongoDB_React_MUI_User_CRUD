import { Document, Types } from 'mongoose';
export interface TABLE_DATA extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    date: Date;
}
