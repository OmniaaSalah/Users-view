import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent-reply-survey',
  templateUrl: './parent-reply-survey.component.html',
  styleUrls: ['./parent-reply-survey.component.scss']
})
export class ParentReplySurveyComponent implements OnInit {

  selectedCategories: any[] = ['Technology', 'Sports'];
  categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
  checked: boolean = false;
  constructor( private formbuilder:FormBuilder,) { }
  parentForm = this.formbuilder.group({
    title: ['', [Validators.required,Validators.maxLength(32)]],
    description: ['', [Validators.required,Validators.maxLength(512)]],
    messageType: ['', [Validators.required]],
    switch2: [false, [Validators.required]],
  })
  ngOnInit(): void {
    this.selectedCategories = this.categories.slice(1,3);

  }
  sendMessage(){}
}
