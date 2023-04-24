import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SystemRequestService } from '../../../services/system-request.service';

@Component({
  selector: 'app-request-states',
  templateUrl: './request-states.component.html',
  styleUrls: ['./request-states.component.scss']
})
export class RequestStatesComponent implements OnInit {

  requestInstance = this.route.snapshot.paramMap.get('id')
  get statusEnum(){return StatusEnum}

  @Input() requestDetails



  states
  timeline



  constructor(
    private requestsService:SystemRequestService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRequestStates()
    this.requestsService.getperformedAction(this.requestInstance).subscribe()
  }


  getRequestStates(){
    this.requestsService.getRequestStates(this.requestInstance)
    .subscribe(res=>{
      this.states = [...res.states?.reverse() ]
    })
  }


//   getRequestTimeline(){
//     this.requestsService.getRequestTimline(this.requestInstance).subscribe(res=>{
//       this.states = [...res.states?.reverse() ]

//       this.states.forEach(state => {
//         if(state.status ==StatusEnum.Completed){
//           let ApprovedTaskIndex =state?.tasks?.findIndex(task => task.status.code ==StatusEnum.Completed)
//           state.tasks= state?.tasks.slice(ApprovedTaskIndex,ApprovedTaskIndex+1)
//         }
//       });
//       console.log(this.states);


//       if(res.task) res.task.options = res?.task?.options?.map(el=>({...el,isLoading:false}))

//       this.timeline=res
//       // this.timeline.task.options.map(el=> el.id)
//     })

//   }

}
