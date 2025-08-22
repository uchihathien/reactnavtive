export class Acount{
    public tk: string;

    private balance: number;
    readonly currency: string;

    constructor(tk:string, balance:number, currency:string ){
        this.tk = tk;
        this.balance = balance;
        this.currency = currency;
    }


}