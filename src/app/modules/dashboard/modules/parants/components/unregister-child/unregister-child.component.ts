import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { MediaService } from 'src/app/shared/services/media/media.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
// import { IunregisterChild } from '../../models/IunregisterChild';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-unregister-child',
  templateUrl: './unregister-child.component.html',
  styleUrls: ['./unregister-child.component.scss']
})
export class UnregisterChildComponent implements OnInit {
  child : IunregisterChild;

  childId = +this._router.snapshot.paramMap.get('id');

  countries$ = this.countriesService.getCountries()
  genderOptions=this.sharedService.genderOptions

  editMode=false
  step=1

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


  childForm = this.fb.group({
    id:[this.childId],
    name: this.fb.group({ ar: ['', Validators.required], en:['', Validators.required] }),
    surname: this.fb.group({ ar: ['', Validators.required], en:['', Validators.required] }),
    gender:[''],
    relativeRelation: this.fb.group({
      id: ['', Validators.required],
      arabicName:['', Validators.required],
      englishName: ['', Validators.required]
    }),
    passportNumber: [163565, Validators.required],
    emiratesIdPath:['', Validators.required],
    birthDate: ['', Validators.required],
    nationlityId: ['', Validators.required],
    imagePath: ['', Validators.required],
    guardianId: ['', Validators.required],
    emiratesIdNumber: [2524, Validators.required],
    religionId: [1, Validators.required],
    childAttachments:this.fb.array([])
  })

  get attachmentsList() {return this.childForm.controls['childAttachments'] as FormArray}

  attch=[
    {
      titel:{ar:"هويه الطالب ", en:"Identity"},
      url:"",
      name: "ahmed.png",
      comment:'وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت'
    },
    {
      titel:{ar:"هويه الطالب ", en:"Identity"},
      url:"",
      name: "ahmed.png",
      comment:'وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت'
    },
    {
      titel:{ar:"هويه الطالب ", en:"Identity"},
      url:"",
      name: "ahmed.png",
    }
  ]

  constructor(
    private parentService : ParentService,
    private countriesService:CountriesService,
    private fb :FormBuilder,
     private _router: ActivatedRoute,
     private sharedService: SharedService,
     private mediaService:MediaService) { }

  ngOnInit(): void {
    this.getUnregisterChild();
  }
  getUnregisterChild(){
    this.fillAttachments(this.attch)
    console.log('kmjfhadjkfjkanhdkjasnda');
    
    this.parentService.getChild(this.childId).subscribe(response=>{
      this.childForm.patchValue({...response, religionId:2,passportNumber:2545,emiratesIdNumber:562})
      this.child = response;
    })
  }

  updateChild(childData){
    this.parentService.updateChild(this.childId, childData).subscribe(res=>{

    })
  }

  attachmentGroup(item){    
    return this.fb.group({
      url:[item.url?? ''],
      titel: this.fb.group({
        ar:[item.titel.ar?? ''],
        en:[item.titel.en?? '']
      }),
      name:[item.name?? ''],
      comment:[item.comment?? '']
    })
  }

  fillAttachments(list){
    let formArr= this.fb.array([]) as FormArray

    list.forEach(el =>{
      this.attachmentsList.push(this.attachmentGroup(el))
    })
  }

  addnewAttachmentTo(attachment:CustomFile[], index){
    let attach = attachment[0]
    this.attachmentsList.at(index).patchValue({...attach})
    // this.attachmentsList.at(index).patchValue({religionId:1,passportNumber:2545,emiratesIdNumber:562})


  }

  resetAttachment(index){
    let resetVal = {name:'', url:'', comment:''}
    this.attachmentsList.at(index).patchValue(resetVal)
  }

  uploadProfileImage(event){
    let file = event.target.files[0]
    const FORM_DATA = new FormData()
    FORM_DATA.append('file', file)

    this.mediaService.uploadMedia(FORM_DATA).subscribe(res=>{
      this.childForm.controls['imagePath'].setValue(res.url)
      this.child.imagePath= res.url
    })


  }

}
