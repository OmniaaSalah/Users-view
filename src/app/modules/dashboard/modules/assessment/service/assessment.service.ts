import { Injectable } from '@angular/core';
import { IAssesment } from 'src/app/core/models/iassesment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  assessmentList: IAssesment[] = [];
  cities: string[];
  constructor() {
    this.assessmentList = [
      { 'maximumDegree': 1, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(815) 6180492', 'assesmentName': 'ccornau0@bigcartel.com', 'userName': 'Female', 'assessmentTable': 'Somalia', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 2, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(507) 3119958', 'assesmentName': 'eelsmore1@goo.gl', 'userName': 'Male', 'assessmentTable': 'United States', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 3, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(478) 7181722', 'assesmentName': 'aelldred2@archive.org', 'userName': 'Female', 'assessmentTable': 'Russia', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 4, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(698) 4411762', 'assesmentName': 'ameachem3@columbia.edu', 'userName': 'Female', 'assessmentTable': 'China', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 5, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(345) 6582965', 'assesmentName': 'jhadwen4@vkontakte.ru', 'userName': 'Male', 'assessmentTable': 'Mongolia', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 6, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(659) 9557733', 'assesmentName': 'rwainscoat5@thetimes.co.uk', 'userName': 'Male', 'assessmentTable': 'Bhutan', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 7, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(864) 2101861', 'assesmentName': 'mbraddock6@yellowbook.com', 'userName': 'Male', 'assessmentTable': 'Peru', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 8, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(165) 5814372', 'assesmentName': 'jcrotty7@opensource.org', 'userName': 'Male', 'assessmentTable': 'Niger', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 9, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(428) 2282928', 'assesmentName': 'mbraker8@yahoo.co.jp', 'userName': 'Female', 'assessmentTable': 'Argentina', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 10, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(673) 5170425', 'assesmentName': 'bbosman9@google.co.jp', 'userName': 'Female', 'assessmentTable': 'Greece', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 11, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(978) 8885907', 'assesmentName': 'drowlandsa@slate.com', 'userName': 'Female', 'assessmentTable': 'Indonesia', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 12, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(956) 9360112', 'assesmentName': 'nkeetsb@canalblog.com', 'userName': 'Female', 'assessmentTable': 'Finland', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 13, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(240) 7150720', 'assesmentName': 'sbussenc@so-net.ne.jp', 'userName': 'Female', 'assessmentTable': 'Philippines', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 14, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(416) 4076124', 'assesmentName': 'adriversd@com.com', 'userName': 'Male', 'assessmentTable': 'Bosnia and Herzegovina', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 15, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(262) 7945277', 'assesmentName': 'cbalasine@blogger.com', 'userName': 'Female', 'assessmentTable': 'Bolivia', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 16, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(501) 3984600', 'assesmentName': 'cbarrickf@t-online.de', 'userName': 'Female', 'assessmentTable': 'China', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 17, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(718) 4157883', 'assesmentName': 'itreweelag@tripod.com', 'userName': 'Male', 'assessmentTable': 'Finland', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 18, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(213) 5730967', 'assesmentName': 'ygeorgeoth@360.cn', 'userName': 'Male', 'assessmentTable': 'Portugal', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 19, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(349) 6453938', 'assesmentName': 'hpalffreyi@nba.com', 'userName': 'Female', 'assessmentTable': 'Madagascar', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 },
      { 'maximumDegree': 20, 'assessment': '', 'minmumDegree': 0, 'status': '', 'createdDate': '(474) 3068249', 'assesmentName': 'gmordonj@uiuc.edu', 'userName': 'Female', 'assessmentTable': 'Greece', 'deservingDegreesTo': 0, 'deservingDegreesFrom': 0 }
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
