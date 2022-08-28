import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserEnum } from 'src/app/shared/enums/user.enum';

@Component({
  selector: 'app-current-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  userType= UserEnum.U_SHARJAH_AUTHORITY

  get userEnum() { return UserEnum}

  
  constructor() { }

  ngOnInit(): void {
  }

}
