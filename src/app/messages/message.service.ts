import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[]=[];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

getMessage(id:string): Message{
  for(const message of this.messages){
    if(message.id=== id){
      return message;
    }
  }
  return null;
}
getMessages(): Message[]{
  return this.messages.slice();
}
addMessage(message:Message){
  this.messages.push(message);
  this.messageChangedEvent.emit(this.messages.slice());
}
initMessages(){
  //  return this.http
  //     .get(
  //       'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
  //     )
  //     .subscribe(response => {
  //       console.log(response);
  //     });
}// }
  
}
