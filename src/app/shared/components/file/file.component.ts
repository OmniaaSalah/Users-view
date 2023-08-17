import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../services/media/media.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() file
  @Input() titel
  @Input() clickable= true
  @Input() hasFooter= false
  @Input() showDeletedBy= false
  @Input() styles={}

  constructor(
    private toaster:ToastrService,
    private mediaService:MediaService,
    private translate:TranslateService) { }

  ngOnInit(): void {
  }

  openFile(){

    // if(this.file.url) window.open(this.file.url,'_blank')
    if(this.file.url) this.mediaService.downloadFTPFile(this.file?.url)
    else this.toaster.error(this.translate.instant('toasterMessage.noUrl'))
  }

}
