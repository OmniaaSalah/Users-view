import { Injectable ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class UsersReportsService {

  lang = inject(TranslationService).lang;
  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) { }


  tabelColumns = [
    {

      name:this.translate.instant('dashboard.schools.employeeName'),
      isSelected: true,
      isDisabled: true,
    },
    {

      name:this.translate.instant('dashboard.SystemSetting.Email'),
      isSelected: true,
      isDisabled: true,
    },
    {
      name:this.translate.instant('dashboard.reports.RequestsNumbers'),
      isSelected: true,
      isDisabled: true,
    },
    {
   
      name:this.translate.instant('shared.phoneNumber'),
      isSelected: true,
      isDisabled: true,
    },
  ];

  getAllEmployees(filter) {
    
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post('/Request/employees-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  employeesToExport(filter?:Partial<Filter>)
  {
    return this.http.post('/Request/employees-report',filter)
    .pipe(
      map(res=>{
        return res.result.employeesPerformance.data.map(employee =>{
          return {
            [this.translate.instant('dashboard.schools.employeeName')]:employee?.employeeName ? employee?.employeeName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.SystemSetting.Email')]:employee?.email ? employee?.email : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.reports.RequestsNumbers')]:employee?.requestNumber,
            [this.translate.instant('shared.phoneNumber')]: employee?.phoneNumber ? employee?.phoneNumber : this.translate.instant('shared.notFound')


          }
        })
      }))
  }
}
