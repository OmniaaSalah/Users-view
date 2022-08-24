import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'src/app/core/Models/subject';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { SubjectService } from 'src/app/core/services/Subject-service/subject.service';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  Homeicon = faHome  ;
  searchicon =faSearch;
  SubjectsList: Subject[]=[];
  value1: string;
  filtericon=faFilter;
  page: number = 1;
  
  tableSize: number = 7;

  constructor(private headerService:HeaderService,private router:Router,private translate:TranslateService,private subjectapiservice:SubjectService) { 
 }

  ngOnInit(): void {
    this.headerService.home = {icon: 'pi pi-home', routerLink: '/'};
    this.headerService.items = [
      {label: this.translate.instant('List Of Subjects')}
      
     
  ];
  this.headerService.header="";
    this.SubjectsList=this.subjectapiservice.SubjectsList;

  }
  gotoAddSubject()
  {
    this.router.navigate(['/dashboard/Subjects/AddNewSubject']);
  }

  onTableDataChange(event: number) {
    this.page = event;
    
  }
}
