import { Injectable } from '@angular/core';
import { UserRoles } from 'src/app/core/models/user-roles';


@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  UserRolesList: UserRoles[] = [];
  cities: string[];
  constructor() {

    this.UserRolesList = [
      { 'RoleUsers': 1, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(815) 6180492', 'Status': 'ccornau0@bigcartel.com', 'JobRoleName': 'Female', 'UserName': 'Somalia' },
      { 'RoleUsers': 2, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(507) 3119958', 'Status': 'eelsmore1@goo.gl', 'JobRoleName': 'Male', 'UserName': 'United States' },
      { 'RoleUsers': 3, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(478) 7181722', 'Status': 'aelldred2@archive.org', 'JobRoleName': 'Female', 'UserName': 'Russia' },
      { 'RoleUsers': 4, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(698) 4411762', 'Status': 'ameachem3@columbia.edu', 'JobRoleName': 'Female', 'UserName': 'China' },
      { 'RoleUsers': 5, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(345) 6582965', 'Status': 'jhadwen4@vkontakte.ru', 'JobRoleName': 'Male', 'UserName': 'Mongolia' },
      { 'RoleUsers': 6, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(659) 9557733', 'Status': 'rwainscoat5@thetimes.co.uk', 'JobRoleName': 'Male', 'UserName': 'Bhutan' },
      { 'RoleUsers': 7, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(864) 2101861', 'Status': 'mbraddock6@yellowbook.com', 'JobRoleName': 'Male', 'UserName': 'Peru' },
      { 'RoleUsers': 8, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(165) 5814372', 'Status': 'jcrotty7@opensource.org', 'JobRoleName': 'Male', 'UserName': 'Niger' },
      { 'RoleUsers': 9, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(428) 2282928', 'Status': 'mbraker8@yahoo.co.jp', 'JobRoleName': 'Female', 'UserName': 'Argentina' },
      { 'RoleUsers': 10, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(673) 5170425', 'Status': 'bbosman9@google.co.jp', 'JobRoleName': 'Female', 'UserName': 'Greece' },
      { 'RoleUsers': 11, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(978) 8885907', 'Status': 'drowlandsa@slate.com', 'JobRoleName': 'Female', 'UserName': 'Indonesia' },
      { 'RoleUsers': 12, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(956) 9360112', 'Status': 'nkeetsb@canalblog.com', 'JobRoleName': 'Female', 'UserName': 'Finland' },
      { 'RoleUsers': 13, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(240) 7150720', 'Status': 'sbussenc@so-net.ne.jp', 'JobRoleName': 'Female', 'UserName': 'Philippines' },
      { 'RoleUsers': 14, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(416) 4076124', 'Status': 'adriversd@com.com', 'JobRoleName': 'Male', 'UserName': 'Bosnia and Herzegovina' },
      { 'RoleUsers': 15, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(262) 7945277', 'Status': 'cbalasine@blogger.com', 'JobRoleName': 'Female', 'UserName': 'Bolivia' },
      { 'RoleUsers': 16, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(501) 3984600', 'Status': 'cbarrickf@t-online.de', 'JobRoleName': 'Female', 'UserName': 'China' },
      { 'RoleUsers': 17, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(718) 4157883', 'Status': 'itreweelag@tripod.com', 'JobRoleName': 'Male', 'UserName': 'Finland' },
      { 'RoleUsers': 18, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(213) 5730967', 'Status': 'ygeorgeoth@360.cn', 'JobRoleName': 'Male', 'UserName': 'Portugal' },
      { 'RoleUsers': 19, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(349) 6453938', 'Status': 'hpalffreyi@nba.com', 'JobRoleName': 'Female', 'UserName': 'Madagascar' },
      { 'RoleUsers': 20, 'Description': "", 'RolePowers': "", 'DataRestrictionLevel': '', 'CreatedDate': '(474) 3068249', 'Status': 'gmordonj@uiuc.edu', 'JobRoleName': 'Female', 'UserName': 'Greece' }
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
