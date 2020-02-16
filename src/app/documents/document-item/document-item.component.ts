import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';
import {DocumentService} from "../document.service";

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;
  @Input() index: Number;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

}
