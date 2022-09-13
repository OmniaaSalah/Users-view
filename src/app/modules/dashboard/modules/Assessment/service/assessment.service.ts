import { Injectable } from '@angular/core';
import { iassesment } from 'src/app/core/models/iassesment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  assessmentlist: iassesment[] = [];
  cities: string[];
  constructor() {
    this.assessmentlist = [
      { 'maximumdegree': 1, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(815) 6180492', 'assesmentname': 'ccornau0@bigcartel.com', 'username': 'Female', 'assessmenttable': 'Somalia', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 2, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(507) 3119958', 'assesmentname': 'eelsmore1@goo.gl', 'username': 'Male', 'assessmenttable': 'United States', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 3, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(478) 7181722', 'assesmentname': 'aelldred2@archive.org', 'username': 'Female', 'assessmenttable': 'Russia', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 4, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(698) 4411762', 'assesmentname': 'ameachem3@columbia.edu', 'username': 'Female', 'assessmenttable': 'China', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 5, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(345) 6582965', 'assesmentname': 'jhadwen4@vkontakte.ru', 'username': 'Male', 'assessmenttable': 'Mongolia', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 6, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(659) 9557733', 'assesmentname': 'rwainscoat5@thetimes.co.uk', 'username': 'Male', 'assessmenttable': 'Bhutan', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 7, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(864) 2101861', 'assesmentname': 'mbraddock6@yellowbook.com', 'username': 'Male', 'assessmenttable': 'Peru', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 8, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(165) 5814372', 'assesmentname': 'jcrotty7@opensource.org', 'username': 'Male', 'assessmenttable': 'Niger', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 9, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(428) 2282928', 'assesmentname': 'mbraker8@yahoo.co.jp', 'username': 'Female', 'assessmenttable': 'Argentina', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 10, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(673) 5170425', 'assesmentname': 'bbosman9@google.co.jp', 'username': 'Female', 'assessmenttable': 'Greece', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 11, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(978) 8885907', 'assesmentname': 'drowlandsa@slate.com', 'username': 'Female', 'assessmenttable': 'Indonesia', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 12, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(956) 9360112', 'assesmentname': 'nkeetsb@canalblog.com', 'username': 'Female', 'assessmenttable': 'Finland', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 13, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(240) 7150720', 'assesmentname': 'sbussenc@so-net.ne.jp', 'username': 'Female', 'assessmenttable': 'Philippines', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 14, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(416) 4076124', 'assesmentname': 'adriversd@com.com', 'username': 'Male', 'assessmenttable': 'Bosnia and Herzegovina', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 15, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(262) 7945277', 'assesmentname': 'cbalasine@blogger.com', 'username': 'Female', 'assessmenttable': 'Bolivia', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 16, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(501) 3984600', 'assesmentname': 'cbarrickf@t-online.de', 'username': 'Female', 'assessmenttable': 'China', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 17, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(718) 4157883', 'assesmentname': 'itreweelag@tripod.com', 'username': 'Male', 'assessmenttable': 'Finland', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 18, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(213) 5730967', 'assesmentname': 'ygeorgeoth@360.cn', 'username': 'Male', 'assessmenttable': 'Portugal', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 19, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(349) 6453938', 'assesmentname': 'hpalffreyi@nba.com', 'username': 'Female', 'assessmenttable': 'Madagascar', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 },
      { 'maximumdegree': 20, 'assessment': '', 'minmumdegree': 0, 'status': '', 'createddate': '(474) 3068249', 'assesmentname': 'gmordonj@uiuc.edu', 'username': 'Female', 'assessmenttable': 'Greece', 'deservingdegreesto': 0, 'deservingdegreesfrom': 0 }
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
