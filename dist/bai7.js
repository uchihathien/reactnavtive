"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    // Setter for name
    setName(newName) {
        if (newName.trim().length === 0) {
            throw new Error("Name cannot be empty.");
        }
        this.name = newName;
    }
}
exports.User = User;
