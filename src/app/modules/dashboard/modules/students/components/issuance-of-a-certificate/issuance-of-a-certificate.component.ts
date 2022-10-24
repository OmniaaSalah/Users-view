import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { StudentsService } from '../../services/students/students.service';
 
@Component({  
  selector: 'app-issuance-of-a-certificate',
  templateUrl: './issuance-of-a-certificate.component.html',
  styleUrls: ['./issuance-of-a-certificate.component.scss']
})
export class IssuanceOfACertificateComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id')
  studentName;
  schoolNames;
  grades;
  certificates;
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 6,
  }
  OBJ=[{ signatory1:'', signatory2: '', signatory3: ''}]
  certificateFormGrp: FormGroup;

  rrReasons = [
  {
    "signatory1": "1009648",
    "signatory2": "1003444",
    "signatory3": "1245646",
  },
  {
    "signatory1": "1009648",
    "signatory2": "1003444",
    "signatory3": "1245646",
  },
  {
    "signatory1": "1009648",
    "signatory2": "1003444",
    "signatory3": "1245646",
  },
  {
    "signatory1": "1009648",
    "signatory2": "1003444",
    "signatory3": "1245646",
  },
  {
    "signatory1": "1009648",
    "signatory2": "1003444",
    "signatory3": "1245646",
  },
]




  cities: any[];
  selectedCity: any;
  componentHeaderData: IHeader={
		breadCrump: [
      {label: this.translate.instant('dashboard.students.studentsList'),routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.students.Issuing the certificate manually') }
		],
    mainTitle:{main: this.translate.instant('dashboard.students.Issuance of certificate')}
	}

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private std:StudentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];



  this.certificateFormGrp = fb.group({
    signatory1: new FormControl(),
    signatory2: new FormControl(),
    signatory3: new FormControl()
  });
  }
  
  ngOnInit(): void { 
    this.getStudentName();

    this.getCertificates();
    this.getSchoolNames();
    this.getGrades();
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.bindOldIndex(this.OBJ);
  }

  getStudentName(){
    this.std.getStudentInfo(this.studentId).subscribe(res=>{
      this.studentName = res.arabicName      
    })
  }

  getSchoolNames(){
    this.std.getAllSchoolNames().subscribe(res=>{
      this.schoolNames = res      
    })
  }
  getGrades(){
    this.std.getAllGrades(this.searchModel).subscribe(res=>{      
      this.grades = res.data      
      console.log(this.grades);
    })
  }
  getCertificates(){
    this.std.getAllCertificate().subscribe(res=>{
      this.certificates = res.data      
    })
  }

  sendData(){
    // console.log(this.certificateFormGrp.value);
  }

  bindOldIndex(OBJ)
  { 
        this.certificateFormGrp.patchValue({
          signatory1:OBJ.signatory1, 
          signatory2:OBJ.signatory2,
          signatory3:OBJ.signatory3,
        });
    console.log( this.certificateFormGrp.patchValue({
      signatory1:OBJ.signatory1, 
      signatory2:OBJ.signatory2,
      signatory3:OBJ.signatory3,
    }))
    
       
  }

}
