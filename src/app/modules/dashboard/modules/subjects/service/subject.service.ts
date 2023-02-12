import { Injectable ,inject} from '@angular/core';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { take,  map,delay,BehaviorSubject,finalize } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { AssessmentsEnum } from 'src/app/shared/enums/subjects/assessment-type.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjectsList: ISubject[] = [];
 evaluationTypeList;
 successStatus;
 lang = inject(TranslationService).lang;
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
    this.evaluationTypeList=
    [{value:AssessmentsEnum.IPpoints,name:this.translate.instant('IPpoints')},
    {value:AssessmentsEnum.Grades,name:this.translate.instant('Grades')},
    {value:AssessmentsEnum.Discription,name:this.translate.instant('Discription')},
    {value:AssessmentsEnum.Evaluation,name:this.translate.instant('Evaluation')}];

    this.successStatus = [
    {name:this.translate.instant('dashboard.Subjects.successed'),status:true},
    {name:this.translate.instant('dashboard.Subjects.retry'),status:false}
    ];
  }

  getAllSubjects(filter?:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.get('/Subject',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
  }

  getAllSPEASubjects(filter?:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.get('/Subject/organization-subject/dropdown',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
  }
  deleteSubject(id:number)
  {

    return this.http.delete(`/Subject/${id}`).pipe(take(1));
   
  }

  addSubject(subject)
  {
  
    return this.http.post('/Subject',subject);
    
      
  }

  addSubjectBySchool(subject)
  {
     console.log(subject)
    return this.http.post('/Subject/school-Grade-subject?yearId=1',subject);
    
      
  }
 
  getSubjectByID(subjectId:number)
  {
    return this.http.get(`/Subject/${subjectId}`).pipe(take(1))
  }

  updateSubject(subject)
  {

    return this.http.put(`/Subject`,subject).pipe(take(1))
  }
  subjectsToExport(filter){
    return this.http.get('/Subject',filter)
    .pipe(
      map(res=>{
  console.log(res)
        return res.data.map(subject =>{
          return {
            [' ']: "# "+subject?.subjectCode,
            [this.translate.instant('dashboard.Subjects.Subject Name')]: subject?.subjectName[this.lang],
            [this.translate.instant('dashboard.schools.schoolName')]: subject?.schoolName[this.lang],
            [this.translate.instant('dashboard.Subjects.Evaluation System')]: this.getEvaluationType(subject?.evaluationType),
            [this.translate.instant('dashboard.Subjects.Created by')]: subject?.creatorName,
            [this.translate.instant('shared.Created Date')]: subject?.createdDate,
            [this.translate.instant('dashboard.Subjects.Edited by')]: subject?.editorName,
            [this.translate.instant('dashboard.Subjects.Last EditDate')]: subject?.lastEditedDate,
            [this.translate.instant('dashboard.Subjects.Subject Minimum grade')]: subject?.subjectMinmumDegree ? subject?.subjectMinmumDegree:'-',
            [this.translate.instant('dashboard.Subjects.Subject Maximum grade')]: subject?.maximumDegree ? subject?.maximumDegree:'-'
            
   

          }
        })
      }))
  }
  getEvaluationType(type)
  {
    if(type==AssessmentsEnum.IPpoints)
    {
      return this.translate.instant('IPpoints');
    }
    else if(type==AssessmentsEnum.Discription)
    {
      return this.translate.instant('Discription');
    }
    else if(type==AssessmentsEnum.Evaluation)
    {
      return this.translate.instant('Evaluation');
    }
    else if(type==AssessmentsEnum.Grades)
    {
      return this.translate.instant('Grades');
    }
  }
}
