import { EventsService } from './../events.service';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Event } from '../event';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event-list-by-student',
    templateUrl: './event-list-by-student.component.html',
    styleUrls: ['./event-list-by-student.component.css'],
    preserveWhitespaces: true
})
export class EventListByStudentComponent implements OnInit {

    @Input('studentId') studentId: number = 0;
    @Input('studentName') studentName: string = '';

    events: Event[] = [];

    constructor(
        private service: EventsService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.service.getEventsByStudentId(this.studentId).pipe(take(1))
            .subscribe({
                next: (events: Event[]) => {
                    this.events = events;
                }
            })
    }

    onEdit(id: number){
        // console.log(this.route);
        // console.log(this.route.root);
        // console.log(this.route.root.children[0]);
        // console.log(this.route.root.children[1]);
        // console.log(this.route.root.children[2]);
        // console.log(this.route.root.children.map(c => c.toString));
        this.router.navigateByUrl(`events/edit/${id}`);
    }

}
