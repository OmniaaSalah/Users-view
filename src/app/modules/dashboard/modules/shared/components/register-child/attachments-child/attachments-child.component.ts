import { Component, Input, OnInit} from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-attachments-child',
  templateUrl: './attachments-child.component.html',
  styleUrls: ['./attachments-child.component.scss']
})
export class AttachmentsChildComponent implements OnInit{
  @Input('mode') mode : 'edit'| 'view'= 'view'
  faXmark = faXmark
  files =[]
  // << DATA PLACEHOLDER >> //

  constructor(
    public childService :RegisterChildService) { }


  ngOnInit(): void {
  }

  onFileUpload(files){
    console.log(files);
    
    this.files = [...files]
    if(files instanceof Array){

      // if(files.length > 1){
      // }else{
      //   this.files.push(files[0])
      // }
      
    }
    console.log(this.files);
    
  }

  onDeleteFile(index){
    console.log(index);
    
    this.files.splice(index,1)

  }
}
