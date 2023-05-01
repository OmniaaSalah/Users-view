import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: 'img[fullbackImage]'
})
export class FullbackImageDirective {

  private el = inject(ElementRef)
  @Input() fullbackImage:string;


  @HostListener('error') private onError(){
    this.el.nativeElement.src = this.fullbackImage || 'assets/images/shared/image.svg'
  }

}
