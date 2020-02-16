import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import{Document} from '../documents.model';
 import {DocumentService} from "../document.service";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
 documents: Document[]= [];
  

  constructor(private documentService: DocumentService) { }
  
  ngOnInit() {
    this.documents=this.documentService.getDocuments();
    
    this.documentService.documentChangedEvent.subscribe((documents:Document[])=>{
    this.documentService.documents = this.documents;
  })
   
  }

  onSelected(document: Document){
    this.documentService.documentSelectedEvent.emit(document);
  }
}
