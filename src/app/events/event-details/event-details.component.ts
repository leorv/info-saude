import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Student } from 'src/app/students/student';
import { Event } from '../event';
import { EventsService } from '../events.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

    event: Event = { id: '', type: '', description: '', date: new Date, studentId: ''};
    eventType: string = '';

    student: Student = { id: '', name: '', gender: '', birthDate: new Date, grade: '', cpf: 0, events: [] };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: EventsService
    ) { }

    ngOnInit(): void {
        this.route.params.pipe(
            map((params: any) => {
                const id = params['id'];
                return id;
            }),
            switchMap((id: string) => this.service.getEventsById(id))
        ).subscribe((event: Event) => {
            this.event = event;
            switch (event.type){
                case 'CC':
                    this.eventType = 'Câncer';
                    break
                case 'DB':
                    this.eventType = 'Doenças bacterianas';
                    break
                case 'DG':
                    this.eventType = 'Doenças genéticas';
                    break
                case 'DP':
                    this.eventType = 'Doenças psicológicas';
                    break
                case 'DST':
                    this.eventType = 'Doenças sexualmente transmissíveis';
                    break
                case 'MC':
                    this.eventType = 'Micoses';
                    break
                case 'PV':
                    this.eventType = 'Protozooses/Verminoses';
                    break
                case 'VIR':
                    this.eventType = 'Viroses';
                    break
                case 'GRI':
                    this.eventType = 'Gripes';
                    break
                case 'COV':
                    this.eventType = 'Covid';
                    break
            };
        });
    }

    onReturn() {
        this.router.navigate(['events']);
    }

}
