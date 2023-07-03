import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/helpers/filtration';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ParentService } from 'src/app/modules/parants/services/parent.service';
import { AddChildService } from 'src/app/modules/guardian/services/add-child.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';

@Component({
  selector: 'app-parents',
  templateUrl: './guardian-home.component.html',
  styleUrls: ['./guardian-home.component.scss']
})
export class GuardianHomeComponent implements OnInit {

  get registrationStatus() {return RegistrationStatus}
  get claimsEnum () {return ClaimsEnum}

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
  graduatedStudents=[]
  finalGraduatedStudents =[];




  constructor(
    private router: Router,
    private child:AddChildService,
    private authService:AuthenticationService,
    private userService:UserService,
    private parentService:ParentService) { }

  ngOnInit(): void {

    this.userService.currentGuardian.subscribe((res) =>
      {
        this.guardian = res;
        this.authService.getMandatorySurveysOfGuardian(this.guardian.id).subscribe((res)=>{
          this.userService.setServiesNumbers(res.result);
        });

        this.getChildren(this.guardian.id)

      });

  }

  getChildren(id){
    this.skeletonShown = true;
    this.parentService.getChildernByParentId(id).subscribe(res=>{
      this.unRegisterStudents = res.children
      this.registerStudents = res.students
      this.studentsWithdrawal = res.studentsWithdrawal
      this.finalGraduatedStudents = res.finalGraduatedStudents
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
