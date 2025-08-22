"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai1_1 = require("./bai1");
const bai2_1 = require("./bai2");
const bai3_1 = require("./bai3");
const bai4_1 = require("./bai4");
const bai5_1 = require("./bai5");
const bai6_1 = require("./bai6");
const bai7_1 = require("./bai7");
const bai8_1 = require("./bai8");
console.log("bai1");
var person = new bai1_1.Person("noname", 26);
console.log(person);
console.log("---------------------");
console.log("bai2");
const student = new bai2_1.Student("Bob", 20, "A");
student.displayAllInfo();
console.log("---------------------");
console.log("bai3");
var car = new bai3_1.Car("zz", "zz", 1);
car.displayInfo();
console.log("---------------------");
console.log("bai4");
var rectangle = new bai4_1.Rectangle(5.1, 4.1);
console.log('area =', rectangle.area());
console.log('perimeter =', rectangle.perimeter());
console.log("---------------------");
console.log("bai5");
var bank = new bai5_1.Bank(100);
bank.deposit(5);
console.log('Balance =', bank.balance);
bank.deposit(10);
console.log('Balance =', bank.balance);
console.log("---------------------");
console.log("bai6");
var book = new bai6_1.Book('1', '2', 3);
console.log(book.displayInfo());
console.log("---------------------");
console.log("bai7");
var user = new bai7_1.User('thien');
console.log(user.getName());
user.setName("hieu");
console.log(user.getName());
console.log("---------------------");
console.log("bai8");
var products = [
    new bai8_1.Product("1", 1200),
    new bai8_1.Product("2", 25),
    new bai8_1.Product("3", 80),
    new bai8_1.Product("4", 200),
    new bai8_1.Product("5 ", 10)
];
var price100 = products.filter(product => product.price > 100);
// Display the filtered products
console.log("Products with price > 100:");
price100.forEach(product => {
    console.log(`${product.name}: ${product.price}`);
});
console.log("---------------------");
