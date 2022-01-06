import { Document } from "mongoose";

export interface Customer extends Document {
    readonly name: string;
    readonly address: string;
    readonly age: number;
    readonly genre: string;
    readonly createdAt: Date
}