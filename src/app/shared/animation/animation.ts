import { animate, group, query, style, transition, trigger } from "@angular/animations";


const resetRoute = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
      style({
        position: 'absolute', // using absolute makes the scroll get stuck in the previous page's scroll position on the new page
        top: 0, // adjust this if you have a header so it factors in the height and not cause the router outlet to jump as it animates
        left: 0,
        width: '100%',
        opacity: 0,
      }),
    ],
    { optional: true }
  ),
];

export const routeSlide = trigger('routeSlide',[
    transition("*<=>*", [
      ...resetRoute,
        // query(':enter, :leave',[
        //     style({
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         opacity:0,
        //         width: '100%',
        //     })
        // ],{optional: true}),

        query(':enter', [
            style({
                // left: '-5%',
             opacity: 0 })
        ], {optional: true}),

        group([
            query(':leave', [
              style({ opacity: 1 }),
              animate('.2s cubic-bezier(.44,-0.02,.87,.95)', style({
                // left: '1%',
                opacity: 0 }))
            ], {optional: true}),

            query(':enter', [
              style({ opacity: 0 }),
              animate('.5s cubic-bezier(.44,-0.02,.87,.95)', style({opacity: 1 }))
            ], {optional: true})
        ]),
    ])
]);


export const slide = trigger('slide',[
    transition(':enter',[
        style({ opacity: 0 }),
        animate('.3s cubic-bezier(.48,.46,.5,.65)', style({ opacity: 1 }))
    ]),

    transition(':leave',[
        // style({ opacity: 0, transform: 'translateX(-10%)' }),
        animate('.3s cubic-bezier(.48,.46,.5,.65)', style({ opacity: 0}))
    ])

])
