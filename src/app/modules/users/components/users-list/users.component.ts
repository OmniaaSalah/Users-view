import { Component, OnInit, } from '@angular/core';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { UsersService } from '../../service/users.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { user } from 'src/app/core/Models/users/user.model';

@Component({
  selector: 'app-parents',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:user[];
  totalUsers;
  page=1;
  pageSize=6;
  skeletonShown = false
  paginationState= {...paginationInitialState}
  searchInput = new FormControl('');
  ngUnSubscribe = new Subject();

  constructor(
    private usersService:UsersService) { }

  ngOnInit(): void {
    this.seachListener();
    this.getAllUsers();
  }

  getAllUsers()
  {
    this.skeletonShown=true;
    this.usersService.getAllUsers(this.page).subscribe((res:any)=>{
      this.skeletonShown = false
      this.users=res?.data
      this.totalUsers=res?.total
    },(err)=>{this.skeletonShown = false})
  }

  paginationChanged(event: paginationState) {
    this.page = event.page
    this.pageSize = event.rows
    this.getAllUsers();
  }

  seachListener() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(1200),
        distinctUntilChanged(),
        takeUntil(this.ngUnSubscribe)
      )
      .subscribe((val) => {
        this.onSearch();
      });
  }
  onSearch() {

      let keyWord = this.searchInput.value;
      if (keyWord) {
        this.users= this.users.filter((val) =>
          val.id==Number(keyWord)
        );
        this.totalUsers=this.users?.length
      } else {
        this.skeletonShown=true;
        this.usersService.getAllUsers(1).subscribe((res:any) => {
          this.skeletonShown = false
          this.users = res?.data;
          this.totalUsers=res?.total
        },(err)=>{ this.skeletonShown = false});
      }

  }

}
