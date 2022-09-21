import { Injectable } from '@angular/core';
import { IUserRoles } from 'src/app/core/Models/iuser-role';


@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  userRolesList: IUserRoles[] = [];
  cities: string[];
  constructor() {

    this.userRolesList = [
      { 'roleUsers': 1, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(815) 6180492', 'status': 'ccornau0@bigcartel.com', 'jobRoleName': 'Female', 'userName': 'Somalia' },
      { 'roleUsers': 2, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(507) 3119958', 'status': 'eelsmore1@goo.gl', 'jobRoleName': 'Male', 'userName': 'United States' },
      { 'roleUsers': 3, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(478) 7181722', 'status': 'aelldred2@archive.org', 'jobRoleName': 'Female', 'userName': 'Russia' },
      { 'roleUsers': 4, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(698) 4411762', 'status': 'ameachem3@columbia.edu', 'jobRoleName': 'Female', 'userName': 'China' },
      { 'roleUsers': 5, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(345) 6582965', 'status': 'jhadwen4@vkontakte.ru', 'jobRoleName': 'Male', 'userName': 'Mongolia' },
      { 'roleUsers': 6, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(659) 9557733', 'status': 'rwainscoat5@thetimes.co.uk', 'jobRoleName': 'Male', 'userName': 'Bhutan' },
      { 'roleUsers': 7, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(864) 2101861', 'status': 'mbraddock6@yellowbook.com', 'jobRoleName': 'Male', 'userName': 'Peru' },
      { 'roleUsers': 8, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(165) 5814372', 'status': 'jcrotty7@opensource.org', 'jobRoleName': 'Male', 'userName': 'Niger' },
      { 'roleUsers': 9, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(428) 2282928', 'status': 'mbraker8@yahoo.co.jp', 'jobRoleName': 'Female', 'userName': 'Argentina' },
      { 'roleUsers': 10, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(673) 5170425', 'status': 'bbosman9@google.co.jp', 'jobRoleName': 'Female', 'userName': 'Greece' },
      { 'roleUsers': 11, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(978) 8885907', 'status': 'drowlandsa@slate.com', 'jobRoleName': 'Female', 'userName': 'Indonesia' },
      { 'roleUsers': 12, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(956) 9360112', 'status': 'nkeetsb@canalblog.com', 'jobRoleName': 'Female', 'userName': 'Finland' },
      { 'roleUsers': 13, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(240) 7150720', 'status': 'sbussenc@so-net.ne.jp', 'jobRoleName': 'Female', 'userName': 'Philippines' },
      { 'roleUsers': 14, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(416) 4076124', 'status': 'adriversd@com.com', 'jobRoleName': 'Male', 'userName': 'Bosnia and Herzegovina' },
      { 'roleUsers': 15, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(262) 7945277', 'status': 'cbalasine@blogger.com', 'jobRoleName': 'Female', 'userName': 'Bolivia' },
      { 'roleUsers': 16, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(501) 3984600', 'status': 'cbarrickf@t-online.de', 'jobRoleName': 'Female', 'userName': 'China' },
      { 'roleUsers': 17, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(718) 4157883', 'status': 'itreweelag@tripod.com', 'jobRoleName': 'Male', 'userName': 'Finland' },
      { 'roleUsers': 18, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(213) 5730967', 'status': 'ygeorgeoth@360.cn', 'jobRoleName': 'Male', 'userName': 'Portugal' },
      { 'roleUsers': 19, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(349) 6453938', 'status': 'hpalffreyi@nba.com', 'jobRoleName': 'Female', 'userName': 'Madagascar' },
      { 'roleUsers': 20, 'description': "", 'rolePowers': "", 'dataRestrictionLevel': '', 'createdDate': '(474) 3068249', 'status': 'gmordonj@uiuc.edu', 'jobRoleName': 'Female', 'userName': 'Greece' }
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
