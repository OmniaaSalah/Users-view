import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, finalize, map, pluck } from 'rxjs';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-attachments-child',
  templateUrl: './attachments-child.component.html',
  styleUrls: ['./attachments-child.component.scss']
})
export class AttachmentsChildComponent implements OnInit, OnDestroy {
  @Input('mode') mode : 'edit'| 'view'= 'view'
  
  get claimsEnum(){ return ClaimsEnum }

  addMode =false

  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  filesTypesOptions = [...this.sharedService.fileTypesOptions]

  fileForm= this.fb.group({
    titel: this.fb.group({
      ar:[, Validators.required],
      en:[, Validators.required]
    }),
    fileType:[, Validators.required]
  })

  attachments=[]
  loading

  constructor(
    private fb:FormBuilder,
    private studentService: StudentsService,
    public childService :RegisterChildService,
    private toaster:ToastrService,
    private sharedService:SharedService,
    private route: ActivatedRoute) { }



  ngOnInit(): void {

    // this.childService.submitBtnClicked$.subscribe(val =>{
    //   if(val && this.step!=4) this.updateStudent(this.studentId)
    // })

    this.childService.submitBtnClicked$
    .pipe(filter(val=> val))
    .subscribe(val =>{
      
      if(val) this.updateStudentAttachment(this.studentId, this.attachments)
      // this.childService.submitBtnClicked$.next(null)
      
    })
 
     this.getAttachment()

  }

  getAttachment(){
    this.loading =true
    this.studentService.getStudentAttachment(this.studentId || this.childId)
    .pipe(map(res => {
      return res.map(value=>{
        const {id, ...otherProps} = value;
        return otherProps;
      })
    }))
    .subscribe(res=>{
      this.loading =false
      this.attachments = res
    },()=>{
      this.loading =false
    })
  }

  updateStudentAttachment(studentId, attachments){
    // let att = attachments.splice(0,2)
    this.studentService.updateStudentAttachment(studentId,attachments)
    .pipe(finalize(()=> {
      this.childService.submitBtnClicked$.next(null)
      this.childService.onEditMode$.next(false)
    })).subscribe(res=>{

      // this.attachments = res
      this.getAttachment()
      this.toaster.success('تم التعديل بنجاح')
    })
  }

  onFileUpload(file, i){
    
    file= file[0]
    this.attachments[i] = {...this.attachments[i], url: file.url,name:file.name, comment: file.comment}
  }


  addNewAttachment(){
    this.attachments.unshift({url: '', name: '', titel:this.fileForm.value.titel, comment:''})
    this.addMode=false
    this.fileForm.reset()
  }

  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }
}
