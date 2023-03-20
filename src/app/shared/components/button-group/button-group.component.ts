import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  @Input() items:any[]
  @Output() onClick =new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    let index = this.items.findIndex(el=> el.active)
    if(index > -1) this.setActive(index)
    // else this.setActive(0)

  }

  setActive(index){
    this.resetActive()
    this.items[index].active= true
    this.onClick.emit(this.items[index].value)
  }

  resetActive(){
    this.items.forEach(el => {
      el.active =false
    });
  }
}
