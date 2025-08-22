export class Book{
    title: string
    author: string
    year: number
    constructor(title:string, author:string,year:number){
        this.title = title
        this.author = author
        this.year=year
    }
    displayInfo(): void {
    console.log(`title: ${this.title}, author: ${this.author}, Year: ${this.year}`);
  }
}