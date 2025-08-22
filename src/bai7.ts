export class User{
    private name:string
    constructor(name:string){
        this.name = name;
    }

    public getName(): string {
    return this.name;
  }

  // Setter for name
  public setName(newName: string) {
    if (newName.trim().length === 0) {
      throw new Error("Name cannot be empty.");
    }
    this.name = newName;
  }
}