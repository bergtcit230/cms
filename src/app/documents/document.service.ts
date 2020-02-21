import { Injectable, EventEmitter, Output } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Subject} from 'rxjs';
import {Subscription} from 'rxjs';
// import { DocumentsComponent } from './documents.component';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

documentSelectedEvent = new EventEmitter<Document>();
documentChangedEvent =new EventEmitter<Document[]>();
documentListChangedEvent = new Subject<Document[]>();

documents: Document []=[];
maxDoucmentId: number;
  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDoucmentId=this.getMaxId();
  }


getDocument(id:string): Document{
  for(const document of this.documents){
    if(document.id=== id){
      return document;
    }
  }
  return null;
}

getDocuments(): Document[]{
  return this.documents.slice();
}

getOneDocument(id:number){
  return this.documents[id];
}

deleteDocument(document: Document){
  if (document === null){
    return;
  }

  const pos = this.documents.indexOf(document);
  if(pos<0){
    return;
  }

this.documents.splice(pos, 1);
 this.documentListChangedEvent.next(this.documents.slice());
}

getMaxId(): number{
 var maxId=0;
  for(const document of this.documents){
    const currentId= +document.id;
    if(currentId> maxId){
      maxId = currentId;
    }
  }
  return maxId;
}

addDocument(newDocument: Document){
  if (newDocument === null || !newDocument){
    return;
  }

  this.maxDoucmentId++;
  newDocument.id=this.maxDoucmentId.toString();
  this.documents.push(newDocument);

  this.documentListChangedEvent.next(this.documents.slice());
}

updateDocument(originalDocument: Document, newDocument: Document){
  if(originalDocument=== null || newDocument===null){
    return;
  }

  const pos = this.documents.indexOf(originalDocument);
  if(pos<0){
    return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  this.documentListChangedEvent.next(this.documents.slice());

}
}
