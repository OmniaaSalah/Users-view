import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-holiday-model',
  templateUrl: './holiday-model.component.html',
  styleUrls: ['./holiday-model.component.scss'],
})
export class HolidayModelComponent implements OnInit {
  exclamationIcon = faExclamationCircle;
  lang = inject(TranslationService).lang;
  isOpened: boolean = false;
  avaliableChangeStatus = true;
  get statusEnum() {
    return StatusEnum;
  }
  @Input('title') title: string;
  @Output() onSave = new EventEmitter();
  holiday;
  editedStatus;
  editedHoliday;
  holidayStatusList;
  schoolsList;
  curriculamList
  schoolsListEdited;
  annualCalendarName;
  year;
  holidayFormGrp: FormGroup;
  subscription: Subscription;

  constructor(
    private translate: TranslateService,
    private toastService: ToastService,
    private sharedService: SharedService,
    private annualHolidayService: AnnualHolidayService,
    private fb: FormBuilder,
    private holidayService: AnnualHolidayService
  ) {
    this.holidayFormGrp = fb.group({
      arabicName: ['', [Validators.required, Validators.maxLength(256)]],
      englishName: ['', [Validators.required, Validators.maxLength(256)]],
      flexibilityStatus: [],
      schools: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.sharedService
      .getSchoolsDropdown()
      .subscribe((res) => {
        this.schoolsList = res
        this.setEditedHoliday()
      });

    this.annualHolidayService.annualCalendarName.subscribe((res) => {
      this.annualCalendarName = res;
    });
    this.annualHolidayService.year.subscribe((res) => {
      this.year = res;
    });
    this.sharedService.getAllCurriculum().subscribe((res) => {
      this.curriculamList = res;
    });
    this.holidayService.openModel.subscribe((res) => {
      this.isOpened = res;
    });
    this.holidayStatusList = this.annualHolidayService.holidayStatusList;

  }

  setEditedHoliday(){
    this.annualHolidayService.editedHoliday.subscribe((res) => {
      this.editedHoliday = res;
      if (this.editedHoliday) {
        this.bind(this.editedHoliday);
      }
    });
  }

  get annualHolidayFormGrpControl() {
    return this.holidayFormGrp.controls;
  }

  get arabicName() {
    return this.holidayFormGrp.controls['arabicName'] as FormControl;
  }
  get englishName() {
    return this.holidayFormGrp.controls['englishName'] as FormControl;
  }

  get flexibilityStatus() {
    return this.holidayFormGrp.controls['flexibilityStatus'] as FormControl;
  }
  get schools() {
    return this.holidayFormGrp.controls['schools'] as FormControl;
  }

  get dateFrom() {
    return this.holidayFormGrp.controls['dateFrom'] as FormControl;
  }
  get dateTo() {
    return this.holidayFormGrp.controls['dateTo'] as FormControl;
  }

  saveMe() {
    if (this.editedHoliday) {
      this.editedHoliday = {
        id: this.editedHoliday?.id,
        index: this.editedHoliday?.index ? this.editedHoliday?.index : 0,
        name: {
          ar: this.holidayFormGrp.value.arabicName,
          en: this.holidayFormGrp.value.englishName,
        },
        dateFrom: this.holidayFormGrp.value.dateFrom,
        dateTo: this.holidayFormGrp.value.dateTo,
        flexibilityStatus: this.holidayFormGrp.value.flexibilityStatus
          ? this.holidayStatusList[0]
          : this.holidayStatusList[1],
        schools: this.holidayFormGrp.value.schools,
        createdDate: new Date(),
      };
      this.annualHolidayService.holiday.next(this.editedHoliday);
    } else {
      this.holiday = {};
      this.holiday.curriculums = [];
      this.holiday = {
        name: {
          ar: this.holidayFormGrp.value.arabicName,
          en: this.holidayFormGrp.value.englishName,
        },
        dateFrom: this.holidayFormGrp.value.dateFrom,
        dateTo: this.holidayFormGrp.value.dateTo,
        flexibilityStatus: this.holidayFormGrp.value.flexibilityStatus
          ? this.holidayStatusList[0]
          : this.holidayStatusList[1],
        schools: this.holidayFormGrp.value.schools,
        createdDate: new Date(),
      };

      //  this.convertDate(this.holiday);

      this.annualHolidayService.holiday.next(this.holiday);
    }

    this.holidayService.openModel.next(false);
    this.clearForm();

    this.onSave.emit();
  }
  convertDate(holiday) {
    // this.holiday.dateFrom=holiday.dateFrom.getDate()+"/"+(holiday.dateFrom.getMonth()+1);
    // this.holiday.dateTo=holiday.dateTo.getDate()+"/"+(holiday.dateTo.getMonth()+1);
  }
  clearForm() {
    this.annualHolidayService.editedHoliday.next(null);
    this.holidayFormGrp.reset();
    Object.keys(this.holidayFormGrp.controls).forEach((key) => {
      const control = this.holidayFormGrp.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
    });
    this.annualHolidayService.annualCalendarName.next('');
    this.annualHolidayService.year.next('');
  }
  bind(holiday) {
    this.schoolsListEdited = [];

    this.editedStatus =
      holiday.flexibilityStatus.value == StatusEnum.Flexible ? true : false;
    this.schoolsList?.forEach((school) => {
      holiday?.schools?.forEach((selectedShcool) => {
        if (selectedShcool.id == school.id) {
          this.schoolsListEdited.push(school);
        }
      });
    });
    this.holidayFormGrp.patchValue({
      arabicName: holiday.name.ar,
      englishName: holiday.name.en,
      flexibilityStatus: this.editedStatus,
      schools: this.schoolsListEdited,
      dateFrom: new Date(holiday.dateFrom),
      dateTo: new Date(holiday.dateTo),
    });
  }
  curriculumSelected(curriculums) {
    this.sharedService
      .getSchoolsDropdown({
        curriculumId: curriculums?.map((item) => item?.id),
      })
      .subscribe((res) => (this.schoolsList = res));

    this.flexibilityStatus.enable();
    this.avaliableChangeStatus = true;
    // curriculums?.forEach((element) => {
    //   if (element.code == 'U.A.E') {
    //     this.holidayFormGrp.patchValue({ flexibilityStatus: false });
    //     this.flexibilityStatus.disable();
    //     this.avaliableChangeStatus = false;
    //   }
    // });
  }

  checkStatus(event) {
    if (!this.avaliableChangeStatus) {
      this.toastService.error(
        this.translate.instant(
          'AnnualHoliday.you can change status in case not select Ministry Curriculum'
        )
      );
    }
  }

  checkTimeDifference() {
    if (
      this.dateFrom.value &&
      this.dateTo.value &&
      Math.ceil(
        Math.abs(this.dateFrom.value - this.dateTo.value) /
          (1000 * 60 * 60 * 24)
      ) > 42
    ) {
      this.toastService.error(
        this.translate.instant('AnnualHoliday.YouCan’tAddHolidayMoreThan6Weeks')
      );
      this.dateTo.setValue('');
    }
  }
}
