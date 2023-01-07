import { MessagesMainComponent } from './../../../modules/dashboard/modules/messages/components/messages-main/messages-main.component';
import { Component, OnInit,Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { MessageService } from 'src/app/modules/dashboard/modules/messages/service/message.service';
import { SchoolsService } from 'src/app/modules/dashboard/modules/schools/services/schools/schools.service';
import { UserRolesService } from 'src/app/modules/dashboard/modules/user-roles/service/user-roles.service';
import { SharedService } from '../../services/shared/shared.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IndexesService } from 'src/app/modules/dashboard/modules/indexes/service/indexes.service';
import { IndexesEnum } from '../../enums/indexes/indexes.enum';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  studentSchool
  // @ViewChild("messagesMain") messageMain: MessagesMainComponent;
  @Input() set schoolId(id:any){
   this.studentSchool = id
  }
  @Output() hiddenDialog  = new EventEmitter();
  scope=JSON.parse(localStorage.getItem('$AJ$user')).scope
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 100,
    "SortColumn": null,
    "SortDirection": null,
    "curricuulumId": null,
    "StateId": null,
    "SchoolId":null
  }
  currentSchoolId
  
  schoolIsSelectedList;
 schools={
  totalAllData:0,
  total:0,
   list:[],
   loading:true
   }
  
  filtration :Filter = {...Filtration,curriculumId:'',StateId: ''};
  selectSchoolModelOpened:boolean=false;
  MarkedListLength;
  autoCompleteForParent = []
  imagesResult =[]
  messagesTypes = []
  curricuulum = []
  address = []
  uploadedFiles: any[] = [];
  attachmentList = [];
  files: any = [];
  attachmentsName=[]
  speaEmpForm: FormGroup;
  parentForm: FormGroup;
  schoolEmpForm: FormGroup
  isShown:boolean=false;
  isShown1:boolean=false;
  isShown2:boolean=false;
   schoolIdForEmp ;
  constructor(
    private formbuilder:FormBuilder,
    private userRolesService:UserRolesService,
    private schoolsService:SchoolsService,
    private sharedService:SharedService,
    private toastr:ToastrService,
    private translate: TranslateService,
    private messageService: MessageService,
    private router:Router,
    private User:UserService,
    private index:IndexesService) { }

  ngOnInit(): void {
    this.currentSchoolId=this.User.getCurrentSchoollId();
    
    // this.messageService.getSchoolIdFromEmp().subscribe(res=>{
    //   this.schoolIdForEmp = res.result.schoolId
    // })
    this.getCurr()
    this.getMessagesTypes()
    this.getAddress()
    this.speaEmpForm = this.formbuilder.group({
      title: ['', [Validators.required,Validators.maxLength(32)]],
      switch1: [false, [Validators.required]],
      switch2: [false, [Validators.required]],
      switch3: [false, [Validators.required]],
      messageType: ['', [Validators.required]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
    });

    this.parentForm = this.formbuilder.group({
      title: ['', [Validators.required,Validators.maxLength(32)]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
      messageType: ['', [Validators.required]],
    });


    this.schoolEmpForm = this.formbuilder.group({
      guardian: ['', [Validators.required]],
      title: ['', [Validators.required,Validators.maxLength(32)]],
      switch2: [false, [Validators.required]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
      messageType: ['', [Validators.required]],
    });  

    this.getIsSelectedSchoolList()
    this.sharedService.openSelectSchoolsModel.subscribe((res)=>{this.selectSchoolModelOpened=res;})
    this.userRolesService.schoolSelectedList.subscribe((res)=>{

      this.schoolIsSelectedList=res;
    });
  this.userRolesService.MarkedListLength.subscribe((res)=>{this.MarkedListLength=res});
  }


  getIsSelectedSchoolList()
  {
    this.schoolIsSelectedList=[];
    this.filtration.Page=null;
    this.filtration.PageSize=this.schools.totalAllData;
    this.schoolsService.getAllSchools(this.filtration).subscribe((res)=>{
    this.schoolIsSelectedList=res.data.map(school=>{return {
     'id':school.id,
     'name':{'ar':school.name?.ar,'en':school.name?.en},
     'state':{'ar':school.state?.ar,'en':school.state?.en},
     'curriculum':{'ar':school.curriculum?.ar,'en':school.curriculum?.en},
     'isSelected':false
      }});
      this.schools.list=res.data;
        this.schools.list.forEach(school => {
            school.isSelected=false;
        });
      //  console.log("hello")
       this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList)
      });
  }

  openSelectSchoolsModel()
  {
    this.sharedService.openSelectSchoolsModel.next(true);
  }

  unSelectMe(id)
  {
    this.schoolIsSelectedList.forEach(school => {
      if(school.id==id)
      {
        school.isSelected=false;
        this.userRolesService.MarkedListLength.next(this.MarkedListLength-=1);
      }
    });
    this.schools.list.forEach(element => {
      if(element.id==id)
      {
        element.isSelected=false;
      }
    });
    this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);
  }
  
  // getSchools(event){
  //   console.log(event);
  //   if(this.speaEmpForm.value.curricuulumId && this.speaEmpForm.value.StateId){
  //     this.searchModel.curricuulumId=event.value
  //     this.searchModel.StateId=event.value
  //     this.searchModel.page = null
  //     this.searchModel.pageSize = null
  //     this.messageService.getApiSchool(this.searchModel).subscribe(res=>{
  //     this.schools = res.data
  //   })
  //   }
  // }

  getCurr(){
    this.messageService.getcurr().subscribe(res=>{
      this.curricuulum = res.data
      // console.log(this.curricuulum);
      
    })
  }

  getAddress(){
    this.messageService.getadd().subscribe(res=>{
      this.address = res.data
    })
  }

  getMessagesTypes(){
    this.index.getIndext(IndexesEnum.TtypeOfCommunicationMessage).subscribe(res=>{
      this.messagesTypes = res
    })
  }

  

  search(event) {
    this.searchModel.keyword = event.query
    this.searchModel.page = null
    this.searchModel.pageSize = null
    this.searchModel.SchoolId = this.currentSchoolId
    this.messageService.getGuardian(this.searchModel).subscribe(res=>{
         this.autoCompleteForParent=  res.data
   })
    
 }

 messageUpload(files){
  this.imagesResult = files
  // console.log(this.imagesResult);
  
 }

  messageDeleted(event){
    this.imagesResult = event
    // console.log(event);
  // console.log(this.imagesResult);
    
 }

  // onUpload(event) {

  //   for(let file of event.files) {
  
  //       this.uploadedFiles.push(file);
  
  //   }
  
  //   }
  //   onFileUpload(data: {files: Array<File>}): void {
  
  //     const requests = [];
  
  //     data.files.forEach(file => {
  
  //       const formData = new FormData();
  
  //       formData.append('file', file, file.name);
  
  //       requests.push(this.messageService.onFileUpload(formData));
  
  //     });
  
  //     forkJoin(requests).subscribe((res: Array<{url: string}>) => {
  //       console.log(res);
        
  //       if (res && res.length > 0) {
  
  //         res.forEach(item => {
  //           console.log(item);
            
  //           const extension = item.url.split('.').pop();
  //           console.log(extension);
            
  
  //             console.log(item.url);
              
  //               this.imagesResult.push(item.url)
  //             console.log(this.imagesResult);
  //         });
  
  //       }
  
  //     });
  
  //   }
    isToggleLabel(e)
    {
      if(e.checked)
      {
          this.isShown=true;
      }
      else{
          this.isShown=false;
      }
    }
    isToggleLabel1(e)
    {
      if(e.checked)
      {
          this.isShown1=true;
  
      }
      else{
          this.isShown1=false;
      }
    }
    isToggleLabel2(e)
    {
      if(e.checked)
      {
          this.isShown2=true;
  
      }
      else{
          this.isShown2=false;
      }
    }
      sendMessage(){    
        this.hiddenDialog.emit(false)
        let schoolIds = []
        if(this.scope == "SPEA"){
          this.schoolIsSelectedList.forEach(school=>{
            if(school.isSelected == true) schoolIds.push(school.id)
            
          })          
          
        const form = {
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
          "messageTypeId": this.speaEmpForm.value.messageType,
          "schoolId": schoolIds, 
          "title": this.speaEmpForm.value.title,
          "confirmationRecive": this.speaEmpForm.value.switch1,
          "replyPossibility": this.speaEmpForm.value.switch2,
          "showSenderName": this.speaEmpForm.value.switch3,
          "messegeText": this.speaEmpForm.value.description,
          'attachments':this.imagesResult.map(attachment=>{
            return attachment.url
          }) || null
        }    
        this.messageService.sendDataFromSpeaToEmp(form).subscribe(res=>{
          this.toastr.success('تم الارسال بنجاح')
          this.isShown=false;
          this.isShown1=false;
          this.isShown2=false;
          this.speaEmpForm.reset();
          this.router.navigate(['/dashboard/messages/messages'])
        },err=>{
          this.toastr.error(err)
        })
      }
  
      if(this.scope == "Guardian"){
        const form ={
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
          "title": this.parentForm.value.title,
          "messegeText": this.parentForm.value.description,
          "messageTypeId": this.parentForm.value.messageType,
          // "schoolId": Number(localStorage.getItem('schoolId')),
          "schoolId":this.studentSchool,
          'attachment': this.imagesResult.map(attachment=>{
            return attachment.url
          }) || null
        }
        console.log(form);
        this.messageService.sendDataFromGuardianToSchool(form).subscribe(res=>{
          this.toastr.success('تم الارسال بنجاح')
          this.isShown=false;
          this.isShown1=false;
          this.isShown2=false;
          this.parentForm.reset();
          
        },err=>{
          this.toastr.error(err)
        })
      }
  
        if(this.scope == "Employee"){
        const form ={
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
          "guardianIds": this.schoolEmpForm.value.guardian.map(res=>res.id),
          "title": this.schoolEmpForm.value.title,
          "replyPossibility": this.schoolEmpForm.value.switch2,
          "messegeText": this.schoolEmpForm.value.description,
          "messageTypeId": this.schoolEmpForm.value.messageType,
          'attachment': this.imagesResult.map(attachment=>{
            return attachment.url
          }) || null
        }
        this.messageService.sendDataFromEmpToGuardian(form).subscribe(res=>{
          this.toastr.success('تم الارسال بنجاح')
          this.isShown=false;
          this.isShown1=false;
          this.isShown2=false;
          this.schoolEmpForm.reset();
        },err=>{
          this.toastr.error(err)
        })
        }
  
  
    }
}
