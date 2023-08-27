import { Pipe, PipeTransform } from '@angular/core';
import { MediaService } from '../services/media/media.service';
import { switchMap } from 'rxjs';

@Pipe({
  name: 'blobToBase64'
})
export class BlobToBase64Pipe implements PipeTransform {

  constructor(private mediaService:MediaService){}

  transform(ftpUrl : string): unknown {
    if(!ftpUrl) return
    return this.mediaService.getFTP_BlobFile(ftpUrl)
    .pipe(
      switchMap(blobFile =>{
        return this.mediaService.blobToBase64(blobFile)
      })
    )
    return null;
  }

}
