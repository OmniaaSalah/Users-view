import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss']
})
export class ChildrenListComponent implements OnInit {

  faChevronLeft=faChevronLeft

	items: MenuItem[]=[
		{label:'اولياء الامور'},
		{label:'قائمه الابناء'},
	];


  students=[
    {
      name:'محمد على',
      age: 15,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school:'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation:'ابن الاخ',
      src:'assets/images/avatar.svg'
    },
    {
      name:'محمد على',
      age: 12,
      regestered: false,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school:'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation:'ابن الاخ',
      src:'assets/images/avatar.svg'

    },
    {
      name:'محمد على',
      age: 13,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school:'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation:'ابن الاخ',
      src:'assets/images/avatar.svg'
    },
    {
      name:'محمد على',
      age: 12,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school:'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation:'ابن الاخ',
      src:'assets/images/avatar.svg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
