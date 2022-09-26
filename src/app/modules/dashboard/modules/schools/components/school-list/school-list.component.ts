import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { faHome, faFilter, faSearch, faAngleLeft, faAngleRight, faHouse, faRightFromBracket, faPercentage } from '@fortawesome/free-solid-svg-icons';
// import { SchoolsService } from 'src/app/core/services/schools-services/schools.service';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/iheader';
import { paginationState } from 'src/app/core/models/pagination/pagination';


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  faHome = faHome
  faFilter = faFilter
  faSearch = faSearch
  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight
  // databar: any;
  // datadoughnut: any;
  // dataline: any;
  // datapolar: any;
  // datapie:any;
  // dataradar:any;
  // datacombo: any;
  // chartOptions: any;
  public userAppData: any;
  public seconduserAppData: any;
  public appUserCount1: any;
  public appUserCount2: any;
  public appUserCount3: any;
  public appUserCount4: any;
  public appUserCount5: any;
  public userLabel: any;
  public options: any;
  public userUsageHoursData;

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه المدارس ' ,routerLink: '/dashboard/schools-and-students/schools'},
    ],
  }

  first = 0
  rows = 8


  schoolClasses: any[] = [
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

  employeeOrgData; orgCount1;
  orgCount2; orgCount3; orgCount4; orgCount5; employeeLabel: any;
  employeeJIRAHoursData;

  appUsageData = [
    { name: 'user1', country: 'USA', appname: 'app-1' },
    { name: 'user2', country: 'UK', appname: 'app-1' },
    { name: 'user3', country: 'Canada', appname: 'app-1' },
    { name: 'user4', country: 'Germany', appname: 'app-1' },
    { name: 'user5', country: 'Poland', appname: 'app-2' },
    { name: 'user6', country: 'USA', appname: 'app-2' },
    { name: 'user7', country: 'Canada', appname: 'app-2' },
    { name: 'user8', country: 'Germany', appname: 'app-3' },
    { name: 'user9', country: 'USA', appname: 'app-3' },
    { name: 'user10', country: 'Germany', appname: 'app-3' },
    { name: 'user11', country: 'Canada', appname: 'app-3' },
    { name: 'user12', country: 'USA', appname: 'app-3' },
    { name: 'user13', country: 'India', appname: 'app-3' },
    { name: 'user14', country: 'India', appname: 'app-3' },
    { name: 'user15', country: 'Canada', appname: 'app-4' },
    { name: 'user16', country: 'USA', appname: 'app-4' },
    // { name: 'user17', country: 'India', appname: 'app-5' },
    // { name: 'user18', country: 'India', appname: 'app-5' },
    { name: 'user19', country: 'Canada', appname: 'app-5' },
    { name: 'user20', country: 'USA', appname: 'app-5' },
    { name: 'user21', country: 'manager', appname: 'app-5' },
  ];


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,

  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)


    this.appUserCount1 = this.appUsageData.filter(
      (app) => app.appname === 'app-1'
    ).length;
    this.appUserCount2 = this.appUsageData.filter(
      (app) => app.appname === 'app-4'
    ).length;
    this.appUserCount3 = this.appUsageData.filter(
      (app) => app.appname === 'app-3'
    ).length;
    this.appUserCount4 = this.appUsageData.filter(
      (app) => app.appname === 'app-2'
    ).length;
    this.appUserCount5 = this.appUsageData.filter(
      (app) => app.appname === 'app-5'
    ).length;

    // this.userLabel = this.appUsageData
    //   .map((app) => app.appname)
    //   .filter((value, index, self) => self.indexOf(value) === index);

    this.userAppData = {
      labels: this.userLabel,
      datasets: [
        {
          data: [
            this.appUserCount1,
            this.appUserCount2,
            // this.appUserCount3,
            // this.appUserCount4,
            // this.appUserCount5,
          ],
          backgroundColor: [
            '#5CD0DF',
            '#F8C073',
            // '#FFFF00',
            // '#FFC0CB',
            // '#7f00ff ',
          ],
          yValueFormatString: "#,###.##'%'",
        },
      ],
    };
    this.seconduserAppData = {
      labels: this.userLabel,
      datasets: [
        {
          data: [

            this.appUserCount2,
            this.appUserCount3,
            this.appUserCount1,

            // this.appUserCount4,
            this.appUserCount5,
          ],
          backgroundColor: [
            '#CD578A',
            '#5BCEDD',
            '#F5F5F5',
            '#F8C073',
          ],
        },
      ],
    };

    this.userUsageHoursData = {
      labels: [ ''],
      datasets: [
        {
          label: '',
          backgroundColor: 'transparent',
          borderColor: '#7CB342',

          inflateAmount:0.5,
          borderwidth:7,
          borderRadius: 17 ,
          barPercentage: 0.5,
          data: [10, 5, 66],
        },
        {
          data: [30, 50, 10],
          backgroundColor: [
              '#F8C073',
              '#03A9F4',
              '#4CAF50'
          ],
          hoverBackgroundColor: [
              '#F8C073',
              '#81D4FA',
              '#A5D6A7'
          ],

          // yAxisID: 'y2',
          borderwidth:7,
          borderRadius: 13,
          barPercentage: 0.5,

            },


        {
        data: [50, 50, 10],
        backgroundColor: [
            '#CD578A',
            '#03A9F4',
            '#4CAF50'
        ],
        hoverBackgroundColor: [
            '#CD578A',
            '#81D4FA',
            '#A5D6A7'
        ],
        borderwidth:7,
        borderRadius: 13,
        barPercentage: 0.5,
        },

        {
          data: [60, 50, 30],
          backgroundColor: [
              '#5CD0DF',
              '#03A9F4',
              '#4CAF50'
          ],
          hoverBackgroundColor: [
              '#5CD0DF',
              '#81D4FA',
              '#A5D6A7'
          ],
          borderwidth:7,
          borderRadius: 13,
          barPercentage: 0.5,

        },
      ],
    };

    this.options = {
      //display labels on data elements in graph
      plugins: {

        // datalabels: {
        //   align: 'end',
        //   anchor: 'end',
        //   borderRadius: 4,
        //   backgroundColor: 'teal',
        //   drawBorder:true,
        //   color: 'white',
        //   font: {
        //     weight: 'bold',
        //   },
        // },
        // display chart title
        // title: {
        //   display: true,
        //   fontSize: 8,
        // },
        legend: {
          display:'none',
          position: 'none'
          },
          // scales: {
          //   y2: {
          //     position: 'left',

          //     beginAtZero: true,

          //   },

          //     ticks: {


          //     }

          // }
      },
    };
  }






  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

  }
}
