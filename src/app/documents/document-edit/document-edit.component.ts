import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { NgForm } from '@angular/forms';
import {Document} from '../documents.model'


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  id: string;
  editMode =false;
  document: Document;
  
  constructor(private route:ActivatedRoute,private router: Router, private documentService: DocumentService ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.editMode = params['id'] != null;

      if(this.id===null){
        this.editMode=false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(this.id);

      if(this.originalDocument === null){
        return;
      }

      this.editMode=true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));

    });
  }

onSubmit(form:NgForm){
  const values = form.value;
  const newDocument= new Document("", values.name, values.url, null);
  if(this.editMode){
    this.documentService.updateDocument(this.originalDocument,newDocument);
  }
  else{
    this.documentService.addDocument(newDocument);
  }
  this.router.navigate(['documents']); 
}

onCancel(){
  this.router.navigate(['documents']); 
}
}
