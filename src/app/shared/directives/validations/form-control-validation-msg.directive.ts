import { Directive, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFormControlValidationMsg]'
})
export class FormControlValidationMsgDirective implements OnInit, OnDestroy {

  constructor(private elRef: ElementRef,
    private control: NgControl,
    private translate:TranslateService
  ) { }

  @Input('validationMsgId') validationMsgId: string='requiredField';
  errorSpanId: string = '';

  statusChangeSubscription: Subscription;

  ngOnInit(): void {
    this.errorSpanId = this.validationMsgId + (new Date().getTime() * ((Math.random() * 10) + 1)) + '-error-msg';
    // this.errorSpanId =  (new Date().getTime() * ((Math.random() * 10) + 1)) + '-error-msg';
    this.statusChangeSubscription = this.control.statusChanges.subscribe((status) => {
      console.log(status);

        if (status == 'INVALID') {
          this.showError();
        } else {
          this.removeError();
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  @HostListener('onBlur', ["$event"])
  @HostListener('blur', ["$event"])
  handleBlurEvent(event) {

    //This is needed to handle the case of clicking a required field and moving out.
    //Rest all are handled by status change subscription
    if (this.control.value == null || this.control.value == '') {
      if (this.control.errors) this.showError();
      else this.removeError();
    }
  }

  private showError() {
    this.removeError();
    const valErrors: ValidationErrors = this.control.errors;
    const firstKey = Object.keys(valErrors)[0];
    const errorMsgKey = this.validationMsgId + '-' + firstKey + '-msg';
    // const errorMsgKey = firstKey + '-msg';
    const errorMsg = this.getValidationMsg(errorMsgKey);
    console.log(errorMsg,errorMsgKey);

    const errSpan = '<p style="color:red;margin-top:.75rem" id="' + this.errorSpanId + '">' + errorMsg + '</p>';
    this.elRef.nativeElement.classList.add('ng-invalid' ,'ng-dirty')
    this.elRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errSpan);
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) errorElement.remove();
  }





  public getValidationMsg(validationId:string):string{
    return this.errorMessages[validationId];
}

private errorMessages = {
    'requiredField-required-msg': this.translate.instant('shared.This Field is Required'),
    'firstname-required-msg' : "Firstname is a required field",
    'firstname-minlength-msg' : "Firstname must have 8 characters",
    'firstname-maxlength-msg' : "Firstname can have maximum 30 characters",

    'lastname-required-msg' : "Lastname is a required field",
    'lastname-minlength-msg' : "Lastname must have 8 characters",
    'lastname-maxlength-msg' : "Lastname can have maximum 30 characters",

    'email-required-msg': 'Email is a required field',
    'email-email-msg': 'Email is not in valid format'
}

}
