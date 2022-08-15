// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { AuthenticationService } from './authentication.service';

<<<<<<< HEAD
@Injectable()
export class TokenGuard implements CanActivate {
    constructor(public authService: AuthenticationService, public router: Router) { }
    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
}
=======
// @Injectable()
// export class TokenGuard implements CanActivate {
//     // constructor(public authService: AuthenticationService, public router: Router) { }
//     // canActivate(): boolean {
//     //     if (this.authService.isLoggedIn()) {
//     //         this.router.navigate(['/schools']);
//     //         return false;
//     //     }
//     //     return true;
//     // }
// }
>>>>>>> 7cee60edc56e3e4f4eed3b2ecb61c9f7cb669b9c
