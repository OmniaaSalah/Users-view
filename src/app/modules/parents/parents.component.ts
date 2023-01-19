import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {




  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    // this.headerService.changeHeaderdata(this.componentHeaderData)
  }

}
