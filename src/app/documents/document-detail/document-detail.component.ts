import { Component, OnInit, Input } from '@angular/core';
import {Document} from '../documents.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
document: Document;
nativeWindow: any;
id: number;
  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
  private router: Router,
private windowRefService: WindRefService) { 
  this.nativeWindow = windowRefService.getNativeWindow();
}

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.document=this.documentService.getOneDocument(this.id);
    }
    );
  }
  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document)
    this.router.navigate(['documents']); 
  }
}
