import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import {Contact} from '../contact.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
id: string;
editMode = false;
hasGroup = false;
contact: Contact;
groupContacts: Contact[]=[];
originalContact: Contact;

  
constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.editMode = params['id'] != null;
      
      if(this.id===null){
        this.editMode=false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if(this.originalContact === null){
        return;
      }

      this.editMode=true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.hasGroup){
        this.groupContacts= JSON.parse(JSON.stringify(this.groupContacts));


        //JAVASCRIPT TO SLICE A COP TO THE CONTACT GROUP ATTRIBUTE
      }

    })
  }

  onSubmit(form:NgForm){
    const values = form.value;

    const newContact= new Contact("", values.name, values.email, values.phone, values.imageUrl, values.group);

    if(this.editMode){
      this.contactService.updateContact(this.originalContact,newContact);
    }

    else{
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['contacts']); 
  }

  onCancel(){
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }

    if (this.contact && newContact.id=== this.contact.id){
      return true;
    }
    
    for(let i=0; i< this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
  const invalidGroupContact= this.isInvalidContact(selectedContact);
    if(invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    
  }

  onRemoveItem(idx:number){
    if(idx <0 || idx>= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(idx, 1)
    
  }
  
}
