import { Component, OnInit } from '@angular/core';
import { faAngleRight, faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { IHeader } from 'src/app/core/Models/iheader';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  // << ICONS >> //
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown

 
  isCollapsed=false

  // << HRADER DATA >> //
  componentHeaderData: IHeader={
		breadCrump: [
      {label:'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students'},
		],
	}

	items: MenuItem[]=[
		{label: this.translate.instant('dashboard.students.veiwStudentDetails'), icon:'assets/images/shared/user.svg',routerLink:'student/5'},
		{label: this.translate.instant('dashboard.students.transferStudentToAnotherSchool'), icon:'assets/images/shared/student.svg',routerLink:'student/5/transfer'},

    {label: this.translate.instant('dashboard.students.sendStudentDeleteRequest'), icon:'assets/images/shared/delete.svg',routerLink:'delete-student/5'},
		{label: this.translate.instant('dashboard.students.defineMedicalFile'), icon:'assets/images/shared/edit.svg',routerLink:'student/5/transfer'},

		{label: this.translate.instant('dashboard.students.sendRepeateStudyPhaseReqest'), icon:'assets/images/shared/file.svg',routerLink:'delete-student/5'},

    {label: this.translate.instant('dashboard.students.editStudentInfo'), icon:'assets/images/shared/list.svg',routerLink:'delete-student/5'},
		{label: this.translate.instant('dashboard.students.sendRequestToEditPersonalInfo'), icon:'assets/images/shared/user-badge.svg',routerLink:'delete-student/5'},
    {label: this.translate.instant('dashboard.students.transferStudentFromDivisionToDivision'), icon:'assets/images/shared/recycle.svg',routerLink:'delete-student/5'},


	];

  filteration ={...Filtration}

  // << CONDITIONS >> //
  first = 0
  rows = 8


  // << DATA PLACEHOLDER >> //
  schoolClasses:any[] =[
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue Band",
      "description": "Product Description",
      "image": "blue-band.jpg",
      "price": 79,
      "category": "Fitness",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1003",
      "code": "244wgerg2",
      "name": "Blue T-Shirt",
      "description": "Product Description",
      "image": "blue-t-shirt.jpg",
      "price": 29,
      "category": "Clothing",
      "quantity": 25,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1004",
      "code": "h456wer53",
      "name": "Bracelet",
      "description": "Product Description",
      "image": "bracelet.jpg",
      "price": 15,
      "category": "Accessories",
      "quantity": 73,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1005",
      "code": "av2231fwg",
      "name": "Brown Purse",
      "description": "Product Description",
      "image": "brown-purse.jpg",
      "price": 120,
      "category": "Accessories",
      "quantity": 0,
      "inventoryStatus": "OUTOFSTOCK",
      "rating": 4
    },
    {
      "id": "1006",
      "code": "bib36pfvm",
      "name": "Chakra Bracelet",
      "description": "Product Description",
      "image": "chakra-bracelet.jpg",
      "price": 32,
      "category": "Accessories",
      "quantity": 5,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1007",
      "code": "mbvjkgip5",
      "name": "Galaxy Earrings",
      "description": "Product Description",
      "image": "galaxy-earrings.jpg",
      "price": 34,
      "category": "Accessories",
      "quantity": 23,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
  ]



  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private studentsService: StudentsService,
    private exportService: ExportService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

    this.studentsService.getAllStudents(this.filteration).subscribe(students=>{

    })
  }

  onExport(fileType: FileEnum, table:Table){
    this.exportService.exportFile(fileType, table, this.schoolClasses)
  }

  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

  }
}
