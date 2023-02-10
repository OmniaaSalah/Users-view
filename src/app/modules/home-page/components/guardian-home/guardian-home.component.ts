import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/classes/filtration';
import { UserService } from 'src/app/core/services/user/user.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';
import { AddChildService } from 'src/app/modules/guardian/services/add-child.service';
import { RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';

@Component({
  selector: 'app-parents',
  templateUrl: './guardian-home.component.html',
  styleUrls: ['./guardian-home.component.scss']
})
export class GuardianHomeComponent implements OnInit {

  get registrationStatus() {return RegistrationStatus}

  guardian={id:'',name:{}}

  navigatedRouter:string = ''
  @ViewChild('withId', { read: ElementRef, static:false }) withId: ElementRef;
  @ViewChild('withoutId', { read: ElementRef, static:false }) withoutId: ElementRef;
  skeletonShown = false
  faChevronLeft = faChevronLeft
  parentsModelOpened = false

  registerStudents = []
  unRegisterStudents = []
  studentsWithdrawal=[]



  constructor(
    private router: Router,
    private child:AddChildService,
    private userService:UserService,
    private parentService:ParentService) { }

  ngOnInit(): void {
    this.userService.currentGuardian.subscribe((res) =>
      {
    
        this.guardian = res;
        this.getChildren(this.guardian.id)
       
      });
   
  }
  
  getChildren(id){
    this.skeletonShown = true;
    this.parentService.getChildernByParentId(id).subscribe(res=>{
      this.unRegisterStudents = res.children
      this.registerStudents = res.students
      this.studentsWithdrawal = res.studentsWithdrawal
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
