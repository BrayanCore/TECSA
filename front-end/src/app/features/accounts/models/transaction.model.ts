export class Transaction {

    public constructor(init?: Partial<Transaction>) {
        Object.assign(this, init);
    }

    fechaUltimaAct: string = '';
    monto: number = 0;
    numeroCuenta: string = '';
    terminal: string = '';
    tipo: string = '';
    usuario: string = '';

}