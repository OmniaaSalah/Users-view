import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { UserService } from 'src/app/core/services/user/user.service';
import { AttachmentIndexCode } from 'src/app/shared/enums/file/file.enum';
import { map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-certificate',
  templateUrl: './board-certificate.component.html',
  styleUrls: ['./board-certificate.component.scss'],
})
export class BoardCertificateComponent implements OnInit {
  @Input() choosenStudents;
  @Input() activateSpeaView = false;

  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onBack: EventEmitter<string> = new EventEmitter();

  getCurrentGuardianId = this.userService.getCurrentGuardian()?.id

  selected = false;

  boardReasons$ = this.indexService.getIndext(
    IndexesEnum.ReasonsForIssuingBoardCertificate
  );

  isBtnLoading;
  saveBtn: boolean = false;
  attachmentsNumbers = 0;

  lang = inject(TranslationService).lang;
  studentId = +this.route.snapshot.paramMap.get('studentId');

  boardCertificateData = [];

  boardForm = this.fb.group({
    studentBoardCertificateDtos:this.fb.array([])
  })
  get studentsCtr() { return this.boardForm.controls.studentBoardCertificateDtos as FormArray}

  reasonArr = [];
  showError

  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private certificatesService: IssuanceCertificaeService,
    private route: ActivatedRoute,
    private indexService: IndexesService,
    private studentService: StudentsService,
    private userService:UserService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.boardCertificateData = this.choosenStudents.map((element) => {
      return {
        studentId: element.id,
        certificatedType: CertificatesEnum.BoardCertificate,
        reasonId: '',
        attachments: [],
      };
    });

    this.getAttachments();
  }


  fillStudentFormArr(students){
    students.forEach(student=>{
      this.studentsCtr.push(
        this.fb.group({
          studentId: student.id,
          certificatedType: CertificatesEnum.BoardCertificate,
          reasonId: '',
          attachments: []
      })
      )
    })
  }


  sendBoardCertificateReq() {
    this.isBtnLoading = true;
    var data = { studentBoardCertificateDtos: this.boardCertificateData };

    this.certificatesService.postBoardCertificate(data, this.activateSpeaView).subscribe(
      (result) => {
        this.isBtnLoading = false;
        if (result.statusCode != 'BadRequest') {
          this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
          this.onCancel.emit();
          if(this.activateSpeaView) this.location.back()

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
        this.isBtnLoading = false;
        this.toastr.error(this.translate.instant('toasterMessage.error'));
      }
    );
  }

  onReasonChange(reason, i) {
    this.boardCertificateData[i].reasonId = reason;

    this.reasonArr.push(reason);

    if (this.choosenStudents.length == this.reasonArr.length)
      this.saveBtn = true;
  }

  isBoardFileSelected(){
    return this.boardCertificateData.filter(el=> el.attachments.length).length == this.choosenStudents?.length
  }

  // onAttachmentSelected(attachment, index) {
  //   let urlParts =attachment.url?.split(".")
  //   let isImage = ['jpge','jpg','png'].includes(urlParts[urlParts.length-1]?.toLowerCase())


  //   if(!isImage){
  //     this.showError =true;
  //     return
  //   }else this.showError =false;

  //   let i = this.boardCertificateData[index].attachments.indexOf(attachment.id);
  //   if (i >= 0) {
  //     this.boardCertificateData[index].attachments.splice(i, 1);

  //   } else {
  //     this.choosenStudents[index].attachments = this.choosenStudents[index].attachments.map(el=> {
  //       if(el.id != attachment.id) return {...el, isSelected:false}
  //       else return {...el, isSelected:true}
  //     })
  //     this.boardCertificateData[index].attachments=[]
  //     this.boardCertificateData[index].attachments.push(attachment.id);
  //   }
  // }

  // getAttachments() {
  //   this.choosenStudents.forEach((student) => {
  //     this.studentService
  //       .getStudentAttachment(student.id)
  //       .subscribe((attachments) => {
  //         student.attachments = attachments.filter(el=> el?.url).map((attach) => ({
  //           ...attach,
  //           isSelected: false,
  //         }));
  //       });
  //   });
  // }

  getAttachments() {
    this.choosenStudents.forEach((student, index) => {

      this.studentService
        .getStudentAttachment(student.studentGuid)
        .pipe(
          map(list=>{
            list[0] = {...list[0], indexCode:AttachmentIndexCode.BoaredCertificate }
            return list.filter(el => el.indexCode==AttachmentIndexCode.BoaredCertificate)
          })
        )
        .subscribe((attachments) => {

          this.boardCertificateData[index].attachments.push( attachments?.files?.length && attachments?.files[0]?.id )

          student.attachments = attachments
        });

    });
  }



}
