import { Injectable } from '@angular/core';
import { Person } from '../shared/model/person';

@Injectable({
  providedIn: 'root'
})
export class PeronsService {
  private readonly NEXT_ID_KEY = "nextId";
  private readonly PERSON_KEY = "persons";

  constructor() { }

  private getNextId() : number {
    let nextIdString = localStorage.getItem(this.NEXT_ID_KEY);

    return nextIdString ? parseInt(nextIdString) : 0;
  }

  private setNextId(id : number) {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  private setPersons(allPersons : Map<number, Person>) {
    localStorage.setItem(this.PERSON_KEY,
      JSON.stringify(Array.from(allPersons.values())));
  }

  private getPersons() : Map<number, Person> {
    let personString = localStorage.getItem(this.PERSON_KEY);
    let idToPerson = new Map<number, Person>();

    if (personString) {
      JSON.parse(personString).forEach((person : Person) => {
        Object.setPrototypeOf(person, Person.prototype)
        idToPerson.set(person.id, person);
      });
    }

    return idToPerson;
  }

  list() : Person[] {
    return Array.from(this.getPersons().values());
  }

  get(id : number) : Person | undefined {
    return this.getPersons().get(id);
  }

  add(newPersonData:Person) {
    let nextId = this.getNextId();
    newPersonData.id = nextId

    let personsData = this.getPersons();
    personsData.set(nextId, newPersonData);
    this.setPersons(personsData);

    this.setNextId(++nextId);
  }
 
  update(existingPerson : Person) : void {
    let personsData = this.getPersons();

    if (personsData.has(existingPerson.id)) {
      personsData.set(existingPerson.id, existingPerson);
      this.setPersons(personsData);
    }
  }

  delete(existingPersonId : number) : void {
    let personsData = this.getPersons();

    personsData.delete(existingPersonId);
    this.setPersons(personsData);
  }
}
