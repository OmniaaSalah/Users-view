import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() name='file'
  @Input() url
  @Input() clickable= true
  
  constructor(
    private toaster:ToastrService,
    private translate:TranslateService) { }

  ngOnInit(): void {
  }

  openFile(){
    if(this.url) window.open(this.url,'_blank')
    else this.toaster.error(this.translate.instant('toasterMessage.noUrl'))
  }

}
