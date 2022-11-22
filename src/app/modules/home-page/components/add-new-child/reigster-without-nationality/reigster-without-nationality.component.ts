import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { CustomFile } from 'src/app/modules/dashboard/modules/assignments/assignments/exam-upload/exam-upload.component';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';

@Component({
  selector: 'app-reigster-without-nationality',
  templateUrl: './reigster-without-nationality.component.html',
  styleUrls: ['./reigster-without-nationality.component.scss']
})
export class ReigsterWithoutNationalityComponent implements OnInit {

  unregisterChild : IunregisterChild;

  step=1
  surveyType = [
    { name: 'اجباري', code: 0 },
    { name: 'اختياري', code: 1 }
  ];
  gender = [
    { name: 'Female', code: 0 },
    { name: 'Male', code: 1 }
  ];
  student =
  {
    name: 'محمد على',
    age: 15,
    regestered: false,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school: 'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation: 'ابن الاخ',
    src: 'assets/images/avatar.png'
  }
  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];

  constructor(private parentService : ParentService,
     private _router: ActivatedRoute,
     private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getUnregisterChild();
  }


  registernewchildform=this.fb.group({
    id:[],
    chronicDiseases: [[{name:'أمراض القلب'},{name:'السكرى'}]],
  })

  getUnregisterChild(){

    let id = Number(this._router.snapshot.paramMap.get('id'));
    this.parentService.getUnregisterChildern(id).subscribe(response=>{
      this.unregisterChild = response;
      console.log(this.unregisterChild);
    })
  }
  onLogoFileUpload(event: CustomFile[]){
		console.log(event);

		const file={
			title:event[0].name,
			data: event[0].url
		}

		// this.schoolsService.updateSchoolLogo(this.schoolId, file).subscribe()
	}
}
