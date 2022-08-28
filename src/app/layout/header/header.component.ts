import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  isInDashboard

  faAngleDown = faAngleDown

  constructor(
    private router: Router, 
    private translationService: TranslationService, 
    private authService: AuthenticationService, 
    private userService: UserService) { }


  ngOnInit(): void {

    if(this.router.url.indexOf('dashboard') > -1) this.isInDashboard = true
    
    this.router.events
    .pipe(filter( event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {

      if(event.url.indexOf('dashboard') > -1){
        this.isInDashboard = true
      }
    })
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    this.userService.clear();
  }

  onSwitchLanguage() {
    this.translationService.handleLanguageChange()

  }
}
