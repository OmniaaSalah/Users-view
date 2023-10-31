import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaService } from '../../services/media/media.service';
import { Subscription, pipe, take } from 'rxjs';

@Component({
  selector: 'app-media-displayer',
  templateUrl: './media-displayer.component.html',
  styleUrls: ['./media-displayer.component.scss']
})
export class MediaDisplayerComponent implements OnInit , OnDestroy,AfterViewInit{
  @Input() src
  @Input() openModel

  subscriptions:Subscription =new Subscription();
  constructor(private mediaService:MediaService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  downloadFile(){
    this.mediaService.downloadBlobFile(this.src)
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
  }

}
