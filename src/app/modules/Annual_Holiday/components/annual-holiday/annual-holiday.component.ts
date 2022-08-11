import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { AnnualHoliday } from 'src/app/core/Models/annual-holiday';
import { AnnualHolidayService } from 'src/app/core/services/Annual-Holiday Service/annual-holiday.service';

@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday.component.html',
  styleUrls: ['./annual-holiday.component.scss']
})
export class AnnualHolidayComponent implements OnInit {
  Arrowupicon =  faArrowUp  ;
  Arrowdownicon =  faArrowDown  ;
  Homeicon = faHome  ;
  searchicon =faSearch;
  AnnualHolidayList: AnnualHoliday[]=[];
  IDOfSpecificSchool:number=0;
  
  page: number = 1;
  
  tableSize: number = 7;

  constructor(private AnnualHolidayAPIservice:AnnualHolidayService,private router:Router,private activatedroute:ActivatedRoute,private location:Location) { 
 //Remove this static list in case Api data exist
    this.AnnualHolidayList = [
    { 'id': 1, 'name': 'Clare Cornau', 'phoneno': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'gender': 'Female', 'nationality': 'Somalia' },
    { 'id': 2, 'name': 'Edouard Elsmore', 'phoneno': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'gender': 'Male', 'nationality': 'United States' },
    { 'id': 3, 'name': 'Aeriel Elldred', 'phoneno': '(478) 7181722', 'email': 'aelldred2@archive.org', 'gender': 'Female', 'nationality': 'Russia' },
    { 'id': 4, 'name': 'Abagael Meachem', 'phoneno': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'gender': 'Female', 'nationality': 'China' },
    { 'id': 5, 'name': 'Jeremiah Hadwen', 'phoneno': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'gender': 'Male', 'nationality': 'Mongolia' },
    { 'id': 6, 'name': 'Rollin Wainscoat', 'phoneno': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'gender': 'Male', 'nationality': 'Bhutan' },
    { 'id': 7, 'name': 'Micah Braddock', 'phoneno': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'gender': 'Male', 'nationality': 'Peru' },
    { 'id': 8, 'name': 'Jayme Crotty', 'phoneno': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'gender': 'Male', 'nationality': 'Niger' },
    { 'id': 9, 'name': 'Margo Braker', 'phoneno': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'gender': 'Female', 'nationality': 'Argentina' },
    { 'id': 10, 'name': 'Bertie Bosman', 'phoneno': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'gender': 'Female', 'nationality': 'Greece' },
    { 'id': 11, 'name': 'Darelle Rowlands', 'phoneno': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'gender': 'Female', 'nationality': 'Indonesia' },
    { 'id': 12, 'name': 'Neile Keets', 'phoneno': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'gender': 'Female', 'nationality': 'Finland' },
    { 'id': 13, 'name': 'Shari Bussen', 'phoneno': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'gender': 'Female', 'nationality': 'Philippines' },
    { 'id': 14, 'name': 'Arron Drivers', 'phoneno': '(416) 4076124', 'email': 'adriversd@com.com', 'gender': 'Male', 'nationality': 'Bosnia and Herzegovina' },
    { 'id': 15, 'name': 'Carola Balasin', 'phoneno': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'gender': 'Female', 'nationality': 'Bolivia' },
    { 'id': 16, 'name': 'Clarinda Barrick', 'phoneno': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'gender': 'Female', 'nationality': 'China' },
    { 'id': 17, 'name': 'Inglis Treweela', 'phoneno': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'gender': 'Male', 'nationality': 'Finland' },
    { 'id': 18, 'name': 'Yardley Georgeot', 'phoneno': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'gender': 'Male', 'nationality': 'Portugal' },
    { 'id': 19, 'name': 'Hestia Palffrey', 'phoneno': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'gender': 'Female', 'nationality': 'Madagascar' },
    { 'id': 20, 'name': 'Gwendolyn Mordon', 'phoneno': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'gender': 'Female', 'nationality': 'Greece' }
  ];}
  ngOnInit(): void {
    
       //uncoment the below line in case api data exist
      //this.getidOfSpecificschool();
  }
  getidOfSpecificschool():void{

 
  this.activatedroute.paramMap.subscribe(param=>{
  //Put thr ParameterinURl (the id of specific school)
  this.IDOfSpecificSchool=Number(param.get('ParameterinURl'));

  this.getAllHoliday(this.IDOfSpecificSchool);

   });

  }

   getAllHoliday(schoolid:number):void{
    this.AnnualHolidayAPIservice. GetAllHolidayforschool(schoolid).subscribe(
      (response) => {
        this.AnnualHolidayList = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
   }

   onTableDataChange(event: number) {
    this.page = event;
    //uncoment the below line in case api data exist
    //this.getidOfSpecificschool();
  }

  gotoEditHoliday(Holidayid:number){
    this.router.navigate(['/AnnualHoliday/EditHoliday/',Holidayid]);
  }

  gotoAddHoliday()
  {
    this.router.navigate(['/AnnualHoliday/NewHoliday']);
  }
}
