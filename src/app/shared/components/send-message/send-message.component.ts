import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Filtration } from 'src/app/core/helpers/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { MessageService } from 'src/app/modules/messages/service/message.service';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { UserRolesService } from 'src/app/modules/user-roles/service/user-roles.service';
import { SharedService } from '../../services/shared/shared.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IndexesService } from 'src/app/modules/indexes/service/indexes.service';
import { IndexesEnum } from '../../enums/indexes/indexes.enum';
import { FileTypeEnum } from '../../enums/file/file.enum';
import { UserScope } from '../../enums/user/user.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CountriesService } from '../../services/countries/countries.service';
import { ParentService } from 'src/app/modules/parants/services/parent.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit, OnDestroy {
  get fileTypesEnum() { return FileTypeEnum;}
  onSubmit
  studentSchool;
  lang = inject(TranslationService).lang
  @Input() set schoolId(id: any) {
    this.studentSchool = id;
  }
  @Output() hiddenDialog = new EventEmitter();
  currentUserscope = this.userService.getScope();
  searchModel = {
    keyword: null,
    sortBy: null,
    page: 1,
    pageSize: 100,
    SortColumn: null,
    SortDirection: null,
    curricuulumId: null,
    StateId: null,
    SchoolId: null,
  };
  currentSchoolId;

  schoolIsSelectedList;
  schools = {
    totalAllData: 0,
    total: 0,
    list: [],
    loading: true,
  };

  filtration: Filter = { ...Filtration, curriculumId: null, StateId: null };
  selectSchoolModelOpened: boolean = false;
  MarkedListLength;
  autoCompleteForParent = [];
  imagesResult = [];
  messagesTypes = [];
  curricuulum = [];
  address = [];
  uploadedFiles: any[] = [];
  attachmentList = [];
  files: any = [];
  attachmentsName = [];
  speaEmpForm: FormGroup;
  parentForm: FormGroup;
  schoolEmpForm: FormGroup;
  isShown: boolean = false;
  isShown1: boolean = false;
  isShown2: boolean = false;
  schoolIdForEmp;
  constructor(
    private formbuilder: FormBuilder,
    private userRolesService: UserRolesService,
    private schoolsService: SchoolsService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private messageService: MessageService,
    private router: Router,
    private User: UserService,
    private index: IndexesService,
    private userService: UserService,
    private countriesService:CountriesService,
    private guardianService:ParentService
  ) {}

  ngOnInit(): void {
    this.currentSchoolId = this.User.getSchoolId();
    this.getCurr();
    this.getMessagesTypes();
    this.getAddress();
    this.speaEmpForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(32)]],
      switch1: [false, [Validators.required]],
      switch2: [false, [Validators.required]],
      switch3: [false, [Validators.required]],
      messageType: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
    });

    this.parentForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      messageType: ['', [Validators.required]],
    });

    this.schoolEmpForm = this.formbuilder.group({
      guardian: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(32)]],
      switch2: [false, [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      messageType: ['', [Validators.required]],
    });

    if (this.currentUserscope == UserScope.SPEA) this.getSchoolList();
    this.sharedService.openSelectSchoolsModel.subscribe((res) => {
      this.selectSchoolModelOpened = res;
    });
    this.userRolesService.schoolSelectedList.subscribe((res) => {
      this.schoolIsSelectedList = res;
    });
    this.userRolesService.MarkedListLength.subscribe((res) => {
      this.MarkedListLength = res;
    });
  }

  getSchoolList() {

    this.filtration.PageSize = this.schools.totalAllData;
    this.schoolsService.getAllSchoolsInPopUp(this.filtration).subscribe((res)=>{

      this.schools.list=res.data;

      });

  }

  openSelectSchoolsModel() {
    if(this.currentUserscope == UserScope.SPEA) this.getSchoolList()
    this.sharedService.openSelectSchoolsModel.next(true);
  }

  unSelectSchool(schoolId) {

    this.userRolesService.MarkedListLength.next(this.MarkedListLength-=1);
    let index =this.schoolIsSelectedList.findIndex(school => school.id==schoolId)
    this.schoolIsSelectedList.splice(index, 1)
    this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);
    this.toastr.success(this.translate.instant('mission Succeeded'))
  }

  getCurr() {
    this.sharedService.getAllCurriculum().subscribe((res) => {
      this.curricuulum = res.data;
    });
  }

  getAddress() {
    this.countriesService.getAllStates().subscribe((res) => {
      this.address = res.data;
    });
  }

  getMessagesTypes() {
    this.index
      .getIndext(IndexesEnum.TtypeOfCommunicationMessage)
      .subscribe((res) => {
        this.messagesTypes = res;
      });
  }

  search(event) {
    this.searchModel.keyword = event.query;
    this.searchModel.page = null;
    this.searchModel.pageSize = null;
    this.searchModel.SchoolId = this.currentSchoolId;
    this.guardianService.getGuardianDropdown(this.searchModel).subscribe((res) => {
      this.autoCompleteForParent = res.data;
    });
  }

  messageUpload(files) {
    this.imagesResult = files;
  }

  messageDeleted(event) {
    this.imagesResult = event;
  }

  isToggleLabel(e) {
    if (e.checked) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }
  isToggleLabel1(e) {
    if (e.checked) {
      this.isShown1 = true;
    } else {
      this.isShown1 = false;
    }
  }
  isToggleLabel2(e) {
    if (e.checked) {
      this.isShown2 = true;
    } else {
      this.isShown2 = false;
    }
  }



  sendMessage() {

    this.onSubmit = true
    if (this.currentUserscope == 'SPEA') this.sendMessageFromSpeaToSchool()
    if (this.currentUserscope == 'Guardian') this.sendMessageFromGuardianToSchool()
    if (this.currentUserscope == 'Employee') this.sendMessageFromEmployeeToGuardian()

  }


  sendMessageFromSpeaToSchool(){
    let schoolIds = [];
    this.schoolIsSelectedList.forEach((school) => {
      schoolIds.push(school.id);
    });

    const form = {
      senderId: Number(localStorage.getItem('$AJ$userId')),
      // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      messageTypeId: this.speaEmpForm.value.messageType,
      schoolIds: schoolIds,
      title: this.speaEmpForm.value.title,
      confirmationRecive: this.speaEmpForm.value.switch1,
      replyPossibility: this.speaEmpForm.value.switch2,
      showSenderName: this.speaEmpForm.value.switch3,
      messegeText: this.speaEmpForm.value.description,
      attachments:this.imagesResult
    };
    this.messageService.sendDataFromSpeaToEmp(form).subscribe(
      (res) => {
        this.toastr.success(this.translate.instant('toasterMessage.messageSend'))
        this.isShown = false;
        this.isShown1 = false;
        this.isShown2 = false;
        this.speaEmpForm.reset();
        this.router.navigate(['/messages/messages']);
        this.onSubmit = false
        this.hiddenDialog.emit(false);
      },
      (err) => {
        this.toastr.error(err);
        this.onSubmit = false
      }
    );
    this.sharedService.openSelectSchoolsModel.next(false);
  }

  sendMessageFromGuardianToSchool(){
    const form = {
      senderId: Number(localStorage.getItem('$AJ$userId')),
      // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      title: this.parentForm.value.title,
      messegeText: this.parentForm.value.description,
      messageTypeId: this.parentForm.value.messageType,
      // "schoolId": Number(localStorage.getItem('schoolId')),
      schoolId: this.studentSchool,
      attachments:this.imagesResult
    };

    this.messageService.sendDataFromGuardianToSchool(form).subscribe(
      (res) => {
        this.onSubmit = false
        this.router.navigate(['/messages/message-detail/' + res]);
        this.toastr.success(this.translate.instant('toasterMessage.messageSend'))
        this.hiddenDialog.emit();
      },
      (err) => {
        this.toastr.error(err);
        this.onSubmit = false
      }
    );
  }

  sendMessageFromEmployeeToGuardian(){

      const form = {
        senderId: Number(localStorage.getItem('$AJ$userId')),
        // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
        guardianIds: this.schoolEmpForm.value.guardian.map((res) => res.id),
        title: this.schoolEmpForm.value.title,
        replyPossibility: this.schoolEmpForm.value.switch2,
        messegeText: this.schoolEmpForm.value.description,
        messageTypeId: this.schoolEmpForm.value.messageType,
        attachments:this.imagesResult
      };
      this.messageService.sendDataFromEmpToGuardian(form).subscribe(
        (res) => {
          this.toastr.success(this.translate.instant('toasterMessage.messageSend'))
          this.isShown = false;
          this.isShown1 = false;
          this.isShown2 = false;
          this.schoolEmpForm.reset();
          this.onSubmit = false
          this.hiddenDialog.emit(false);
        },
        (err) => {
          this.toastr.error(err);
          this.onSubmit = false
        }
      );

  }


  ngOnDestroy(): void {
    this.sharedService.openSelectSchoolsModel.next(false);
    this.userRolesService.schoolSelectedList.next([]);
    this.userRolesService.MarkedListLength.next((this.MarkedListLength = 0));
    this.MarkedListLength = 0;
  }
}
