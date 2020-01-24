import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import {Message} from "../message.model";
@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput',{static:false}) subjectInputRef: ElementRef;
  @ViewChild('messageInput',{static:false}) messageInputRef: ElementRef;

  currentSender="Tiffany Berg";

  @Output () messageAdded = new EventEmitter<Message>();


  constructor() { }

  ngOnInit() {
  }

  onSendItem(){
    const ingSubject = this.subjectInputRef.nativeElement.value;
    const ingMessage = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('1',ingSubject, ingMessage, this.currentSender);
    this.messageAdded.emit(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value ="";
    this.messageInputRef.nativeElement.value = "";
  }
}
