import { Injectable } from '@angular/core';
import { iuserroles } from 'src/app/core/Models/iuser-role';


@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  userRolesList: iuserroles[] = [];
  cities: string[];
  constructor() {

    this.userRolesList = [
      { 'roleusers': 1, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(815) 6180492', 'status': 'ccornau0@bigcartel.com', 'jobrolename': 'Female', 'username': 'Somalia' },
      { 'roleusers': 2, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(507) 3119958', 'status': 'eelsmore1@goo.gl', 'jobrolename': 'Male', 'username': 'United States' },
      { 'roleusers': 3, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(478) 7181722', 'status': 'aelldred2@archive.org', 'jobrolename': 'Female', 'username': 'Russia' },
      { 'roleusers': 4, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(698) 4411762', 'status': 'ameachem3@columbia.edu', 'jobrolename': 'Female', 'username': 'China' },
      { 'roleusers': 5, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(345) 6582965', 'status': 'jhadwen4@vkontakte.ru', 'jobrolename': 'Male', 'username': 'Mongolia' },
      { 'roleusers': 6, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(659) 9557733', 'status': 'rwainscoat5@thetimes.co.uk', 'jobrolename': 'Male', 'username': 'Bhutan' },
      { 'roleusers': 7, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(864) 2101861', 'status': 'mbraddock6@yellowbook.com', 'jobrolename': 'Male', 'username': 'Peru' },
      { 'roleusers': 8, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(165) 5814372', 'status': 'jcrotty7@opensource.org', 'jobrolename': 'Male', 'username': 'Niger' },
      { 'roleusers': 9, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(428) 2282928', 'status': 'mbraker8@yahoo.co.jp', 'jobrolename': 'Female', 'username': 'Argentina' },
      { 'roleusers': 10, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(673) 5170425', 'status': 'bbosman9@google.co.jp', 'jobrolename': 'Female', 'username': 'Greece' },
      { 'roleusers': 11, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(978) 8885907', 'status': 'drowlandsa@slate.com', 'jobrolename': 'Female', 'username': 'Indonesia' },
      { 'roleusers': 12, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(956) 9360112', 'status': 'nkeetsb@canalblog.com', 'jobrolename': 'Female', 'username': 'Finland' },
      { 'roleusers': 13, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(240) 7150720', 'status': 'sbussenc@so-net.ne.jp', 'jobrolename': 'Female', 'username': 'Philippines' },
      { 'roleusers': 14, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(416) 4076124', 'status': 'adriversd@com.com', 'jobrolename': 'Male', 'username': 'Bosnia and Herzegovina' },
      { 'roleusers': 15, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(262) 7945277', 'status': 'cbalasine@blogger.com', 'jobrolename': 'Female', 'username': 'Bolivia' },
      { 'roleusers': 16, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(501) 3984600', 'status': 'cbarrickf@t-online.de', 'jobrolename': 'Female', 'username': 'China' },
      { 'roleusers': 17, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(718) 4157883', 'status': 'itreweelag@tripod.com', 'jobrolename': 'Male', 'username': 'Finland' },
      { 'roleusers': 18, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(213) 5730967', 'status': 'ygeorgeoth@360.cn', 'jobrolename': 'Male', 'username': 'Portugal' },
      { 'roleusers': 19, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(349) 6453938', 'status': 'hpalffreyi@nba.com', 'jobrolename': 'Female', 'username': 'Madagascar' },
      { 'roleusers': 20, 'description': "", 'rolepowers': "", 'datarestrictionlevel': '', 'createddate': '(474) 3068249', 'status': 'gmordonj@uiuc.edu', 'jobrolename': 'Female', 'username': 'Greece' }
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
