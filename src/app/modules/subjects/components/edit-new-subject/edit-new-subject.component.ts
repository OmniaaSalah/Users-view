import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AssessmentService } from 'src/app/modules/assessment/service/assessment.service';
import { SubjectService } from '../../service/subject.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { degreesMatchValidator } from './degrees-validators';
import { AssessmentsEnum } from 'src/app/shared/enums/subjects/assessment-type.enum';
import { LocationStrategy } from '@angular/common';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { DescriptionStatusEnum } from 'src/app/shared/enums/subjects/description-status.enum';

@Component({
  selector: 'app-new-subject',
  templateUrl: './edit-new-subject.component.html',
  styleUrls: ['./edit-new-subject.component.scss'],
})
export class EditNewSubjectComponent implements OnInit {
  get ClaimsEnum() {
    return ClaimsEnum;
  }
  isLabelShown: boolean = false;
  lang = inject(TranslationService).lang;
  subject;
  addedSubject;
  subjectList: ISubject[] = [];
  subjectAddedList: ISubject[] = [];
  successStatusList;
  isBtnLoading: boolean = false;
  exclamationIcon = faExclamationCircle;
  plusIcon = faPlus;
  subjectFormGrp: FormGroup;
  urlParameter: string = '';
  evaluationTypeList;
  evaluation: { id: 0; name: { ar: ''; en: '' } };
  showDegree: boolean = false;
  showIpPoints: boolean = false;
  showDescription: boolean = false;
  showEvaluation: boolean = false;
  oldAssesmentList;
  schoolId = 0;
  gradeId = 0;
  trackId = null;
  currentUserScope = inject(UserService).getScope();
  get userScope() {
    return UserScope;
  }

  isSpeaSubject =
    this.route.snapshot.queryParamMap.get('speaSubject') == 'false'
      ? false
      : true;

  constructor(
    private headerService: HeaderService,
    private location: LocationStrategy,
    private assessmentService: AssessmentService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private subjectServise: SubjectService,
    private translate: TranslateService
  ) {
    this.subjectFormGrp = fb.group(
      {
        subjectNameInArabic: [
          '',
          [Validators.required, Validators.maxLength(65)],
        ],
        subjectNameInEnglish: [
          '',
          [Validators.required, Validators.maxLength(65)],
        ],
        nameInResultsScreenInArabic: [
          '',
          [Validators.required, Validators.maxLength(65)],
        ],
        nameInResultsScreenInEnglish: [
          '',
          [Validators.required, Validators.maxLength(65)],
        ],
        minmumDegree: [null],
        maximumDegree: [null],
        subjectCode: [''],
        exemptableStatus: [''],
        oldEvaluation: [''],
        evaluationType: ['', [Validators.required]],
        descriptionArr: fb.array([]),
      },
      { validators: degreesMatchValidator }
    );
  }

  ngOnInit(): void {
    this.assessmentService.getRates().subscribe((res) => {
      this.oldAssesmentList = res.data;
    });
    this.subjectAddedList.push({} as ISubject);
    this.evaluationTypeList = this.subjectServise.evaluationTypeList;
    this.successStatusList = this.subjectServise.successStatus;
    this.route.paramMap.subscribe((param) => {
      this.schoolId = Number(param.get('schoolId'));
      this.urlParameter = param.get('subjectId');

      if (!this.urlParameter) {
        this.addFieldsinFormArray();
      }

      if (this.urlParameter)
        this.subjectServise
          .getSubjectByID(Number(this.urlParameter))
          .subscribe((res) => {
            this.subject = res;
            this.bindOldSubject(this.subject);
          });
    });

    if (!this.schoolId) {
      this.headerService.Header.next({
        breadCrump: [
          {
            label: this.translate.instant(
              'dashboard.Subjects.List Of Subjects'
            ),
            routerLink: '/educational-settings/subject/subjects-list',
            routerLinkActiveOptions: { exact: true },
          },
          {
            label:
              this.urlParameter == null || this.urlParameter == ''
                ? this.translate.instant('dashboard.Subjects.Add New Subject')
                : this.translate.instant('dashboard.Subjects.Edit Subject'),
            routerLink:
              this.urlParameter == null || this.urlParameter == ''
                ? '/educational-settings/subject/new-subject'
                : '/educational-settings/subject/edit-subject/' +
                  this.urlParameter,
          },
        ],
        mainTitle: {
          main:
            this.urlParameter == null || this.urlParameter == ''
              ? this.translate.instant('dashboard.Subjects.Add New Subject')
              : this.translate.instant('dashboard.Subjects.Edit Subject'),
        },
      });
    } else {
      this.headerService.Header.next({
        breadCrump: [
          {
            label:
              this.urlParameter == null || this.urlParameter == ''
                ? this.translate.instant('dashboard.Subjects.Add New Subject')
                : this.translate.instant('dashboard.Subjects.Edit Subject'),
            routerLink:
              this.urlParameter == null || this.urlParameter == ''
                ? `/school-management/school/${this.schoolId}/subjects/new-subject`
                : `/school-management/school/${this.schoolId}/subjects/edit-subject/${this.urlParameter}`,
          },
        ],
        mainTitle: {
          main:
            this.urlParameter == null || this.urlParameter == ''
              ? this.translate.instant('dashboard.Subjects.Add New Subject')
              : this.translate.instant('dashboard.Subjects.Edit Subject'),
        },
      });
    }
  }

  back() {
    this.location.back();
  }

  get subjectNameInArabic() {
    return this.subjectFormGrp.controls['subjectNameInArabic'] as FormControl;
  }

  get subjectNameInEnglish() {
    return this.subjectFormGrp.controls['subjectNameInEnglish'] as FormControl;
  }

  get nameInResultsScreenInArabic() {
    return this.subjectFormGrp.controls[
      'nameInResultsScreenInArabic'
    ] as FormControl;
  }

  get nameInResultsScreenInEnglish() {
    return this.subjectFormGrp.controls[
      'nameInResultsScreenInEnglish'
    ] as FormControl;
  }

  get minmumDegree() {
    return this.subjectFormGrp.controls['minmumDegree'] as FormControl;
  }
  get maximumDegree() {
    return this.subjectFormGrp.controls['maximumDegree'] as FormControl;
  }
  get SubjectCode() {
    return this.subjectFormGrp.controls['SubjectCode'] as FormControl;
  }

  get evaluationType() {
    return this.subjectFormGrp.controls['evaluationType'] as FormControl;
  }
  get oldEvaluation() {
    return this.subjectFormGrp.controls['oldEvaluation'] as FormControl;
  }
  get descriptionArr(): FormArray {
    return this.subjectFormGrp.controls['descriptionArr'] as FormArray;
  }
  get description() {
    return this.subjectFormGrp.controls['description'] as FormControl;
  }
  get meaning() {
    return this.subjectFormGrp.controls['meaning'] as FormControl;
  }
  get status() {
    return this.subjectFormGrp.controls['status'] as FormControl;
  }

  isToggleLabel(e) {
    if (e.checked) {
      if (this.urlParameter) {
        this.subject.isExemptableToLeave = true;
      } else {
        this.isLabelShown = true;
      }
    } else {
      if (this.urlParameter) {
        this.subject.isExemptableToLeave = false;
      } else {
        this.isLabelShown = false;
      }
    }
  }

  checkEvaluationType(e) {
    if (e == AssessmentsEnum.Evaluation) {
      this.showDegree = false;
      this.showIpPoints = false;
      this.showDescription = false;
      this.showEvaluation = true;

      this.oldEvaluation.setValidators([Validators.required]);

      this.clearDegreesField();

      this.clearDescriptionnField();
    } else if (e == AssessmentsEnum.Grades) {
      this.showIpPoints = false;
      this.showDescription = false;
      this.showEvaluation = false;
      this.showDegree = true;

      this.minmumDegree.setValidators([Validators.required, Validators.min(0)]);
      this.maximumDegree.setValidators([
        Validators.required,
        Validators.min(0),
      ]);

      this.clearDescriptionnField();

      this.clearEvaluationField();
    } else if (e == AssessmentsEnum.IPpoints) {
      this.showDescription = false;
      this.showDegree = false;
      this.showEvaluation = false;
      this.showIpPoints = true;

      this.minmumDegree.setValidators([Validators.required, Validators.min(0)]);
      this.maximumDegree.setValidators([
        Validators.required,
        Validators.min(0),
      ]);

      this.clearDescriptionnField();

      this.clearEvaluationField();
    } else if (e == AssessmentsEnum.Discription) {
      this.showEvaluation = false;
      this.showDegree = false;
      this.showIpPoints = false;
      this.showDescription = true;

      let descriptionArrGrp = this.descriptionArr.controls[0] as FormGroup;
      descriptionArrGrp.controls['meaning'].setValidators([
        Validators.required,
      ]);
      descriptionArrGrp.controls['description'].setValidators([
        Validators.required,
      ]);
      descriptionArrGrp.controls['status'].setValidators([Validators.required]);

      this.clearDegreesField();

      this.clearEvaluationField();
    } else {
    }
  }

  addNew() {
    var availableadd = 1;

    for (let i in this.descriptionArr.controls) {
      if (
        this.descriptionArr.controls[i].value.meaning == '' ||
        this.descriptionArr.controls[i].value.description == ''
      ) {
        availableadd = 0;
      }
    }
    if (availableadd == 1) {
      this.descriptionArr.push(
        this.fb.group({
          description: [''],
          meaning: [''],
          status: [DescriptionStatusEnum.Successful],
        })
      );
    }
    availableadd == 1;
  }

  succeeded() {
    this.addedSubject = {};
    this.addedSubject.isExemptableToLeave =
      this.subjectFormGrp.value.exemptableStatus != '' ? true : false;

    this.isBtnLoading = true;
    this.addedSubject = {
      id: Number(this.urlParameter),
      name: {
        ar: this.subjectFormGrp.value.subjectNameInArabic,
        en: this.subjectFormGrp.value.subjectNameInEnglish,
      },
      nameOnScoreScreen: {
        ar: this.subjectFormGrp.value.nameInResultsScreenInArabic,
        en: this.subjectFormGrp.value.nameInResultsScreenInEnglish,
      },
      evaluationSystem: this.subjectFormGrp.value.evaluationType,
      subjectCode: this.subjectFormGrp.value.subjectCode,
      isExemptableToLeave: this.addedSubject.isExemptableToLeave,
    };
    if (
      this.addedSubject.evaluationSystem == AssessmentsEnum.IPpoints ||
      this.addedSubject.evaluationSystem == AssessmentsEnum.Grades
    ) {
      this.addedSubject.maximumDegree = this.subjectFormGrp.value.maximumDegree;
      this.addedSubject.minimumDegree = this.subjectFormGrp.value.minmumDegree;
      this.addedSubject.subjectDescriptions = [];
      this.addedSubject.rateId = null;
    } else if (
      this.addedSubject.evaluationSystem == AssessmentsEnum.Evaluation
    ) {
      this.addedSubject.rateId = this.subjectFormGrp.value.oldEvaluation;
      this.addedSubject.maximumDegree = null;
      this.addedSubject.minimumDegree = null;
      this.addedSubject.subjectDescriptions = [];
    } else if (
      this.addedSubject.evaluationSystem == AssessmentsEnum.Discription
    ) {
      this.addedSubject.subjectDescriptions = [];
      this.subjectFormGrp.value.descriptionArr.forEach((element, i) => {
        if (element.meaning == '' && element.description == '') {
        } else {
          element.code = i;
          this.addedSubject.subjectDescriptions.push(element);
          console.log(element);
        }
      });

      this.addedSubject.rateId = null;
      this.addedSubject.maximumDegree = null;
      this.addedSubject.minimumDegree = null;
    }

    if (this.schoolId) {
      this.gradeId = Number(localStorage.getItem('gradeId'));
      if (localStorage.getItem('trackId'))  this.trackId = Number(localStorage.getItem('trackId'));

      if (!this.urlParameter) {
        this.subjectServise
          .addSubjectBySchool({
            schoolId: this.schoolId,
            // gradeId: this.gradeId,
            // trackId: this.trackId,
            gradeId: 0,
            trackId: 0,
            subject: this.addedSubject,
          })
          .subscribe(
            (res) => {
              this.isBtnLoading = false;
              if (res.statusCode != 'BadRequest') {
                this.toastService.success(this.translate.instant('dashboard.Subjects.Subject added Successfully'));
              } else {
                this.toastService.error(this.translate.instant('This subject is already exist'));
              }
              if (this.userScope.SPEA == this.currentUserScope) {
                this.router.navigate([`/schools-and-students/schools/school/${this.schoolId}`,]);
              } else if (this.userScope.Employee == this.currentUserScope) {
                this.router.navigate([`/school-management/school/${this.schoolId}/subjects`,]);
              }
              localStorage.removeItem('gradeId');
              if (localStorage.getItem('trackId')) {
                localStorage.removeItem('trackId');
              }
            },
            (err) => {
              this.isBtnLoading = false;
              this.toastService.error(this.translate.instant('dashboard.Subjects.error,please try again'));
            }
          );
      } else {
        this.subjectServise
          .editSubjectBySchool({
            schoolId: this.schoolId,
            // gradeId: this.gradeId,
            // trackId: this.trackId,
            gradeId: 0,
            trackId: 0,
            subject: this.addedSubject,
            speaSubject: this.isSpeaSubject,
          })
          .subscribe(
            (res) => {
              this.isBtnLoading = false;
              if (res.statusCode != 'BadRequest') {
                this.toastService.success(
                  this.translate.instant(
                    'dashboard.Subjects.Subject edited Successfully'
                  )
                );
              } else {
                this.toastService.error(this.translate.instant('This subject is already exist'));
              }
              if (this.userScope.SPEA == this.currentUserScope) {
                this.router.navigate([`/schools-and-students/schools/school/${this.schoolId}`,]);
              } else if (this.userScope.Employee == this.currentUserScope) {
                this.router.navigate([`/school-management/school/${this.schoolId}/subjects`,]);
              }
              localStorage.removeItem('gradeId');
              if (localStorage.getItem('trackId')) {
                localStorage.removeItem('trackId');
              }
            },
            (err) => {
              this.isBtnLoading = false;
              this.toastService.error(
                this.translate.instant('dashboard.Subjects.error,please try again'));
            }
          );
      }
    } else {
      if (this.urlParameter) {
        this.subjectServise.updateSubject(this.addedSubject).subscribe((res) => {
            this.isBtnLoading = false;
            if (res.statusCode != 'BadRequest') {
              this.toastService.success(this.translate.instant('dashboard.Subjects.Subject edited Successfully'));
              this.router.navigate(['/educational-settings/subject/subjects-list',]);
            } else {
              this.toastService.error(this.translate.instant('This subject is already exist'));
            }
          },
          (err) => {
            this.isBtnLoading = false;
            this.toastService.error(
              this.translate.instant('dashboard.Subjects.error,please try again'));
          }
        );
      } else {
        this.subjectServise.addSubject(this.addedSubject).subscribe(
          (res) => {
            this.isBtnLoading = false;
            if (res.statusCode != 'BadRequest') {
              this.toastService.success(this.translate.instant('dashboard.Subjects.Subject added Successfully'));
              this.router.navigate(['/educational-settings/subject/subjects-list',]);
            } else {
              this.toastService.error(
                this.translate.instant('This subject is already exist')
              );
            }
          },
          (err) => {
            this.isBtnLoading = false;
            this.toastService.error(
              this.translate.instant('dashboard.Subjects.error,please try again'));
          }
        );
      }
    }
  }
  bindOldSubject(subject) {
    if (this.urlParameter) {
      this.subjectFormGrp.patchValue({
        subjectNameInArabic: subject.name.ar,
        subjectNameInEnglish: subject.name.en,
        nameInResultsScreenInArabic: subject.nameOnScoreScreen.ar,
        nameInResultsScreenInEnglish: subject.nameOnScoreScreen.en,
        evaluationType: subject.evaluationSystem,
        exemptableStatus: subject.isExemptableToLeave,
        subjectCode: subject.subjectCode,
        maximumDegree: subject.maximumDegree,
        minmumDegree: subject.minimumDegree,
        oldEvaluation: subject.rateId,
      });

      if (subject.subjectDescriptions.length) {
        subject.subjectDescriptions.forEach((element) => {
          this.descriptionArr.push(
            this.fb.group({
              description: [element.description],
              meaning: [element.meaning],
              status: [element.status],
            })
          );
        });
      } else if (!subject.subjectDescriptions.length) {
        this.addFieldsinFormArray();
      }

      this.checkEvaluationType(subject.evaluationSystem);
    }
  }
  addFieldsinFormArray() {
    this.descriptionArr.push(
      this.fb.group({
        description: [''],
        meaning: [''],
        status: [DescriptionStatusEnum.Successful],
      })
    );
  }

  clearDescriptionnField() {
    for (let i in this.descriptionArr.controls) {
      let descriptionArrGrp = this.descriptionArr.controls[i] as FormGroup;
      descriptionArrGrp.controls['meaning'].clearValidators();
      descriptionArrGrp.controls['description'].clearValidators();
      descriptionArrGrp.controls['status'].clearValidators();
      descriptionArrGrp.controls['meaning'].updateValueAndValidity();
      descriptionArrGrp.controls['description'].updateValueAndValidity();
      descriptionArrGrp.controls['status'].updateValueAndValidity();
    }
  }
  clearDegreesField() {
    this.minmumDegree.clearValidators();
    this.minmumDegree.updateValueAndValidity();
    this.maximumDegree.clearValidators();
    this.maximumDegree.updateValueAndValidity();
  }

  clearEvaluationField() {
    this.oldEvaluation.clearValidators();
    this.oldEvaluation.updateValueAndValidity();
  }
}
