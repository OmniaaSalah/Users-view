import { Injectable } from '@angular/core';
import { IIndexs } from 'src/app/core/Models/iindex';

@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  cities: string[];
  indexesList: IIndexs[] = [];
  constructor() {

    this.indexesList = [
      { 'indexName': 'ccornau0@bigcartel.com', 'indexStatus': 'Female', 'indexType': 'Somalia', 'notChecked': false },
      { 'indexName': 'eelsmore1@goo.gl', 'indexStatus': 'Male', 'indexType': 'United States', 'notChecked': true },
      { 'indexName': 'aelldred2@archive.org', 'indexStatus': 'Female', 'indexType': 'Russia', 'notChecked': false },
      { 'indexName': 'ameachem3@columbia.edu', 'indexStatus': 'Female', 'indexType': 'China', 'notChecked': false },
      { 'indexName': 'jhadwen4@vkontakte.ru', 'indexStatus': 'Male', 'indexType': 'Mongolia', 'notChecked': true },
      { 'indexName': 'rwainscoat5@thetimes.co.uk', 'indexStatus': 'Male', 'indexType': 'Bhutan', 'notChecked': true },
      { 'indexName': 'mbraddock6@yellowbook.com', 'indexStatus': 'Male', 'indexType': 'Peru', 'notChecked': true },
      { 'indexName': 'jcrotty7@opensource.org', 'indexStatus': 'Male', 'indexType': 'Niger', 'notChecked': true },
      { 'indexName': 'mbraker8@yahoo.co.jp', 'indexStatus': 'Female', 'indexType': 'Argentina', 'notChecked': false },
      { 'indexName': 'bbosman9@google.co.jp', 'indexStatus': 'Female', 'indexType': 'Greece', 'notChecked': false },
      { 'indexName': 'drowlandsa@slate.com', 'indexStatus': 'Female', 'indexType': 'Indonesia', 'notChecked': false },
      { 'indexName': 'nkeetsb@canalblog.com', 'indexStatus': 'Female', 'indexType': 'Finland', 'notChecked': false },
      { 'indexName': 'sbussenc@so-net.ne.jp', 'indexStatus': 'Female', 'indexType': 'Philippines', 'notChecked': false },
      { 'indexName': 'adriversd@com.com', 'indexStatus': 'Male', 'indexType': 'Bosnia and Herzegovina', 'notChecked': true },
      { 'indexName': 'cbalasine@blogger.com', 'indexStatus': 'Female', 'indexType': 'Bolivia', 'notChecked': false },
      { 'indexName': 'cbarrickf@t-online.de', 'indexStatus': 'Female', 'indexType': 'China', 'notChecked': false },
      { 'indexName': 'itreweelag@tripod.com', 'indexStatus': 'Male', 'indexType': 'Finland', 'notChecked': true },
      { 'indexName': 'ygeorgeoth@360.cn', 'indexStatus': 'Male', 'indexType': 'Portugal', 'notChecked': true },
      { 'indexName': 'hpalffreyi@nba.com', 'indexStatus': 'Female', 'indexType': 'Madagascar', 'notChecked': false },
      { 'indexName': 'gmordonj@uiuc.edu', 'indexStatus': 'Female', 'indexType': 'Greece', 'notChecked': false }
    ];
    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul",
      "Paris"
    ];
  }
}
