import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';
import { AddChildService } from '../../../services/add-child.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ToastrService } from 'ngx-toastr';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';

@Component({
  selector: 'app-with-identity',
  templateUrl: './with-identity.component.html',
  styleUrls: ['./with-identity.component.scss']
})

export class WithIdentityComponent implements OnInit {

  lang =inject(TranslationService).lang
  get fileTypesEnum () {return FileEnum}
  
  newChildForm: FormGroup = this.fb.group({
    identityNumber:[ null,[Validators.required, Validators.pattern('[784]{1}[0-9]{14}')]],
    relativityType:['',Validators.required],
    note:null
  })

  get IdentityNumCtr(){return this.newChildForm.controls['identityNumber']}


  relativeityTypes$ = this.shredService.getParentRelative()

  minimumDate = new Date();

  subscription:Subscription;

  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'dashboard.parentHome.Add New Child'
        ),
        routerLink: '/parent/AddChild/Addchild-WithNationality',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.parentHome.Add New Child'),
    },
  };

  constructor(private fb:FormBuilder,  
    private addChild:AddChildService,
    private translate: TranslateService,private headerService: HeaderService,
    private shredService:SharedService,
    public confirmModelService: ConfirmModelService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.confirmModelListener()
  }


   sendRegisterForm(){

    this.addChild.addChildWithIdentity(this.newChildForm).subscribe(res=>{      
      this.toastr.success(res.message);
    },err=>{

      if(err.errorMessage == "This child exist for another guardian"){
        this.confirmModelService.openModel({message:this.translate.instant('dashboard.parentHome.message')})
      }else{
        this.toastr.error(err);
      }
    })

   }

   confirmModelListener(){
    this.subscription=this.confirmModelService.confirmed$.subscribe(result=>{
      if(result){
       
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.confirmModelService.confirmed$.next(null);
    this.confirmModelService.closeModel();
  }

}
