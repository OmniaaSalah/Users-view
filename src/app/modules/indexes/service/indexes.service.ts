import { Injectable ,inject} from '@angular/core';
import { take,finalize,map } from 'rxjs';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  lang = inject(TranslationService).lang


  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {


  }


  getAllIndexes(filter?:Partial<SearchModel>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.post('/IndexList/Search',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));

  }

  addIndex(index)
  {

    return this.http.post('/IndexList',index);


  }

  getIndexByID(indexId:number)
  {
    return this.http.get(`/IndexList/${indexId}`).pipe(take(1))
  }

  updateIndex(indexId:number,index)
  {

    return this.http.put(`/IndexList/${indexId}`,index).pipe(take(1))
  }


  getIndext(type: IndexesEnum)
  {

    return this.http.get(`/IndexList/indexList/${type}`).pipe(take(1));

  }

  indexesToExport(filter){
    return this.http.post('/IndexList/Search',filter)
    .pipe(
      map(res=>{
        return res.data.map(index =>{
          return {
            [this.translate.instant('dashboard.Indexes.List Type')]: this.translate.instant(index?.indexType),
            [this.translate.instant('dashboard.Indexes.Index Name')]: index?.indexName[this.lang],
            [this.translate.instant('dashboard.Indexes.Index Status')]: this.translate.instant(index?.indexStatus),

          }
        })
      }))
  }

}
