import { Injectable } from '@angular/core';
import { isubject } from 'src/app/core/Models/isubject';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjectsList: isubject[] = [];
  cities: string[];
  constructor() {
    this.subjectsList = [
      { 'id': 1, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Clare Cornau', 'phoneno': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'gender': 'Female', 'nationality': 'Somalia' },
      { 'id': 2, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Edouard Elsmore', 'phoneno': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'gender': 'Male', 'nationality': 'United States' },
      { 'id': 3, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Aeriel Elldred', 'phoneno': '(478) 7181722', 'email': 'aelldred2@archive.org', 'gender': 'Female', 'nationality': 'Russia' },
      { 'id': 4, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Abagael Meachem', 'phoneno': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'gender': 'Female', 'nationality': 'China' },
      { 'id': 5, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Jeremiah Hadwen', 'phoneno': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'gender': 'Male', 'nationality': 'Mongolia' },
      { 'id': 6, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Rollin Wainscoat', 'phoneno': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'gender': 'Male', 'nationality': 'Bhutan' },
      { 'id': 7, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Micah Braddock', 'phoneno': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'gender': 'Male', 'nationality': 'Peru' },
      { 'id': 8, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Jayme Crotty', 'phoneno': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'gender': 'Male', 'nationality': 'Niger' },
      { 'id': 9, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Margo Braker', 'phoneno': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'gender': 'Female', 'nationality': 'Argentina' },
      { 'id': 10, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Bertie Bosman', 'phoneno': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'gender': 'Female', 'nationality': 'Greece' },
      { 'id': 11, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Darelle Rowlands', 'phoneno': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'gender': 'Female', 'nationality': 'Indonesia' },
      { 'id': 12, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Neile Keets', 'phoneno': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'gender': 'Female', 'nationality': 'Finland' },
      { 'id': 13, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Shari Bussen', 'phoneno': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'gender': 'Female', 'nationality': 'Philippines' },
      { 'id': 14, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Arron Drivers', 'phoneno': '(416) 4076124', 'email': 'adriversd@com.com', 'gender': 'Male', 'nationality': 'Bosnia and Herzegovina' },
      { 'id': 15, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Carola Balasin', 'phoneno': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'gender': 'Female', 'nationality': 'Bolivia' },
      { 'id': 16, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Clarinda Barrick', 'phoneno': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'gender': 'Female', 'nationality': 'China' },
      { 'id': 17, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Inglis Treweela', 'phoneno': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'gender': 'Male', 'nationality': 'Finland' },
      { 'id': 18, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Yardley Georgeot', 'phoneno': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'gender': 'Male', 'nationality': 'Portugal' },
      { 'id': 19, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Hestia Palffrey', 'phoneno': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'gender': 'Female', 'nationality': 'Madagascar' },
      { 'id': 20, 'subjectnameinarabic': '', 'subjectnameinenglish': '', 'nameinresultsscreeninarabic': '', 'nameinresultsscreeninenglish': '', 'subjecthours': 0, 'numberofsessionsperweek': 0, 'gpa': '', 'evaluationsystem': '', 'name': 'Gwendolyn Mordon', 'phoneno': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'gender': 'Female', 'nationality': 'Greece' }
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
