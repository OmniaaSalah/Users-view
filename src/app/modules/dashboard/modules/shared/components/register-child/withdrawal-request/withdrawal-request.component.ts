import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.scss']
})
export class WithdrawalRequestComponent implements OnInit {
  @Input()student
  constructor() { }

  ngOnInit(): void {
  }

}
