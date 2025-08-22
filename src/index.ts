import { Person } from "./bai1";
import { Student } from "./bai2";
import { Car } from "./bai3";
import { Rectangle } from "./bai4";
import { Bank } from "./bai5";
import { Book } from "./bai6";
import { User } from "./bai7";
import { Product } from "./bai8";


console.log("bai1");

var person = new Person("noname", 26)
console.log(person);
console.log("---------------------");

console.log("bai2");

const student = new Student("Bob", 20, "A");
student.displayAllInfo();
console.log("---------------------");



console.log("bai3");

var car = new Car("zz","zz",1)
car.displayInfo();
console.log("---------------------");

console.log("bai4");

var rectangle = new Rectangle(5.1,4.1);
console.log( 'area =',rectangle.area());

console.log( 'perimeter =',rectangle.perimeter());
console.log("---------------------");


console.log("bai5");
var bank = new Bank(100);
bank.deposit(5);
console.log( 'Balance =',bank.balance);
bank.deposit(10)
console.log( 'Balance =',bank.balance);

console.log("---------------------");

console.log("bai6");
var book = new Book('1','2',3)
console.log(book.displayInfo());
console.log("---------------------");

console.log("bai7");

var user = new User('thien')
console.log(user.getName());
user.setName("hieu")
console.log(user.getName());


console.log("---------------------");

console.log("bai8");

var products: Product[] = [
    new Product("1", 1200),
    new Product("2", 25),
    new Product("3", 80),
    new Product("4", 200),
    new Product("5 ", 10)
];

var price100 = products.filter(product => product.price > 100);

// Display the filtered products
console.log("Products with price > 100:");
price100.forEach(product => {
    console.log(`${product.name}: ${product.price}`);

});

console.log("---------------------");








