import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    console.log(error);

     if (chunkFailedMessage.test(error.message)) {
      console.log('Reloaddddddddddddd');

       window.location.reload();
     }
   }
}
