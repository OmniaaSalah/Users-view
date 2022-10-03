import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-send-btn',
  templateUrl: './send-btn.component.html',
  styleUrls: ['./send-btn.component.scss']
})
export class SendBtnComponent implements OnInit {
  @Input('route') routeUrl='';
  @Input('content') content='';
  @Input('backGroundColor') backGroundColor='';
  plusIcon = faPlus;
  checkIcon = faCheck;





  constructor(private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  goToAddNew()
  {

    this.router.navigate([this.routeUrl],{relativeTo:this.route});
  }

}
