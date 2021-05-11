import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import * as moment_ from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private data: Person[] = [];

  constructor() { }

  public createDB() {
    let p = new Person();
    const parentp = new Person();

    p = new Person();
    p.id = 1;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = { id: 1, name: 'Basket ball' };
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));

    parentp.id = 2;
    parentp.lastname = 'BANNING';
    parentp.firstname = 'Peter';
    parentp.deleted = true;
    parentp.hobby = 1;
    parentp.age = 10;
    parentp.birthdate = moment_(new Date(1967, 2, 22));
    p.parent = parentp;
    this.data.push(p);

    p = new Person();
    p.id = 2;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));
    this.data.push(p);

    p = new Person();
    p.id = 3;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);

    p = new Person();
    p.id = 4;
    p.lastname = 'BANNING';
    p.firstname = 'Peter';
    p.deleted = false;
    p.hobby = 1;
    p.age = 10;
    p.birthdate = moment_(new Date(1967, 2, 22));
    this.data.push(p);

    p = new Person();
    p.id = 5;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));
    this.data.push(p);

    p = new Person();
    p.id = 6;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));
    this.data.push(p);

    p = new Person();
    p.id = 7;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);

    p = new Person();
    p.id = 8;
    p.lastname = 'BANNING';
    p.firstname = 'Peter';
    p.deleted = false;
    p.hobby = 1;
    p.age = 10;
    p.birthdate = moment_(new Date(1967, 2, 22));
    this.data.push(p);

    p = new Person();
    p.id = 9;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));
    this.data.push(p);

    p = new Person();
    p.id = 10;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));
    this.data.push(p);

    p = new Person();
    p.id = 11;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);

    p = new Person();
    p.id = 12;
    p.lastname = 'BANNING';
    p.firstname = 'Peter';
    p.deleted = false;
    p.hobby = 1;
    p.age = 10;
    p.birthdate = moment_(new Date(1967, 2, 22));
    this.data.push(p);

    p = new Person();
    p.id = 13;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));
    this.data.push(p);

    p = new Person();
    p.id = 14;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));
    this.data.push(p);

    p = new Person();
    p.id = 15;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);

    p = new Person();
    p.id = 16;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);

    p = new Person();
    p.id = 17;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);

    p = new Person();
    p.id = 18;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);

    p = new Person();
    
    p.id = 19;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.data.push(p);
  }

  public getPeoples(): Observable<Person[]> {
    return new Observable<Person[]>(subscriber => {
      subscriber.next(this.data);
      subscriber.complete();
    });
  }

  public getPeoplesByTerm(term: string): Observable<Person[]> {
    return new Observable<Person[]>(subscriber => {
      subscriber.next(this.data.filter(person => {
        return (person.lastname.indexOf(term) !== -1);
      }));
      subscriber.complete();
    });
  }
}
