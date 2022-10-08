import { faHome, faFilter, faSearch, faAngleLeft, faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';

import { IHeader } from 'src/app/core/Models/iheader';


export class SchoolListModel {
  
    faHome = faHome;
    faFilter = faFilter;
    faSearch = faSearch;
    faCoffee = faHouse;
    faAngleLeft = faAngleLeft;
    faAngleRight = faAngleRight;
    userAppData: any;
    appUserCount1: any;
    appUserCount2: any;
    appUserCount3: any;
    appUserCount4: any;
    appUserCount5: any;
    userLabel: any;
  
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
}

