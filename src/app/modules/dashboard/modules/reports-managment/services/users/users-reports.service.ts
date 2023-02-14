import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersReportsService {

  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) { }


  tabelColumns = [
    {
      key: 'fullName',
      name:{en:'Employee Name',ar:'اسم الموظف'},
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'email', // make itdynamic based on bbackend object key on all objects
      name: { en: 'Email', ar: 'البريد الألكتروني' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'emiratesIdNumber',
      name: { en: 'The number of orders', ar: 'عدد الطلبات' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'phoneNumber',
      name: { en: 'Phone Number', ar: 'رقم الهاتف' },
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
}
