import { Injectable ,inject} from '@angular/core';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { take,  map,delay,BehaviorSubject,finalize } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
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
    [{id:1,name:{en:"IPpoints",ar:this.translate.instant('IPpoints')}},
    {id:2,name:{en:"Grades",ar:this.translate.instant('Grades')}},
    {id:3,name:{en:"Discription",ar:this.translate.instant('Discription')}},
    {id:4,name:{en:"Evaluation",ar:this.translate.instant('Evaluation')}}];
    this.successStatus = [
    {id:1,name:{ar:'ناجح',en:'dashboard.Subjects.successed'},status:true},
    {id:2,name:{ar:'إعادة المحاولة',en:'dashboard.Subjects.retry'},status:false}
    ];
  }

  getAllSubjects(filter?:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.get('/Subject',filter).pipe(take(1),finalize(()=> {
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
  
        return res.data.map(subject =>{
          return {
            [' ']: "# "+subject?.subjectCode,
            [this.translate.instant('dashboard.Subjects.Subject Name')]: subject?.subjectName[this.lang],
            // [this.translate.instant('dashboard.Subjects.Evaluation System')]: this.translate.instant(subject?.evaluationType),
            [this.translate.instant('dashboard.Subjects.Created by')]: subject?.creatorName,
            [this.translate.instant('shared.Created Date')]: subject?.createdDate,
            [this.translate.instant('dashboard.Subjects.Edited by')]: subject?.editorName,
            [this.translate.instant('dashboard.Subjects.Last EditDate')]: subject?.lastEditedDate,
            [this.translate.instant('dashboard.Subjects.Subject Minimum grade')]: subject?.subjectMinmumDegree,
   

          }
        })
      }))
  }
}
