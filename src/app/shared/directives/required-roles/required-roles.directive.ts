import { Directive, ElementRef, HostListener, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[IsAllowedTo]',
})
export class RequiredRolesDirective {
  @Input() IsAllowedTo: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.validateAccess();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validateAccess();
  }



  // @HostListener('mouseover',['$event']) onHover(){

  // }



  private validateAccess(): void {
    console.log(this.IsAllowedTo);

    if (!this.IsAllowedTo) {
      this.renderer.setAttribute(this.elRef.nativeElement, 'disabled', 'true');
      this.renderer.setStyle(this.elRef.nativeElement, 'cursor', 'not-allowed');
    }else{
      this.renderer.removeAttribute(this.elRef.nativeElement, 'disabled');
      this.renderer.setStyle(this.elRef.nativeElement, 'cursor', 'pointer');
    }
  }

  claims;

  hasRole(role: string): boolean {
    this.claims = [];
    if (!!this.claims.roles) {
      const userRoles = this.claims.roles;
      return userRoles.includes(role);
    }
  }
}
