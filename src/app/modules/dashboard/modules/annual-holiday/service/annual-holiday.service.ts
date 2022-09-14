import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnualHoliday } from 'src/app/core/Models/iannual-holiday';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnnualHolidayService {
  schoolYear: number = 0;
  private httpoption;
  cities: string[];
  annualHolidayList: IAnnualHoliday[] = [];
  constructor(private httpclient: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    };
    this.annualHolidayList = [
      { 'id': 1, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'gender': 'Female', 'nationality': 'Somalia' },
      { 'id': 2, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'gender': 'Male', 'nationality': 'United States' },
      { 'id': 3, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(478) 7181722', 'email': 'aelldred2@archive.org', 'gender': 'Female', 'nationality': 'Russia' },
      { 'id': 4, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'gender': 'Female', 'nationality': 'China' },
      { 'id': 5, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'gender': 'Male', 'nationality': 'Mongolia' },
      { 'id': 6, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'gender': 'Male', 'nationality': 'Bhutan' },
      { 'id': 7, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'gender': 'Male', 'nationality': 'Peru' },
      { 'id': 8, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'gender': 'Male', 'nationality': 'Niger' },
      { 'id': 9, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'gender': 'Female', 'nationality': 'Argentina' },
      { 'id': 10, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'gender': 'Female', 'nationality': 'Greece' },
      { 'id': 11, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'gender': 'Female', 'nationality': 'Indonesia' },
      { 'id': 12, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'gender': 'Female', 'nationality': 'Finland' },
      { 'id': 13, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'gender': 'Female', 'nationality': 'Philippines' },
      { 'id': 14, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(416) 4076124', 'email': 'adriversd@com.com', 'gender': 'Male', 'nationality': 'Bosnia and Herzegovina' },
      { 'id': 15, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'gender': 'Female', 'nationality': 'Bolivia' },
      { 'id': 16, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'gender': 'Female', 'nationality': 'China' },
      { 'id': 17, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'gender': 'Male', 'nationality': 'Finland' },
      { 'id': 18, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'gender': 'Male', 'nationality': 'Portugal' },
      { 'id': 19, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'gender': 'Female', 'nationality': 'Madagascar' },
      { 'id': 20, 'smester': '', 'holiday': [], 'year': null, 'phoneno': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'gender': 'Female', 'nationality': 'Greece' }
    ];
    this.cities = [
      "2022",
      "Rome",
      "London",
      "Istanbul",
      "Paris"
    ];
  }

 
}
