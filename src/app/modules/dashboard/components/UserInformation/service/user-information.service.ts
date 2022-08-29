import { Injectable } from '@angular/core';
import { User } from 'src/app/core/Models/user';


@Injectable({
 providedIn: 'root'
})
export class UserInformationService {

  UsersList:User[]=[];
  constructor() {   this.UsersList= [
    { 'id': 1,'fullName': 'Clare Cornau', 'mobile': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'lastUpdated': 'Female', 'PrivateRole': 'Somalia','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" },
    { 'id': 2, 'fullName': 'Edouard Elsmore', 'mobile': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'lastUpdated': 'Male', 'PrivateRole': 'United States','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" },
    { 'id': 3, 'fullName': 'Aeriel Elldred', 'mobile': '(478) 7181722', 'email': 'aelldred2@archive.org', 'lastUpdated': 'Female', 'PrivateRole': 'Russia' ,'NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" },
    { 'id': 4, 'fullName': 'Abagael Meachem', 'mobile': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'lastUpdated': 'Female', 'PrivateRole': 'China','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 5, 'fullName': 'Jeremiah Hadwen', 'mobile': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'lastUpdated': 'Male', 'PrivateRole': 'Mongolia','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 6, 'fullName': 'Rollin Wainscoat', 'mobile': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'lastUpdated': 'Male', 'PrivateRole': 'Bhutan','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 7, 'fullName': 'Micah Braddock', 'mobile': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'lastUpdated': 'Male', 'PrivateRole': 'Peru' ,'NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" },
    { 'id': 8, 'fullName': 'Jayme Crotty', 'mobile': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'lastUpdated': 'Male', 'PrivateRole': 'Niger','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 9, 'fullName': 'Margo Braker', 'mobile': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'lastUpdated': 'Female', 'PrivateRole': 'Argentina','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 10, 'fullName': 'Bertie Bosman', 'mobile': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'lastUpdated': 'Female', 'PrivateRole': 'Greece' ,'NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" },
    { 'id': 11, 'fullName': 'Darelle Rowlands', 'mobile': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'lastUpdated': 'Female', 'PrivateRole': 'Indonesia' ,'NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" },
    { 'id': 12, 'fullName': 'Neile Keets', 'mobile': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'lastUpdated': 'Female', 'PrivateRole': 'Finland','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 13, 'fullName': 'Shari Bussen', 'mobile': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'lastUpdated': 'Female', 'PrivateRole': 'Philippines','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 14, 'fullName': 'Arron Drivers', 'mobile': '(416) 4076124', 'email': 'adriversd@com.com', 'lastUpdated': 'Male', 'PrivateRole': 'Bosnia and Herzegovina','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 15, 'fullName': 'Carola Balasin', 'mobile': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'lastUpdated': 'Female', 'PrivateRole': 'Bolivia','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 16, 'fullName': 'Clarinda Barrick', 'mobile': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'lastUpdated': 'Female', 'PrivateRole': 'China' ,'NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" },
    { 'id': 17, 'fullName': 'Inglis Treweela', 'mobile': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'lastUpdated': 'Male', 'PrivateRole': 'Finland','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 18, 'fullName': 'Yardley Georgeot', 'mobile': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'lastUpdated': 'Male', 'PrivateRole': 'Portugal','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 19, 'fullName': 'Hestiaalffrey', 'mobile': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'lastUpdated': 'Female', 'PrivateRole': 'Madagascar','NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':""  },
    { 'id': 20, 'fullName': 'Gwendolyn Mordon', 'mobile': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'lastUpdated': 'Female', 'PrivateRole': 'Greece' ,'NickName':"",'UserStatus':"",'Password':"",'IdentificationNumber':"" }
  ]; }
}
