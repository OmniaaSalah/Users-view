import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IssuanceCertificaeService } from 'src/app/modules/issuance-of-a-certificate-pages/services/issuance-certificae.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { StudentsService } from '../../services/students/students.service';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { RegisterChildService } from 'src/app/modules/shared/services/register-child/register-child.service';
import { map, of, switchMap } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-manual-certificates',
  templateUrl: './manual-certificates.component.html',
  styleUrls: ['./manual-certificates.component.scss'],
})
export class ManualCertificatesComponent implements OnInit {
  lang = inject(TranslationService).lang;
  onSubmit: boolean = false;

  get certificateTypeEnum() {
    return CertificatesEnum;
  }
  currentUserScope = inject(UserService).getScope();
  get userScope() {
    return UserScope;
  }

  parentId = this.route.snapshot.paramMap.get('parentId'); // will be exist incase the page visited through parent children list
  studentGUID =
    this.route.snapshot.paramMap.get('id') ||
    this.route.snapshot.paramMap.get('childId');
  studentId;

  componentHeaderData: IHeader = {
    breadCrump: [],
    mainTitle: {
      main: this.translate.instant(
        'dashboard.students.Issuance of certificate'
      ),
    },
  };

  certificateFormGrp: FormGroup;

  certificatesList$ = this.certificateService.getCetificatesTypes();
  selectedCertificate;
  studentData: Student;

  semesters = [
    {
      name: this.translate.instant('shared.firstSemester'),
      value: SemesterEnum.FirstSemester,
    },
    {
      name: this.translate.instant('shared.lastSemester'),
      value: SemesterEnum.LastSemester,
    },
    {
      name: this.translate.instant('shared.finalResult'),
      value: SemesterEnum.FinalResult,
    },
  ];

  constructor(
    private location: Location,
    private translate: TranslateService,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private headerService: HeaderService,
    private registerChildService: RegisterChildService,
    private certificateService: IssuanceCertificaeService
  ) {
    this.certificateFormGrp = fb.group({
      certificateName: ['', [Validators.required]],
      academicCertificates: this.fb.array([]),
      gradeCertificateType: ['AllSubjects'],
      semester: [],
      yearId: [''],
    });
  }

  get certificateName() {
    return this.certificateFormGrp?.get('certificateName');
  }

  get gradeCertificateType() {
    return this.certificateFormGrp?.get('gradeCertificateType');
  }

  get yearId() {
    return this.certificateFormGrp?.get('yearId');
  }

  get academicCertificates(): FormArray {
    return this.certificateFormGrp?.get('academicCertificates') as FormArray;
  }

  ngOnInit(): void {
    this.registerChildService.Student$.pipe(
      switchMap((res) => {
        if (!res)
          return this.studentsService
            .getStudent(this.studentGUID)
            .pipe(map((res) => res?.result));
        return of(res);
      })
    ).subscribe((res: Student) => {
      this.studentData = res;
      this.studentId = res?.id;
      this.componentHeaderData.mainTitle.sub = `(${res.name[this.lang]})`;
    });

    this.checkDashboardHeader();
  }

  submitOtherCertifiates() {
    this.onSubmit = true;
    let data = {
      studentIds: [this.studentId],
      certificateType: this.selectedCertificate.value,
      destination: '',
    };
    this.certificateService.submitOtherCertifiatesBySpea(data).subscribe(
      (result) => {
        this.onSubmit = false;
        if (result.statusCode != 'BadRequest') {
          this.toastr.success(
            this.translate.instant(
              'dashboard.issue of certificate.success message'
            )
          );
        } else {
          if (result?.errorLocalized) {
            this.toastr.error(result?.errorLocalized[this.lang]);
          } else {
            this.toastr.error(this.translate.instant('toasterMessage.error'));
          }
        }
        this.location.back();
      },
      (err) => {
        this.onSubmit = false;
        this.toastr.error(this.translate.instant('toasterMessage.error'));
      }
    );
  }

  goBack() {
    this.location.back();
  }

  checkDashboardHeader() {
    // this.componentHeaderData.breadCrump = [
    //   {
    //     label: this.translate.instant('dashboard.students.studentsList'),
    //     routerLink: '/schools-and-students/students/',
    //     routerLinkActiveOptions: { exact: true },
    //   },
    //   {
    //     label: this.translate.instant(
    //       'dashboard.students.Issuing the certificate manually'
    //     ),
    //     routerLink: `/schools-and-students/students/student/${this.studentId}/IssuanceOfACertificateComponent`,
    //   },
    // ];


    if (this.currentUserScope == UserScope.Employee) {

      this.componentHeaderData.breadCrump = [
        {
          label: this.translate.instant('dashboard.parents.parents'),
          routerLink: '/student-management/all-parents/',
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: this.translate.instant('dashboard.parents.childrenList'),
          routerLink: `/student-management/all-parents/parent/${this.parentId}/all-children`,
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: this.translate.instant('dashboard.parents.sonDetails'),
          routerLink: `/student-management/all-parents/parent/${this.parentId}/child/${this.studentId}`,
        },
      ];

    } else if (this.currentUserScope == UserScope.SPEA) {

      console.log(`/schools-and-students/all-parents/parent/${this.parentId}/child/${this.studentGUID}/IssuanceOfACertificateComponent`);

      if(this.router.url.includes('all-parents')){
        this.componentHeaderData.breadCrump = [
          {
            label: this.translate.instant('dashboard.parents.parents'),
            routerLink: '/schools-and-students/all-parents/',
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: this.translate.instant('dashboard.parents.childrenList'),
            routerLink: `/schools-and-students/all-parents/parent/${this.parentId}/all-children`,
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: this.translate.instant('dashboard.parents.sonDetails'),
            routerLink: `/schools-and-students/all-parents/parent/${this.parentId}/child/${this.studentGUID}`,
            queryParams:{registered:true},
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: this.translate.instant(
              'dashboard.students.Issuing the certificate manually'
            ),
            routerLink: `/schools-and-students/all-parents/parent/${this.parentId}/child/${this.studentGUID}/IssuanceOfACertificateComponent`,
          },
        ];
      }else{
        this.componentHeaderData.breadCrump = [
          { label: this.translate.instant('Students List') ,routerLink:'/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},


          {
            label: this.translate.instant('dashboard.students.StudentInfo'),
            routerLink: '/schools-and-students/students/student/' + this.studentGUID,
            routerLinkActiveOptions:{exact: true}
          },
          {
            label: this.translate.instant(
              'dashboard.students.Issuing the certificate manually'
            ),
            routerLink: `/schools-and-students/students/student/${this.studentGUID}/IssuanceOfACertificateComponent`,
          },
        ];
      }
    }

    this.headerService.changeHeaderdata(this.componentHeaderData);
  }
}
