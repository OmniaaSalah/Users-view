import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IIndexs } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { IndexesService } from '../../service/indexes.service';
@Component({
  selector: 'app-edit-new-index',
  templateUrl: './edit-new-index.component.html',
  styleUrls: ['./edit-new-index.component.scss']
})
export class EditNewIndexComponent implements OnInit,OnDestroy {
  index:IIndexs={} as IIndexs;
  checked:boolean=true;
  isShown:boolean=false;
  checkIcon= faCheck;
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  cities: string[];
  indexFormGrp: FormGroup;
  constructor(private fb: FormBuilder, private headerService: HeaderService,private layoutService:LayoutService, private router: Router, private translate: TranslateService, private indexService: IndexesService) {
    this.indexFormGrp = fb.group({

      arabicIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      englishIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      indexType: ['', [Validators.required]],
      indexStatus:['']

    });
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'), routerLink: '/dashboard/manager-tools/indexes/indexes-list',routerLinkActiveOptions:{exact: true} },
          { label: this.translate.instant('dashboard.Indexes.Add Item'),routerLink: '/dashboard/manager-tools/indexes/new-index' }],
        'mainTitle': { main: this.translate.instant('dashboard.Indexes.Add Item') }
      }
    );
    this.cities = this.indexService.cities;
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
    this.layoutService.message.next('dashboard.Indexes.Old System Lists will be changed Based on New edit');
    this.layoutService.messageBackGroundColor.next("green");
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

 
  ngOnDestroy(){

    this.layoutService.message.next('');
    this.layoutService.messageBackGroundColor.next("");
  }
}
