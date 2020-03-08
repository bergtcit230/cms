import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[]=[];

  maxMessageId: number;
  constructor(private http:HttpClient) { 
    this.messages = this.initMessages();
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
getMaxId(): number{
  var maxId=0;
   for(const message of this.messages){
     const currentId= +message.id;
     if(currentId> maxId){
       maxId = currentId;
     }
   }
   return maxId;
 }
 
 initMessages(){
 return this.http
    .get(
      'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
    )
    .subscribe(response => {
      console.log(response);
    });
}

}
