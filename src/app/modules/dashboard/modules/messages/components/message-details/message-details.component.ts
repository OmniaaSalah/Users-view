import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {

  display: boolean = false;


  messagesDetails=[
    {

      person1: {
          UserName : "mahmoud",
          Title : "edit holiday",
           id: 1,
          Description : "saddfasfasfsafsadfsafda",
          CreatedDate : "two hour"
      },

      person2: {
        UserName : "ali",
        Title : "edit holiday",
        id: 1,
        Description : "saddfasfasfsafsadfsafda",
        CreatedDate : "two hour"
      },
    },

    {

      person1: {
          UserName : "sameh",
          Title : "edit holiday",
           id: 1,
          Description : "saddfasfasfsafsadfsafda",
          CreatedDate : "two hour"
      },

      person2: {
        UserName : "khaled",
        Title : "edit holiday",
        id: 1,
        Description : "saddfasfasfsafsadfsafda",
        CreatedDate : "two hour"
      },
    },

    ]

  constructor(private headerService: HeaderService,private messageService: MessageService,private toastr:ToastrService,private formbuilder:FormBuilder, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Messages.messages'),routerLink:'/dashboard/messages/messages',routerLinkActiveOptions:{exact: true} },
          { label: this.translate.instant('dashboard.Messages.Chat Details') }
        ],
        mainTitle: { main: this.translate.instant('dashboard.Messages.Chat Details') }
      }
    );
  }


  showDialog() {
    this.display = true;
}


  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
}
