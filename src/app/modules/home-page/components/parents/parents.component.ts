import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/classes/filtration';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

  faChevronLeft = faChevronLeft
  parentsModelOpened = false
  swipperData = [
    {
      "previewImageSrc": "assets/images/home/swipper.png",
      "thumbnailImageSrc": "assets/images/home/swipper.png",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": "assets/images/home/swipper.png",
      "thumbnailImageSrc": "assets/images/home/swipper.png",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": "assets/images/home/swipper.png",
      "thumbnailImageSrc": "assets/images/home/swipper.png",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
  ]

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  students = [
    {
      name: 'محمد على',
      age: 15,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'
    },
    {
      name: 'محمد على',
      age: 12,
      regestered: false,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'

    },
    {
      name: 'محمد على',
      age: 13,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'
    },
    {
      name: 'محمد على',
      age: 12,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'
    }
  ]

  firtaration = { ...Filtration }

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {
  }
  openChildModel() {
    this.parentsModelOpened = true
  }
  changedirection(){
    this.router.navigateByUrl("AddChild/Addchild-WithNationality")
  }
}
