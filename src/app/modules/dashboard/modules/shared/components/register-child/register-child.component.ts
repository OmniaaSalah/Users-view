import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';
import { StudentsService } from '../../../students/services/students/students.service';
import { RegisterChildService } from '../../services/register-child/register-child.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit, AfterViewInit,OnDestroy {
  // @Input('student') student
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Output() onEdit = new EventEmitter()
  @ViewChild('nav') nav: ElementRef

  step
  navListLength=1
	hideNavControl:boolean= true;

  get permissionEnum(){ return PermissionsEnum }


    // << DATA PLACEHOLDER >> //
  student=
  {
    name:'محمد على',
    age: 15,
    regestered: true,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school:'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation:'ابن الاخ',
    src:'assets/images/avatar.png'
  }


  constructor(
    private fb:FormBuilder,
    private studentsService: StudentsService,
    public childService:RegisterChildService) { }

    onEditMode


  ngOnInit(): void {
    this.childService.onEditMode$.subscribe(res=>{
      this.onEditMode = res ? true : false
    })
  }

  ngAfterViewInit() {
		this.setActiveTab(0)
	}
	
	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(nodeIndex?){
		let navItemsList =this.nav.nativeElement.children
    
		if(nodeIndex == 0){
			navItemsList[nodeIndex].classList.add('active')
			this.navListLength = navItemsList.length
      if(navItemsList[0].dataset.step) this.step = navItemsList[0].dataset.step
      else this.step = 1
		}
	}


	scrollLeft(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft - 175, behavior:'smooth'})
		this.hideNavControl = false;
	}

	scrollRight(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft + 175, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;

	}

  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }

}
