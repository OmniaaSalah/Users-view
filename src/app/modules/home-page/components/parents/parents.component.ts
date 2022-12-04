import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/classes/filtration';
import { AddChildService } from 'src/app/modules/parents/services/add-child.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {
  navigatedRouter:string = ''
  @ViewChild('withId', { read: ElementRef, static:false }) withId: ElementRef;
  @ViewChild('withoutId', { read: ElementRef, static:false }) withoutId: ElementRef;

  faChevronLeft = faChevronLeft
  parentsModelOpened = false
  // swipperData = [
  //   {
  //     "previewImageSrc": "assets/images/home/swipper.png",
  //     "thumbnailImageSrc": "assets/images/home/swipper.png",
  //     "alt": "Description for Image 1",
  //     "title": "Title 1"
  //   },
  //   {
  //     "previewImageSrc": "assets/images/home/swipper.png",
  //     "thumbnailImageSrc": "assets/images/home/swipper.png",
  //     "alt": "Description for Image 1",
  //     "title": "Title 1"
  //   },
  //   {
  //     "previewImageSrc": "assets/images/home/swipper.png",
  //     "thumbnailImageSrc": "assets/images/home/swipper.png",
  //     "alt": "Description for Image 1",
  //     "title": "Title 1"
  //   },
  // ]

  // responsiveOptions: any[] = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 5
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 3
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1
  //   }
  // ];

  registerStudents = []
  unRegisterStudents = []

  // firtaration = { ...Filtration }

  constructor(private router: Router,private child:AddChildService) { }

  ngOnInit(): void {
    this.getChildren()
  }
  
  getChildren(){
    this.child.getParentsChild().subscribe(res=>{
      this.unRegisterStudents = res.children
      this.registerStudents = res.students
      console.log(this.unRegisterStudents);
    })
    
  }

  openChildModel() {
    this.parentsModelOpened = true
  }
  changedirection(){
    this.router.navigate([this.navigatedRouter])
  }

  checkwithId(){
    this.withoutId.nativeElement.classList.remove('activeBtn')
    this.withId.nativeElement.classList.add('activeBtn')
    this.navigatedRouter = '/parent/AddChild/Addchild-WithNationality'
  }
  checkwithoutId(){
    this.withId.nativeElement.classList.remove('activeBtn')
    this.withoutId.nativeElement.classList.add('activeBtn')
    this.navigatedRouter = '/parent/AddChild/Addchild-WithoutNationality'
  }
  cancel(){
    this.navigatedRouter = ''
  }



}
