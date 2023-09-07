import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-edit-new-index',
  templateUrl: './edit-new-index.component.html',
  styleUrls: ['./edit-new-index.component.scss'],
})
export class EditNewIndexComponent implements OnInit {
  exclamationIcon = faExclamationCircle;
  isLabelShown: boolean = false;
  checkedStatus: boolean = true;
  notCheckedStatus: boolean = false;
  isBtnLoading: boolean = false;
  index;
  indexListType;
  urlParameter: string = '';
  indexFormGrp: FormGroup;
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private router: Router,
    private translate: TranslateService,
    private indexService: IndexesService,
    private location:LocationStrategy
  ) {
    this.indexFormGrp = fb.group({
      arabicIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      englishIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      indexType: ['', [Validators.required]],
      indexStatus: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.urlParameter = param.get('indexId');
    });

    this.headerService.Header.next({
      breadCrump: [
        {
          label: this.translate.instant(
            'sideBar.managerTools.children.System List'
          ),
          routerLink: '/manager-tools/indexes',
          routerLinkActiveOptions: { exact: true },
        },
        {
          label:
            this.urlParameter == null || this.urlParameter == ''
              ? this.translate.instant('dashboard.Indexes.Add Item')
              : this.translate.instant('dashboard.Indexes.Edit Item'),
          routerLink:
            this.urlParameter == null || this.urlParameter == ''
              ? '/manager-tools/indexes/new-index'
              : '/manager-tools/indexes/edit-index/' + this.urlParameter,
        },
      ],
      mainTitle: {
        main:
          this.urlParameter == null || this.urlParameter == ''
            ? this.translate.instant('dashboard.Indexes.Add Item')
            : this.translate.instant('dashboard.Indexes.Edit Item'),
      },
    });

    this.indexListType = this.sharedService.getIndexesTypes();

    if (this.urlParameter) {
      this.indexService
        .getIndexByID(Number(this.urlParameter))
        .subscribe((res) => {
          this.index = res;

          this.bindOldIndex(this.index);
        });
    }
  }
  get arabicIndexName() {
    return this.indexFormGrp.controls['arabicIndexName'];
  }
  get englishIndexName() {
    return this.indexFormGrp.controls['englishIndexName'];
  }

  get indexType() {
    return this.indexFormGrp.controls['indexType'];
  }
  get indexStatus() {
    return this.indexFormGrp.controls['indexStatus'];
  }

  saveMe() {
    this.index = {};
    this.isBtnLoading = true;
    this.index.indexStatus =
      this.indexFormGrp.value.indexStatus == true
        ? StatusEnum.Active
        : StatusEnum.Inactive;
    this.index = {
      indexName: {
        ar: this.indexFormGrp.value.arabicIndexName,
        en: this.indexFormGrp.value.englishIndexName,
      },
      indexType: this.indexFormGrp.value.indexType,
      indexStatus: this.index.indexStatus,
    };

    if (this.urlParameter) {
      this.indexService
        .updateIndex(Number(this.urlParameter), this.index)
        .subscribe(
          (res) => {
            this.isBtnLoading = false;
            this.toastService.success(
              this.translate.instant(
                'dashboard.Indexes.old index edited Successfully'
              )
            );
            this.router.navigate(['/manager-tools/indexes']);
          },
          (err) => {
            this.isBtnLoading = false;
            this.showErrorMessage();
          }
        );
    } else {
      this.indexService.addIndex(this.index).subscribe(
        (res) => {
          this.isBtnLoading = false;
          this.toastService.success(
            this.translate.instant(
              'dashboard.Indexes.New index added Successfully'
            )
          );
          this.router.navigate(['/manager-tools/indexes']);
        },
        (err) => {
          this.isBtnLoading = false;
          this.showErrorMessage();
        }
      );
    }
  }

  showErrorMessage() {
    this.toastService.error(
      this.translate.instant(
        'dashboard.Indexes.You should enter Valid Data First'
      )
    );
  }

  bindOldIndex(index) {
    index.indexStatus =
      index.indexStatus == StatusEnum.Active
        ? this.checkedStatus
        : this.notCheckedStatus;

    this.indexFormGrp.patchValue({
      arabicIndexName: index.indexName.ar,
      englishIndexName: index.indexName.en,
      indexType: index.indexType,
      indexStatus: index.indexStatus,
    });
  }

  back(){
    this.location.back()
  }
}
