import { Component, Input, OnInit } from '@angular/core';
import { StatusEnum } from '../../enums/status/status.enum';

@Component({
  selector: 'app-student-badges',
  templateUrl: './student-badges.component.html',
  styleUrls: ['./student-badges.component.scss']
})
export class StudentBadgesComponent implements OnInit {
  @Input('isGifted') isGifted:boolean=false;
  @Input('isTopStudent')  isTopStudent:boolean=false;
  @Input('studentCategory')   studentCategory:string[]=[];

  get statusEnum() {return StatusEnum}

  constructor() { }

  ngOnInit(): void {
  }

}
