import { EventsService } from './../events.service';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Event } from '../event';

@Component({
    selector: 'app-event-list-by-student',
    templateUrl: './event-list-by-student.component.html',
    styleUrls: ['./event-list-by-student.component.css']
})
export class EventListByStudentComponent implements OnInit {

    @Input('studentId') studentId: number = 0;
    @Input('studentName') studentName: string = '';

    events: Event[] = [];

    constructor(
        private service: EventsService
    ) { }

    ngOnInit(): void {
        this.service.getEventsByStudentId(this.studentId).pipe(take(1))
            .subscribe({
                next: (events: Event[]) => {
                    this.events = events;
                }
            })
    }

}
