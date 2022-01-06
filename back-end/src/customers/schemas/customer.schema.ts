import { Schema } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    name: String,
    address: String,
    age: Number,
    genre: String,
    createdAt: Date
});