import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public loaderService:LoaderService) { }

  ngOnInit(): void {
    console.log('jyhtguyj,');
    
    this.loaderService.isLoading$.subscribe((res)=>{console.log("res"+res)})
  }

}
