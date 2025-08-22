"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const bai1_1 = require("./bai1");
class Student extends bai1_1.Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    displayAllInfo() {
        this.displayInfo();
        console.log(`Grade: ${this.grade}`);
    }
}
exports.Student = Student;
