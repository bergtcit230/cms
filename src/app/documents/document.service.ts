import { Injectable, EventEmitter, Output } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Subject} from 'rxjs';
import {Subscription} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

documentSelectedEvent = new EventEmitter<Document>();
documentChangedEvent =new EventEmitter<Document[]>();
documentListChangedEvent = new Subject<Document[]>();

documents: Document []=[];
maxDoucmentId: number;

  constructor(private http:HttpClient, private documentService: DocumentService) { 
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

// getOneDocument(id:number){
//   return this.documents[id];
// }

deleteDocument(document: Document){
  if (document === null){
    return;
  }

  const pos = this.documents.indexOf(document);
  if(pos<0){
    return;
  }

this.documents.splice(pos, 1);
this.storeDocuments();
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

  this.storeDocuments();
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
  this.storeDocuments();

}

storeDocuments(){
  const documents = JSON.stringify(this.documentService.getDocuments());
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }; 
  this.http.put('https://cms-project-645db.firebaseio.com/localhost:3000/documents', documents).subscribe(response => {
    this.documentListChangedEvent.next(this.documents.slice());
      
  });
}


fetchDocuments() {
  return this.http
    .get<Document[]>(
      'https://cms-project-645db.firebaseio.com/documents.json', 
    )
    .subscribe(
      // success function
     (documents: Document[] ) => {
     this.documents = documents;
     this.maxDoucmentId =this.getMaxId();
     this.documents.sort((a, b) => (a['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);

     this.documentListChangedEvent.next(this.documents.slice());
      }
     
     ,(error: any) => {
       console.log(error)
     }
     ) 
}

}
