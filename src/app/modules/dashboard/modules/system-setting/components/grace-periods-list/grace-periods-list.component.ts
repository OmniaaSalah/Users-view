import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-grace-periods-list',
  templateUrl: './grace-periods-list.component.html',
  styleUrls: ['./grace-periods-list.component.scss']
})
export class GracePeriodsListComponent implements OnInit {


  Items: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]

  
  filtration={...Filtration}
  paginationState= {...paginationInitialState}
  periods={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
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

    ]
  constructor(
    private translate:TranslateService,
    private router:Router,
    private settingService:SettingsService) { }

  ngOnInit(): void {
    this.getGracePeriodsList()
  }

  

  getGracePeriodsList(){
    this.periods.list=[]
    this.periods.loading=true
    this.settingService.getGracePeriodList(this.filtration).subscribe(res =>{
      this.periods.list = res.result.data
      this.periods.total = res.result.total
      this.periods.loading=false

    },err =>{
      this.periods.loading=false
    })
  }

  editGracePeriod(){
    this.router.navigate(['/dashboard/manager-tools/settings/grace-period/',2,'/edit'])
  }

}
