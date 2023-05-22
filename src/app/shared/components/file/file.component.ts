import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() file
  @Input() clickable= true
  @Input() hasFooter= false
  @Input() showDeletedBy= false
  @Input() styles={}

  constructor(
    private toaster:ToastrService,
    private translate:TranslateService) { }

  ngOnInit(): void {
  }

  openFile(){
    if(this.file.url) window.open(this.file.url,'_blank')
    else this.toaster.error(this.translate.instant('toasterMessage.noUrl'))
  }

}
