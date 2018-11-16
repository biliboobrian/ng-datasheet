export class Person {

    private _id: number;
    private _lastname: string;
    private _firstname: string;
    private _hobby: number;
    private _birthdate: any;
    private _wiki: Object;
    private _age: number;

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

    public set hobby(val: number) {
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
}
