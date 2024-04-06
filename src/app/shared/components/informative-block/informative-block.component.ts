import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informative-block',
  templateUrl: './informative-block.component.html',
  styleUrls: ['./informative-block.component.scss']
})
export class InformativeBlockComponent implements OnInit {

  @Input() title:string = 'emptyList.noData';
  @Input() subTitle:string;
  @Input() src:string ='assets/images/empty-list/empty-list.svg';
  @Input() styles ={}
  @Input() size:'sm' | 'md' | 'lg' = 'lg'

  constructor() { }

  ngOnInit(): void {
    console.log(this.title)
  }

}
