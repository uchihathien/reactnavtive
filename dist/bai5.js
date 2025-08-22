"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
class Bank {
    constructor(banlance) {
        this.balance = banlance;
    }
    deposit(money) {
        this.balance = this.balance + money;
    }
    withdraw(money) {
        if (money > this.balance) {
            console.log('Tien gui nhieu hon tien dang co');
            return;
        }
        this.balance - money;
    }
}
exports.Bank = Bank;
