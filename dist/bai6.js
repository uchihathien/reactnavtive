"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    displayInfo() {
        console.log(`title: ${this.title}, author: ${this.author}, Year: ${this.year}`);
    }
}
exports.Book = Book;
