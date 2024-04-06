import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../service/users.service';
import { user } from 'src/app/core/Models/users/user.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  faArrowRight=faArrowRight
  id;
  currentUser:user;
  skeletonShown:boolean;
  constructor(private route:ActivatedRoute,private usersService:UsersService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getUserDetails(this.id);

  }
  getUserDetails(id){
  this.skeletonShown=true;
  this.usersService.getUserDetails(id).subscribe((res:any)=>{
    this.currentUser=res?.data;
    this.skeletonShown=false;
  },(err)=>{
    this.skeletonShown=false;
  })
  }

}
