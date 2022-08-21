import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})
export class InputSwitchComponent implements OnInit {

  @Input('label') label:string 
  @Input('for') for:string 
  
  constructor() { }

  ngOnInit(): void {
  }
  checked= false
  onChecked(input){
    
    this.checked= input
    console.log(this.checked);
    
  }
}
