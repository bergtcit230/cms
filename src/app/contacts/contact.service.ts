import {Subscription } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http:HttpClient) {
    this.contacts = MOCKCONTACTS;

    this.maxContactId=this.getMaxId();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  fetchContacts(){
    return this.http
    .get<Contact[]>(
      'https://cms-project-645db.firebaseio.com/contacts.json'
    )
    .subscribe(
      // success function
     (contacts: Contact[] ) => {
     this.contacts = contacts;
     this.maxContactId =this.getMaxId();
     this.contacts.sort((a, b) => (a['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);

     this.contactListChangedEvent.next(this.contacts.slice());
      }
     
     ,(error: any) => {
       console.log(error)
     }
     ) }

  storeContacts(){
    const contacts = JSON.stringify(this.getContacts());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }; 
    this.http.put('https://cms-project-645db.firebaseio.com/contacts.json', contacts).subscribe(response => {
      this.contactListChangedEvent.next(this.contacts.slice());
        
    });
  }
  
  

  // getOneContact(id: number) {
  //   return this.contacts[id];
  // }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);

    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());

  }

  getMaxId(): number{
    var maxId=0;
     for(const contact of this.contacts){
       const currentId= +contact.id;
       if(currentId> maxId){
         maxId = currentId;
       }
     }
     return maxId;
   }


  addContact(newContact: Contact){
    if (newContact === null || !newContact){
      return;
    }
  
    this.maxContactId++;
    newContact.id=this.maxContactId.toString();
    this.contacts.push(newContact);
  
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  
  updateContact(originalContact: Contact, newContact: Contact){
    if(originalContact=== null || newContact===null){
      return;
    }
  
    const pos = this.contacts.indexOf(originalContact);
    if(pos<0){
      return;
    }
  
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  
  }

}
