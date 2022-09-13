import { Injectable } from '@angular/core';
import { Assesment } from 'src/app/core/models/assesment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  AssessmentList: Assesment[] = [];
  cities: string[];
  constructor() {
    this.AssessmentList = [
      { 'MaximumDegree': 1, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(815) 6180492', 'AssesmentName': 'ccornau0@bigcartel.com', 'UserName': 'Female', 'AssessmentTable': 'Somalia', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 2, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(507) 3119958', 'AssesmentName': 'eelsmore1@goo.gl', 'UserName': 'Male', 'AssessmentTable': 'United States', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 3, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(478) 7181722', 'AssesmentName': 'aelldred2@archive.org', 'UserName': 'Female', 'AssessmentTable': 'Russia', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 4, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(698) 4411762', 'AssesmentName': 'ameachem3@columbia.edu', 'UserName': 'Female', 'AssessmentTable': 'China', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 5, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(345) 6582965', 'AssesmentName': 'jhadwen4@vkontakte.ru', 'UserName': 'Male', 'AssessmentTable': 'Mongolia', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 6, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(659) 9557733', 'AssesmentName': 'rwainscoat5@thetimes.co.uk', 'UserName': 'Male', 'AssessmentTable': 'Bhutan', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 7, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(864) 2101861', 'AssesmentName': 'mbraddock6@yellowbook.com', 'UserName': 'Male', 'AssessmentTable': 'Peru', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 8, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(165) 5814372', 'AssesmentName': 'jcrotty7@opensource.org', 'UserName': 'Male', 'AssessmentTable': 'Niger', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 9, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(428) 2282928', 'AssesmentName': 'mbraker8@yahoo.co.jp', 'UserName': 'Female', 'AssessmentTable': 'Argentina', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 10, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(673) 5170425', 'AssesmentName': 'bbosman9@google.co.jp', 'UserName': 'Female', 'AssessmentTable': 'Greece', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 11, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(978) 8885907', 'AssesmentName': 'drowlandsa@slate.com', 'UserName': 'Female', 'AssessmentTable': 'Indonesia', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 12, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(956) 9360112', 'AssesmentName': 'nkeetsb@canalblog.com', 'UserName': 'Female', 'AssessmentTable': 'Finland', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 13, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(240) 7150720', 'AssesmentName': 'sbussenc@so-net.ne.jp', 'UserName': 'Female', 'AssessmentTable': 'Philippines', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 14, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(416) 4076124', 'AssesmentName': 'adriversd@com.com', 'UserName': 'Male', 'AssessmentTable': 'Bosnia and Herzegovina', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 15, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(262) 7945277', 'AssesmentName': 'cbalasine@blogger.com', 'UserName': 'Female', 'AssessmentTable': 'Bolivia', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 16, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(501) 3984600', 'AssesmentName': 'cbarrickf@t-online.de', 'UserName': 'Female', 'AssessmentTable': 'China', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 17, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(718) 4157883', 'AssesmentName': 'itreweelag@tripod.com', 'UserName': 'Male', 'AssessmentTable': 'Finland', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 18, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(213) 5730967', 'AssesmentName': 'ygeorgeoth@360.cn', 'UserName': 'Male', 'AssessmentTable': 'Portugal', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 19, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(349) 6453938', 'AssesmentName': 'hpalffreyi@nba.com', 'UserName': 'Female', 'AssessmentTable': 'Madagascar', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 },
      { 'MaximumDegree': 20, 'Assessment': '', 'MinmumDegree': 0, 'Status': '', 'CreatedDate': '(474) 3068249', 'AssesmentName': 'gmordonj@uiuc.edu', 'UserName': 'Female', 'AssessmentTable': 'Greece', 'DeservingDegreesTo': 0, 'DeservingDegreesFrom': 0 }
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
