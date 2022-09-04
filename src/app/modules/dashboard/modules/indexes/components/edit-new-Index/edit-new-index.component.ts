import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight ,faExclamationCircle,faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { IndexesService } from '../../service/indexes.service';
@Component({
  selector: 'app-edit-new-index',
  templateUrl: './edit-new-index.component.html',
  styleUrls: ['./edit-new-index.component.scss']
})
export class EditNewIndexComponent implements OnInit {
  checkicon=faCheck;
  Exclamationicon=faExclamationCircle;
  righticon=faArrowRight;
  cities: string[];
  IndexFormgrp:FormGroup;
  constructor(private fb: FormBuilder,private headerService:HeaderService,private router:Router,private translate:TranslateService,private IndexService:IndexesService) { 
    this.IndexFormgrp= fb.group({
   
      IndexName:['',[Validators.required,Validators.maxLength(500)]],
      IndexType:['',[Validators.required]]
  
      });
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {'breadCrump':[
        {label: this.translate.instant('sideBar.managerTools.children.System List')},
        {label: this.translate.instant('dashboard.Indexes.Add Item')}],
        'home':{icon: 'pi pi-home', routerLink: '/'},
        'mainTittle':this.translate.instant('dashboard.Indexes.Add Item')
      }
      );
      this.cities=this.IndexService.cities;
  }
  get IndexName()
  {
    return this.IndexFormgrp.controls['IndexName'] ;
  }

  get IndexType()
  {
    return this.IndexFormgrp.controls['IndexType'] ;
  }
  GoBack(){
    this.router.navigate(['/dashboard/manager-tools/Indexes/View-SystemList']);
  }

}
