export class Person {

    private _id: number;
    private _lastname: string;
    private _firstname: string;
    private _hobby: any;
    private _birthdate: any;
    private _wiki: Object;
    private _age: number;
    private _deleted: boolean;
    private _parent: Person;

    public get parent() {
        return this._parent;
    }

    public set parent(val: Person) {
        this._parent = val;
    }

    public get id() {
        return this._id;
    }

    public set id(val: number) {
        this._id = val;
    }

    public get lastname() {
        return this._lastname;
    }

    public set lastname(val: string) {
        this._lastname = val;
    }
    public get firstname() {
        return this._firstname;
    }

    public set firstname(val: string) {
        this._firstname = val;
    }
    public get age() {
        return this._age;
    }

    public set age(val: number) {
        this._age = val;
    }
    public get hobby() {
        return this._hobby;
    }

    public set hobby(val: any) {
        this._hobby = val;
    }
    public get birthdate() {
        return this._birthdate;
    }

    public set birthdate(val: any) {
        this._birthdate = val;
    }

    public get wiki() {
        return this._wiki;
    }

    public set wiki(val: Object) {
        this._wiki = val;
    }

    public get deleted() {
        return this._deleted;
    }

    public set deleted(val: boolean) {
        this._deleted = val;
    }
}
