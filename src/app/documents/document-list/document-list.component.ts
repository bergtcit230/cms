import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Subscription } from 'rxjs';
import{Document} from '../documents.model';
 import {DocumentService} from "../document.service";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
 documents: Document[]= [];
 subscription: Subscription;

  constructor(private documentService: DocumentService) { }
  
  ngOnInit() {
    this.documents=this.documentService.getDocuments();
    
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[])=>{
        this.documents = documents;
      }
    )
   
  }

  onSelected(document: Document){
    this.documentService.documentSelectedEvent.emit(document);
  }
  ngOnDestroy(): void{
  this.subscription.unsubscribe();  
  }
}
