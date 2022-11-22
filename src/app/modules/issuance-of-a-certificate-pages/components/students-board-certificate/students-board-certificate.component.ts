import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-students-board-certificate',
  templateUrl: './students-board-certificate.component.html',
  styleUrls: ['./students-board-certificate.component.scss']
})
export class StudentsBoardCertificateComponent implements OnInit {
  @Input() studentBoard;
  @Output() addAttachment = new EventEmitter()
  selected = false;
  constructor(private issuance:IssuanceCertificaeService) { }

  ngOnInit(): void {  
  }

  increaseOrDecrease(){
    // console.log(event.target);
    // console.log(studentBoard);
    this.selected = !this.selected;
    
    this.addAttachment.emit(this.selected)
}
}
