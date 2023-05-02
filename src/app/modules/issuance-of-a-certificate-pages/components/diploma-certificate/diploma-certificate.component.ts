import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IndexesService } from 'src/app/modules/indexes/service/indexes.service';
import { StudentsService } from 'src/app/modules/students/services/students/students.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-diploma-certificate',
  templateUrl: './diploma-certificate.component.html',
  styleUrls: ['./diploma-certificate.component.scss']
})
export class DiplomaCertificateComponent implements OnInit {

  @Input() choosenStudents;
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onBack: EventEmitter<string> = new EventEmitter();


  onSubmit;
  attachmentsNumbers = 0;

  lang = inject(TranslationService).lang;
  studentId = +this.route.snapshot.paramMap.get('studentId');

  diplomaCertificateForm = [];

  get isFormValid(){
    return this.diplomaCertificateForm.every(el => el.attachments.length)
  }

  showError

  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private certificatesService: IssuanceCertificaeService,
    private route: ActivatedRoute,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.diplomaCertificateForm = this.choosenStudents.map((element) => {
      return {
        studentId: element.id,
        // certificatedType: CertificatesEnum.DiplomaCertificate,
        attachments: [],
      };
    });


    this.getAttachments();
  }






  sendDiplomaCertificateReq() {
    this.onSubmit = true;

    this.certificatesService.sendDiplomaCertificateReq(this.diplomaCertificateForm).subscribe(
      (result) => {
        this.onSubmit = false;
        if (result.statusCode != 'BadRequest') {
          this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
          this.onCancel.emit();

        } else {

          if (result?.errorLocalized) {
            this.toastr.error(result?.errorLocalized[this.lang]);
          } else {
            this.toastr.error(this.translate.instant('toasterMessage.error'));
          }
          this.onBack.emit();
        }
      },
      (err) => {
        this.onSubmit = false;
        this.toastr.error(this.translate.instant('toasterMessage.error'));
      }
    );
  }




  onAttachmentSelected(attachment, index) {
    let urlParts =attachment.url?.split(".")
    let isImage = ['jpge','jpg','png'].includes(urlParts[urlParts.length-1]?.toLowerCase())


    if(!isImage){
      this.showError =true;
      return
    }else this.showError =false;

    let i = this.diplomaCertificateForm[index].attachments.indexOf(attachment.id);

    if (i >= 0) {
      this.diplomaCertificateForm[index].attachments.splice(i, 1);

    } else {
      this.choosenStudents[index].attachments = this.choosenStudents[index].attachments.map(el=> {
        if(el.id != attachment.id) return {...el, isSelected:false}
        else return {...el, isSelected:true}
      })
      this.diplomaCertificateForm[index].attachments=[]
      this.diplomaCertificateForm[index].attachments.push(attachment.id);
    }
  }



  getAttachments() {
    this.choosenStudents.forEach((student) => {

      this.studentService
        .getStudentAttachment(student.id)
        .subscribe((attachments) => {
          student.attachments = attachments.map((attach) => ({
            ...attach,
            isSelected: false,
          }));
        });

    });
  }



}
