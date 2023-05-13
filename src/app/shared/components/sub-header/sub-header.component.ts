import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  @Input() title =''
  @Input() label
  @Input() img =''


  constructor() { }

  ngOnInit(): void {
  }

}
