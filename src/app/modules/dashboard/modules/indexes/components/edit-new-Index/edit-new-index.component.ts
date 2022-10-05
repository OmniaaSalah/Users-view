import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IIndexs } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { IndexesService } from '../../service/indexes.service';
@Component({
  selector: 'app-edit-new-index',
  templateUrl: './edit-new-index.component.html',
  styleUrls: ['./edit-new-index.component.scss']
})
export class EditNewIndexComponent implements OnInit {
  index:IIndexs={} as IIndexs;
  checked:boolean=true;
  isShown:boolean=false;
  message:string="";
  checkIcon= faCheck;
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  listType: string[];
  urlParameter: number=0;
  indexFormGrp: FormGroup;
  constructor(private fb: FormBuilder,private toastr: ToastrService,private route: ActivatedRoute, private headerService: HeaderService,private layoutService:LayoutService, private router: Router, private translate: TranslateService, private indexService: IndexesService) {
    this.indexFormGrp = fb.group({

      arabicIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      englishIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      indexType: ['', [Validators.required]],
      indexStatus:['']

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.urlParameter = Number(param.get('indexId'));
    });
    console.log(this.urlParameter);
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'), routerLink: '/dashboard/manager-tools/indexes/indexes-list',routerLinkActiveOptions:{exact: true} },
          { 
           
            label: (this.urlParameter==0||this.urlParameter.toString()=='')?  this.translate.instant('dashboard.Indexes.Add Item'):this.translate.instant('dashboard.Indexes.Edit Item'),
            routerLink: (this.urlParameter==0||this.urlParameter.toString()=='')? '/dashboard/manager-tools/indexes/new-index':'/dashboard/manager-tools/indexes/edit-index/'+this.urlParameter
          }
       ],
        'mainTitle':{main:(this.urlParameter==0||this.urlParameter.toString()=='')? this.translate.instant('dashboard.Indexes.Add Item'):this.translate.instant('dashboard.Indexes.Edit Item')}
      }
    );
    this.listType = this.indexService.listType;
  }
  get arabicIndexName() {
    return this.indexFormGrp.controls['arabicIndexName'];
  }
  get englishIndexName() {
    return this.indexFormGrp.controls['englishIndexName'];
  }

  get indexType() {
    return this.indexFormGrp.controls['indexType'];
  }
  get indexStatus()
  {
    return this.indexFormGrp.controls['indexStatus'];
  }

  
  saveMe(){
    this.index={} as IIndexs;

    this.index={
      'indexArabicName':this.indexFormGrp.value.arabicIndexName,
      'indexEnglishName':this.indexFormGrp.value.englishIndexName,
      'indexType':this.indexFormGrp.value.indexType,
      'indexStatus':this.indexFormGrp.value.indexStatus==true? 1:2
    };
      console.log(this.index);
     this.indexService.addIndex(this.index).subscribe((res)=>{console.log(res);
      this.showSuccessedMessage();
      this.router.navigate(['/dashboard/manager-tools/indexes/indexes-list']);
    },(err)=>{this.showErrorMessage();});
  }
  showSuccessedMessage()
  {
    this.toastr.clear();
    this.layoutService.message.next( 'dashboard.Indexes.Old System Lists will be changed Based on New edit');
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.toastr.success( this.translate.instant(this. message));
  }

  showErrorMessage()
  {
    this.toastr.clear();
    this.layoutService.message.next( 'dashboard.Indexes.You should enter Valid Data First');
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.toastr.error( this.translate.instant(this. message));
  }
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

 
 
}
