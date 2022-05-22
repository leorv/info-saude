import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from './../../shared/alert-modal.service';
import { EventsService } from './../events.service';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { take, Observable, switchMap, EMPTY } from 'rxjs';
import { Event } from '../event';
import { Router } from '@angular/router';

@Component({
    selector: 'app-event-list-by-student',
    templateUrl: './event-list-by-student.component.html',
    styleUrls: ['./event-list-by-student.component.css'],
    preserveWhitespaces: true
})
export class EventListByStudentComponent implements OnInit {

    @Input('studentId') studentId: number = 0;
    @Input('studentName') studentName: string = '';

    events$: Observable<Event[]> = new Observable();

    // TODO: deletar
    numero: number = 0;

    constructor(
        private service: EventsService,
        private router: Router,
        private alertModalService: AlertModalService,
        private modalRef: BsModalRef
    ) { }

    ngOnInit(): void {
        this.onRefresh();
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //     //Add '${implements OnChanges}' to the class.
    //     this.numero++;
    //     console.log('onChanges: ', this.numero, changes);
    //     this.onRefresh();
    // }


    onRefresh() {
        this.events$ = this.service.getEventsByStudentId(this.studentId);
    }

    onEdit(id: number) {
        this.router.navigateByUrl(`events/edit/${id}`);
    }

    onDelete(id: number) {
        const events$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover este evento?');
        events$.asObservable()
            .pipe(
                switchMap(result => result ? this.service.delete(id) : EMPTY)
            )
            .subscribe({
                next: success => {
                    this.onRefresh();
                    this.modalRef?.hide();
                },
                error: error => {
                    this.alertModalService.showAlertDanger('Erro ao remover o curso.');
                    this.modalRef?.hide();
                }
            });
    }
}
