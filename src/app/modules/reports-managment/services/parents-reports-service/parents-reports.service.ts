import { Injectable ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class ParentsReportsService {
  lang = inject(TranslationService).lang;

  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) { }

  getAllParents(filter?:Partial<SearchModel>) {

    this.tableLoaderService.isLoading$.next(true)
    return this.http.post('/Guardian/report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getTableColumns()
  {
    return [

      {
        name: this.translate.instant('dashboard.parents.parentName'),
        isSelected: true,
        sortField: this.lang =='ar'? 'GuardianNameAr': 'GuardianNameEn'
      },
      {
        name:this.translate.instant('dashboard.parents.parentNumber'),
        isSelected: true,
        sortField:'GuardianMobile'
      },
      {
        name: this.translate.instant('Nationality'),
        isSelected: true,
        sortField: this.lang =='ar'? 'GuardianNationalityAr': 'GuardianNationalityEn'
      },
      {
        name: this.translate.instant('dashboard.parents.parentEmail'),
        isSelected: true,
        sortField:'GuardianEmail'
      },
      {
        name:  this.translate.instant('dashboard.parents.relatedType'),
        isSelected: true,
        sortField: this.lang =='ar'? 'GuardianRelationTypeAr': 'GuardianRelationTypeEn'
      },

      {
        name:this.translate.instant('dashboard.schools.student'),
        isSelected: true,
        sortField: this.lang =='ar'? 'StudentNameAr': 'StudentNameEn'
      },
      {
        name:this.translate.instant('Students nickname'),
        isSelected: false,
        sortField: this.lang =='ar'? 'StudentSurNameAr': 'StudentSurNameEn'
      },
      {
        name:this.translate.instant('dashboard.students.daleelNumber1'),
        isSelected: false,
        sortField:'StudentIdInDaleel'
      },
      {
        name:this.translate.instant('dashboard.students.daleelNumber2'),
        isSelected: false,
        sortField:'StudentId'
      },
      {
        name:this.translate.instant('dashboard.students.manhalNumber'),
        isSelected: false,
        sortField:'StudentIdInManhl'
      },
      {
        name: this.translate.instant('shared.Identity Number'),
        isSelected: false,
        sortField:'GuardianEmiratesIdNumber'
      },
      {
        name: this.translate.instant('dashboard.parents.ChildWithoutNationality'),
        isSelected: false,
        sortField: this.lang =='ar'? 'GuardianReasonForNotHavingEmirratesIdAr': 'GuardianReasonForNotHavingEmirratesIdEn'
      },
      {
        name: this.translate.instant('shared.gender'),
        isSelected: false,
        sortField:'GuardianGender'
      },
      {
        name: this.translate.instant('shared.state'),
        isSelected: false,
        sortField:'StudentState'
      },
      {
        name: this.translate.instant('shared.city'),
        isSelected: false,
        sortField:'StudentCity'
      },
      {
        name: this.translate.instant('shared.registrationDateAndTime'),
        isSelected: false,
        sortField:'StudentRegisterationDate'
      }
    ];
  }

  parentsToExport(filter?){
    return this.http.post('/Guardian/report',filter)
    .pipe(
      take(1),
      map(res=>{
      return res.data.map(parent =>{
      return {
            [this.translate.instant('dashboard.parents.parentName')]: parent?.parentName[this.lang] ? parent?.parentName[this.lang]:this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.parentNumber')]: parent?.parentNumber? parent?.parentNumber:this.translate.instant('shared.notFound'),
            [this.translate.instant('Nationality')]: parent?.parentNationality[this.lang] ? parent?.parentNationality[this.lang]:this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.parentEmail')]: parent?.parentEmail ? parent?.parentEmail:this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.relatedType')]: parent?.relationType[this.lang] ? parent?.relationType[this.lang]:this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.schools.student')]: parent?.student?.name[this.lang] ? parent?.student?.name[this.lang]:this.translate.instant('shared.notFound'),
            [this.translate.instant('Students nickname')]:parent?.studentNickName[this.lang] ? parent?.studentNickName[this.lang]:this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.daleelNumber1')]:parent?.studentIdInDaleel ? parent?.studentIdInDaleel:this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.daleelNumber2')]:parent?.student?.id ? parent?.student?.id:this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.manhalNumber')]:parent?.studentIdInManhl ?parent?.studentIdInManhl:this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.Identity Number')]:parent?.emiratesIdNumber ? parent?.emiratesIdNumber :this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.ChildWithoutNationality')]:parent?.reasonForNotHavingEmirratesId[this.lang] ? parent?.reasonForNotHavingEmirratesId[this.lang]:this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.gender')]:parent?.parentGender ? this.translate.instant('shared.genderType.'+parent?.parentGender):this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.state')]:parent?.studentState,
            [this.translate.instant('shared.city')]:parent?.studentCity,
            [this.translate.instant('shared.registrationDateAndTime')]:parent?.studentRegisterationDate,

          }
        })
      })
      )
  }
}
