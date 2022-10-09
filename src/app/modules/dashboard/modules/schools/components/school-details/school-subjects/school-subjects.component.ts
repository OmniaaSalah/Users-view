import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { GradesService } from '../../../services/grade/class.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-subjects',
  templateUrl: './school-subjects.component.html',
  styleUrls: ['./school-subjects.component.scss']
})
export class SchoolSubjectsComponent implements OnInit {

  @Input('subjects') subjects=[]
  first = 0
  rows = 4

  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration, grade:"", track:""}

  constructor(
    private schoolsService:SchoolsService,
    private route: ActivatedRoute,
    private gradesService:GradesService,
    ) { }

  ngOnInit(): void {

    this.getSubjects()
  }


  getSubjects(){
    this.schoolsService.getSchoolSubjects(this.schoolId, this.filtration).subscribe()
  }

  
  getSchoolClasses(){
    this.gradesService.getAllClasses(this.schoolId,this.filtration).subscribe()
  }

  getTracks(schoolId){
    this.gradesService.getGradeTracks(schoolId).subscribe()
  }


  onSort(e){
    console.log(e);
    this.filtration.SortBy
    this.filtration.SortColumn = e.field
    this.filtration.SortDirection = e.order
    this.getSubjects()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getSubjects()
  }


  onExport(fileType: FileEnum, table:Table){
    // this.exportService.exportFile(fileType, table, this.subjects)
  }

  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

    this.filtration.Page = event.page
    this.getSubjects()

  }

}
