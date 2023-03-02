import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  baseStep ={ar:'إرسال الطلب', en:'Send Request'}
  @Input() steps=[]

  constructor() { }

  ngOnInit(): void {
  }

}
