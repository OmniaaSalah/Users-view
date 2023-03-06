import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IndexesService } from 'src/app/modules/dashboard/modules/indexes/service/indexes.service';
import { StudentsService } from 'src/app/modules/dashboard/modules/students/services/students/students.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-board-certificate',
  templateUrl: './board-certificate.component.html',
  styleUrls: ['./board-certificate.component.scss'],
})
export class BoardCertificateComponent implements OnInit {
  @Input() choosenStudents;
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onBack: EventEmitter<string> = new EventEmitter();

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

  reasonArr = [];

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private certificatesService: IssuanceCertificaeService,
    private route: ActivatedRoute,
    private indexService: IndexesService,
    private studentService: StudentsService
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

  sendBoardCertificateReq() {
    this.isBtnLoading = true;
    var data = { studentBoardCertificateDtos: this.boardCertificateData };

    this.certificatesService.postBoardCertificate(data).subscribe(
      (result) => {
        this.isBtnLoading = false;
        if (result.statusCode != 'BadRequest') {
          this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
          this.onCancel.emit();

        } else {

          if (result?.errorLocalized) {
            this.toastr.error(result?.errorLocalized[this.lang]);
          } else {
            this.toastr.error(this.translate.instant('error happened'));
          }
          this.onBack.emit();
        }
      },
      (err) => {
        this.isBtnLoading = false;
        this.toastr.error(this.translate.instant('error happened'));
      }
    );
  }

  onReasonChange(reason, i) {
    this.boardCertificateData[i].reasonId = reason;

    this.reasonArr.push(reason);

    if (this.choosenStudents.length == this.reasonArr.length)
      this.saveBtn = true;
  }

  onAttachmentSelected(attachmentId, index) {
    let i = this.boardCertificateData[index].attachments.indexOf(attachmentId);
    if (i >= 0) {
      this.boardCertificateData[index].attachments.splice(i, 1);
    } else {
      // this.choosenStudents[index].attachments = this.choosenStudents[index].attachments.map(el=> ({...el, isSelected:false}))
      this.boardCertificateData[index].attachments=[]
      this.boardCertificateData[index].attachments.push(attachmentId);
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
