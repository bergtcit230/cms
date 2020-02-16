import { Component, OnInit, Input, Output } from '@angular/core';
import {Message} from "../message.model";
import {Contact} from '../../contacts/contact.model';
import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string="";
  canEdit: boolean =false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender= contact.name;
  }

}
