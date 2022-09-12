import { Injectable } from '@angular/core';
import { Index } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  cities: string[];
  IndexesList: Index[] = [];
  constructor() {

    this.IndexesList = [
      { 'IndexName': 'ccornau0@bigcartel.com', 'IndexStatus': 'Female', 'IndexType': 'Somalia', 'Notchecked': false },
      { 'IndexName': 'eelsmore1@goo.gl', 'IndexStatus': 'Male', 'IndexType': 'United States', 'Notchecked': true },
      { 'IndexName': 'aelldred2@archive.org', 'IndexStatus': 'Female', 'IndexType': 'Russia', 'Notchecked': false },
      { 'IndexName': 'ameachem3@columbia.edu', 'IndexStatus': 'Female', 'IndexType': 'China', 'Notchecked': false },
      { 'IndexName': 'jhadwen4@vkontakte.ru', 'IndexStatus': 'Male', 'IndexType': 'Mongolia', 'Notchecked': true },
      { 'IndexName': 'rwainscoat5@thetimes.co.uk', 'IndexStatus': 'Male', 'IndexType': 'Bhutan', 'Notchecked': true },
      { 'IndexName': 'mbraddock6@yellowbook.com', 'IndexStatus': 'Male', 'IndexType': 'Peru', 'Notchecked': true },
      { 'IndexName': 'jcrotty7@opensource.org', 'IndexStatus': 'Male', 'IndexType': 'Niger', 'Notchecked': true },
      { 'IndexName': 'mbraker8@yahoo.co.jp', 'IndexStatus': 'Female', 'IndexType': 'Argentina', 'Notchecked': false },
      { 'IndexName': 'bbosman9@google.co.jp', 'IndexStatus': 'Female', 'IndexType': 'Greece', 'Notchecked': false },
      { 'IndexName': 'drowlandsa@slate.com', 'IndexStatus': 'Female', 'IndexType': 'Indonesia', 'Notchecked': false },
      { 'IndexName': 'nkeetsb@canalblog.com', 'IndexStatus': 'Female', 'IndexType': 'Finland', 'Notchecked': false },
      { 'IndexName': 'sbussenc@so-net.ne.jp', 'IndexStatus': 'Female', 'IndexType': 'Philippines', 'Notchecked': false },
      { 'IndexName': 'adriversd@com.com', 'IndexStatus': 'Male', 'IndexType': 'Bosnia and Herzegovina', 'Notchecked': true },
      { 'IndexName': 'cbalasine@blogger.com', 'IndexStatus': 'Female', 'IndexType': 'Bolivia', 'Notchecked': false },
      { 'IndexName': 'cbarrickf@t-online.de', 'IndexStatus': 'Female', 'IndexType': 'China', 'Notchecked': false },
      { 'IndexName': 'itreweelag@tripod.com', 'IndexStatus': 'Male', 'IndexType': 'Finland', 'Notchecked': true },
      { 'IndexName': 'ygeorgeoth@360.cn', 'IndexStatus': 'Male', 'IndexType': 'Portugal', 'Notchecked': true },
      { 'IndexName': 'hpalffreyi@nba.com', 'IndexStatus': 'Female', 'IndexType': 'Madagascar', 'Notchecked': false },
      { 'IndexName': 'gmordonj@uiuc.edu', 'IndexStatus': 'Female', 'IndexType': 'Greece', 'Notchecked': false }
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
