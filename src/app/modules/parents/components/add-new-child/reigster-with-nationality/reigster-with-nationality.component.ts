import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';

@Component({
  selector: 'app-reigster-with-nationality',
  templateUrl: './reigster-with-nationality.component.html',
  styleUrls: ['./reigster-with-nationality.component.scss']
})
export class ReigsterWithNationalityComponent implements OnInit {
  registerWithIdentityForm: FormGroup
  imageResult1 = []
  imageResult2 = []
  imageResult3 = []
  relativeityTypes = 
  [
   { name:{en:"son",ar:"ابن"},id:1},
   { name:{en:"daughter",ar:"بنت"},id:2},
   { name:{en:"cousen",ar:"ابن عم"},id:3}
  ]


  constructor(private fb:FormBuilder, private translate: TranslateService) { }

  ngOnInit(): void {
    this.registerWithIdentityForm = this.fb.group({
      identityNumber:['',Validators.required],
      relativityType:['',Validators.required],
      note:''
    })
  }

  messageUpload1(files){
    this.imageResult1 = files    
   }
  
  messageDeleted1(event){
      this.imageResult1 = event
   }

  messageUpload2(files){
    this.imageResult2 = files    
   }
  
  messageDeleted2(event){
      this.imageResult2 = event
   }

   messageUpload3(files){
    this.imageResult3 = files    
   }
  
    messageDeleted3(event){
      this.imageResult3 = event
   }

   sendRegisterForm(){
    let data = {
      'identityNumber': this.registerWithIdentityForm.value.identityNumber,
      'relativityType': this.registerWithIdentityForm.value.relativityType,
      'note': this.registerWithIdentityForm.value.note,
      'identityImg': this.imageResult1,
      'childImg': this.imageResult2,
      'birthdateImg': this.imageResult3,
    }
    console.log(data);
   }

}
