export class Bank{
    balance : number
    constructor(banlance:number){
        this.balance = banlance;
    }

    deposit(money: number): void{
        this.balance = this.balance + money;
    }
    withdraw(money: number): void{
        if(money > this.balance){
            console.log( 'Tien gui nhieu hon tien dang co');
            return;
           
        }
        this.balance - money;
    }
}