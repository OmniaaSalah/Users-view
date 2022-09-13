import { Injectable } from '@angular/core';
import { iindexs } from 'src/app/core/Models/iindex';

@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  cities: string[];
  indexeslist: iindexs[] = [];
  constructor() {

    this.indexeslist = [
      { 'indexname': 'ccornau0@bigcartel.com', 'indexstatus': 'Female', 'indextype': 'Somalia', 'notchecked': false },
      { 'indexname': 'eelsmore1@goo.gl', 'indexstatus': 'Male', 'indextype': 'United States', 'notchecked': true },
      { 'indexname': 'aelldred2@archive.org', 'indexstatus': 'Female', 'indextype': 'Russia', 'notchecked': false },
      { 'indexname': 'ameachem3@columbia.edu', 'indexstatus': 'Female', 'indextype': 'China', 'notchecked': false },
      { 'indexname': 'jhadwen4@vkontakte.ru', 'indexstatus': 'Male', 'indextype': 'Mongolia', 'notchecked': true },
      { 'indexname': 'rwainscoat5@thetimes.co.uk', 'indexstatus': 'Male', 'indextype': 'Bhutan', 'notchecked': true },
      { 'indexname': 'mbraddock6@yellowbook.com', 'indexstatus': 'Male', 'indextype': 'Peru', 'notchecked': true },
      { 'indexname': 'jcrotty7@opensource.org', 'indexstatus': 'Male', 'indextype': 'Niger', 'notchecked': true },
      { 'indexname': 'mbraker8@yahoo.co.jp', 'indexstatus': 'Female', 'indextype': 'Argentina', 'notchecked': false },
      { 'indexname': 'bbosman9@google.co.jp', 'indexstatus': 'Female', 'indextype': 'Greece', 'notchecked': false },
      { 'indexname': 'drowlandsa@slate.com', 'indexstatus': 'Female', 'indextype': 'Indonesia', 'notchecked': false },
      { 'indexname': 'nkeetsb@canalblog.com', 'indexstatus': 'Female', 'indextype': 'Finland', 'notchecked': false },
      { 'indexname': 'sbussenc@so-net.ne.jp', 'indexstatus': 'Female', 'indextype': 'Philippines', 'notchecked': false },
      { 'indexname': 'adriversd@com.com', 'indexstatus': 'Male', 'indextype': 'Bosnia and Herzegovina', 'notchecked': true },
      { 'indexname': 'cbalasine@blogger.com', 'indexstatus': 'Female', 'indextype': 'Bolivia', 'notchecked': false },
      { 'indexname': 'cbarrickf@t-online.de', 'indexstatus': 'Female', 'indextype': 'China', 'notchecked': false },
      { 'indexname': 'itreweelag@tripod.com', 'indexstatus': 'Male', 'indextype': 'Finland', 'notchecked': true },
      { 'indexname': 'ygeorgeoth@360.cn', 'indexstatus': 'Male', 'indextype': 'Portugal', 'notchecked': true },
      { 'indexname': 'hpalffreyi@nba.com', 'indexstatus': 'Female', 'indextype': 'Madagascar', 'notchecked': false },
      { 'indexname': 'gmordonj@uiuc.edu', 'indexstatus': 'Female', 'indextype': 'Greece', 'notchecked': false }
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
