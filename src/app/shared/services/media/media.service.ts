import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http:HttpHandlerService) { }

  uploadMedia(file){
    let url = `${environment.production? '/Upload/upload-file?type=daleelfiles':'/Upload/Upload-blobstorage'}`
    return this.http.post(url, file,{}, {'content-type': 'attachment'}).pipe(take(1))
  }

  uploadBinaryFile(file){
    return this.http.post(`/Upload/Upload-blobstorage-byte`, file,{}).pipe(take(1))
  }

}
