import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Message} from '../message.model';
import {MessageService} from "../message.service";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
  messages: Message[]=[];
  messageChangedEvent = new EventEmitter<Message[]>();
  //   new Message('1', 'Hello',"How are you today?","Brother Thayne"),
  //   new Message('2', 'Re: Hello',"I am doing well, and you?","Tiffany Berg"),
  //   new Message('3', 'Re: Hello',"Pretty great. Thanks for asking","Brother Thayne"),
  //   new Message('4', 'Quick Question',"Is this how you do your assingment?","Tiffany Berg")
  // ];



  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    
  this.messageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }
  

 
  
}
