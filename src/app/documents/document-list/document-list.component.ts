import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import{Document} from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
 documents: Document[]= [
    // new Document("1","COMM 465: Advanced Visual Media","A Capstone class for Visual Communications Majors", "https://content.byui.edu/file/COMM 465 description.pdf",""),
    // new Document("2","REL 275c: Book of Mormon","Learn the teachings of the prophets in the Book of Mormon", "https://content.byui.edu/file/REL 275 description.pdf",""),
    // new Document("3","FDSCI 230: Neanderthals and other Successes","Learn about how the world began, from chemistry to biology and the origins of life", "https://content.byui.edu/file/FDSCI 230 description.pdf","")];
    new Document ('1','Bro.Jackson','jacksonk@byui.edu','208-496-3771','https://web.byui.edu/Directory/Employee/jacksonk.jpg'),
    new Document ('2','Bro.Barzee','barzeer@byui.edu','208-496-3768','https://web.byui.edu/Directory/Employee/barzeer.jpg')];
    
  @Output() documentWasSelected = new EventEmitter<Document>();

  constructor() { }

  ngOnInit() {
  }

  onDocumentSelected(document: Document){
    this.documentWasSelected.emit(document);
  }
}
