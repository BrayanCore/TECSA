export class Customer {

    public constructor(init?: Partial<Customer>) {
        Object.assign(this, init);
    }

    _id: string = '';
    name: string = '';
    address: string = '';
    age: number = 0;
    genre: string = '';
    createdAt?: Date = new Date();

}