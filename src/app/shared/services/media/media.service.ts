import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http:HttpHandlerService) { }



  uploadMedia(file){
    let url = `${environment.production? '/Upload/upload-file?type=daleelfiles':'/Upload/Upload-blobstorage'}`
    return this.http.post(url, file,{}, {'content-type': 'attachment'}).pipe(take(1))
  }


  downloadFTPFile(url){
    return this.http.get('/FileDownload',{url},{'content-type':'file'})
    .subscribe((response:Blob) =>{

      FileSaver.saveAs(response,'ملف' + new Date().getTime() + response.type);
    })

  }

  getFTP_BlobFile(url){
    return this.http.get('/FileDownload',{url},{'content-type':'file'}).pipe(take(1))
  }


  blobToBase64(blob){
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });

  }

}
