import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AnnualHoliday } from 'src/app/core/Models/annual-holiday';
import { AnnualHolidayService } from 'src/app/core/services/Annual-Holiday Service/annual-holiday.service';

@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit {

  Homeicon = faHome  ;
  righticon=faArrowRight;
  currentHolidayid:number=0;
  newHoliday:AnnualHoliday={} as AnnualHoliday;
  currentHoliday:AnnualHoliday|undefined=undefined;
  constructor(private  AnnualHolidayAPIservice:AnnualHolidayService,private router:Router,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

      //uncomment this when api exist
    // this.getcurrentholidayid();
  }
  getcurrentholidayid(){
    this.activatedroute.paramMap.subscribe(param=>{
      this. currentHolidayid=Number(param.get('SID'));
      if(this.currentHolidayid!=0&&this.currentHolidayid.toString()!='')
      {this.getHoliday();}
    });
  }
  getHoliday(){
    this.AnnualHolidayAPIservice.getHolidayByID(this.currentHolidayid).subscribe(Holidaylist=>{this. newHoliday=Holidaylist});
  }
  SaveHoliday(Holiday:AnnualHoliday)
  {
    if(this.currentHolidayid==0||this.currentHolidayid.toString()=='')
     {console.log('Newwwwwwwwww');
       if(confirm("Are you sure to Add "+Holiday?.name))
       // dont fordet to navigate to needed page
       {this.AnnualHolidayAPIservice.AddProduct(this. newHoliday).subscribe(pro=>{this.router.navigate([''])});}
      }
     else
     {console.log('edittttttttt');
     if(confirm("Are you sure to Update "))
      {
        this.AnnualHolidayAPIservice.EditProduct(Holiday,this.currentHolidayid).subscribe(pro=>{this.router.navigate([''])});}
     }

  }
 
  

}
