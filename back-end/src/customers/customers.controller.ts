import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dto/customer.dto'

@Controller('customers')
export class CustomersController {

    constructor(
        private customerService: CustomersService
    ) {}

    @Post('/create')
    async createCustomer(@Body() customer: CreateCustomerDTO) {

        return await this.customerService.createCustomer(customer);

    }

    @Get('/')
    async getCustomers() {

        // const customers = this.customerService.getCustomers();
        // console.log('AQUI ESTAN:', customers);
        // res.status(HttpStatus.OK).json({
        //     customers
        // });
        return await this.customerService.getCustomers();

    }

    @Get(':id')
    getCustomer() {

    }

}
