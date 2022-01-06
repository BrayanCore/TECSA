import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dto/customer.dto';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {

    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>
    ) {

    }

    async getCustomers(): Promise<Customer[]> {

        const customers = await this.customerModel.find();
        return customers;

    }

    async getCustomer(id: string): Promise<Customer> {

        const customer = await this.customerModel.findById(id);
        return customer;

    }

    async createCustomer(createCustomer: CreateCustomerDTO): Promise<Customer> {

        // console.log(createCustomer);
        // const customer = await new this.customerModel(createCustomer);
        // console.log(customer);
        // return await customer.save();
        return await new this.customerModel({
            ...createCustomer,
            createdAt: new Date(),
        }).save();

    }

}
