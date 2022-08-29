import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {

  header:string;
items: MenuItem[];
  home: MenuItem;
  constructor(private headerService:HeaderService) { }

  ngOnInit(): void {
    this.header=this.headerService.header;
    this.items=this.headerService.items;
    this.home=this.headerService.home;

  }

}
