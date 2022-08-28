import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {

  breadCrump: MenuItem[];
  home: MenuItem;
  mainTittle:string;
  constructor(private headerService:HeaderService) { }

  ngOnInit(): void {
    this.breadCrump=this.headerService.breadCrump;
    this.home=this.headerService.home;
    this.mainTittle=this.headerService.mainTittle;

  }

}
