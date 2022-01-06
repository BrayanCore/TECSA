export class SavingAccount {

    public constructor(init?: Partial<SavingAccount>) {
        Object.assign(this, init);
    }

    estado: string = 'Activa';
    fechaUltimaAct: string = "";
    idCliente: number = 0;
    numeroCuenta: string = '';
    saldo: number = 0;

}