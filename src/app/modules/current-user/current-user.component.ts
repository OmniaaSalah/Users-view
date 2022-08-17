import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserEnum } from 'src/app/shared/enums/user.enum';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurrentUserComponent implements OnInit {

  userType= UserEnum.U_SHARJAH_AUTHORITY

  get userEnum() { return UserEnum}

  
  constructor() { }

  ngOnInit(): void {
  }

}
