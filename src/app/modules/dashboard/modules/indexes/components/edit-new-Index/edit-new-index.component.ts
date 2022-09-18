import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
@Component({
  selector: 'app-edit-new-index',
  templateUrl: './edit-new-index.component.html',
  styleUrls: ['./edit-new-index.component.scss']
})
export class EditNewIndexComponent implements OnInit {
  checkIcon= faCheck;
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  cities: string[];
  indexFormGrp: FormGroup;
  constructor(private fb: FormBuilder, private headerService: HeaderService, private router: Router, private translate: TranslateService, private indexService: IndexesService) {
    this.indexFormGrp = fb.group({

      indexName: ['', [Validators.required, Validators.maxLength(500)]],
      indexType: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'), routerLink: '/dashboard/manager-tools/indexes/indexes-list' },
          { label: this.translate.instant('dashboard.Indexes.Add Item') }],
        'mainTitle': { main: this.translate.instant('dashboard.Indexes.Add Item') }
      }
    );
    this.cities = this.indexService.cities;
  }
  get indexName() {
    return this.indexFormGrp.controls['indexName'];
  }

  get indexType() {
    return this.indexFormGrp.controls['indexType'];
  }


}
