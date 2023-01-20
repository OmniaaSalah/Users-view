import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/classes/filtration';
import { UserService } from 'src/app/core/services/user/user.service';
import { AddChildService } from 'src/app/modules/parents/services/add-child.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';

@Component({
  selector: 'app-parents',
  templateUrl: './parents-home.component.html',
  styleUrls: ['./parents-home.component.scss']
})
export class ParentsComponent implements OnInit {

  get statusEnum() {return StatusEnum}

  guardian={id:'',name:{}}
  navigatedRouter:string = ''
  @ViewChild('withId', { read: ElementRef, static:false }) withId: ElementRef;
  @ViewChild('withoutId', { read: ElementRef, static:false }) withoutId: ElementRef;
  skeletonShown = false
  faChevronLeft = faChevronLeft
  parentsModelOpened = false
  registerStudents = []
  unRegisterStudents = []



  constructor(private router: Router,private child:AddChildService,private userService:UserService) { }

  ngOnInit(): void {
    this.userService.currentGuardian.subscribe((res) =>
      {
    
        this.guardian=JSON.parse(res);
        this.getChildren(this.guardian.id)
       
      });
   
  }
  
  getChildren(id){
    this.skeletonShown = true;
    this.child.getParentsChild(id).subscribe(res=>{
      this.unRegisterStudents = res.children
      this.registerStudents = res.students
      this.skeletonShown = false
    },(err)=>{ this.skeletonShown = false})
    
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

  changeRoute(studentId){
    this.router.navigate([`parent/child/${studentId}/register-request`])
  }


}
