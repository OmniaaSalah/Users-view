import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, finalize, map, pluck } from 'rxjs';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-attachments-child',
  templateUrl: './attachments-child.component.html',
  styleUrls: ['./attachments-child.component.scss']
})
export class AttachmentsChildComponent implements OnInit, OnDestroy {
  @Input('mode') mode : 'edit'| 'view'= 'view'
  x = inject(ActivatedRoute)

  studentId = this.route.snapshot.paramMap.get('id')

  attachments


  constructor(
    private fb:FormBuilder,
    private studentService: StudentsService,
    public childService :RegisterChildService,
    private toaster:ToastrService,
    private route: ActivatedRoute) { }



  ngOnInit(): void {

    // this.childService.submitBtnClicked$.subscribe(val =>{
    //   if(val && this.step!=4) this.updateStudent(this.studentId)
    // })

    this.childService.submitBtnClicked$
    .pipe(filter(val=> val))
    .subscribe(val =>{
      console.log(val);
      
      if(val) this.updateStudentAttachment(this.studentId, this.attachments)
      // this.childService.submitBtnClicked$.next(null)
      
    })
 
     this.getAttachment()

  }

  getAttachment(){
    this.studentService.getStudentAttachment(this.studentId)
    .pipe(map(res => {
      return res.map(value=>{
        const {id, ...otherProps} = value;
        return otherProps;
      })
    }))
    .subscribe(res=>{

      let attch=[
        {
          titel:{ar:"هويه الطالب ", en:"Identity"},
          url:"",
          name: "ahmed.png",
          comment:'وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت'
        },
        {
          titel:{ar:"هويه الطالب ", en:""},
          url:"",
          name: "ahmed.png",
          comment:'وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت'
        },
        {
          titel:{ar:"هويه الطالب ", en:""},
          url:"",
          name: "ahmed.png",
        }
      ]
      this.attachments = res
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


  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }
}
