import { Injectable, EventEmitter, Output } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
// import { DocumentsComponent } from './documents.component';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

documentSelectedEvent = new EventEmitter<Document>();
documentChangedEvent =new EventEmitter<Document>();

documents: Document []=[];
  constructor() { 
    this.documents = MOCKDOCUMENTS;
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
 //this.documentChangedEvent.emit(this.documents.slice());
}
}
