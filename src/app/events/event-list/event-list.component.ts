import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Event } from './../event';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../events.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})
export class EventsListComponent implements OnInit {

    queryField: FormControl = new FormControl;
    events$: Observable<Event[]> = new Observable();
    total: number = 0;

    readonly fields: string = 'id, name, lastName, grade';

    // delete Modal
    modalRef?: BsModalRef;
    message?: string;
    selectedEvent: number = 0;

    @ViewChild('deleteModal') deleteModal: any;

    constructor(
        private eventsService: EventsService,
        private router: Router,
        private route: ActivatedRoute,
        private alertModalService: AlertModalService
    ) { }

    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh() {
        this.events$ = this.queryField.valueChanges
            .pipe(
                map((value: string) => value.trim()),
                filter(value => value.length > 1),
                debounceTime(2000),
                distinctUntilChanged(),
                // tap(value => console.log(value)),
                switchMap(value => this.eventsService.getEvents({
                    description: value
                })),
                tap((res: Event[]) => this.total = res.length)
            );
    }

    onSearch() {
        // console.log(this.queryField.value);
        let value: string = this.queryField.value;
        // const fields: string = 'name,description,version,alternativeNames,license,homepage,repository,author,originalName';

        if (value && value.trim() != '') {
            value = value.trim();

            // const params = {
            //     search: value,
            //     fields: this.fields
            // }

            // let params = new HttpParams();
            // params = params.set('search', value);
            // params = params.set('fields', fields);

            this.events$ = this.eventsService.getEvents()
                .pipe(
                    tap((res: Event[]) => this.total = res.length)
                    // map((res: Event[]) => res.events)
                );
        }
    }

    // onDetails(id: number){
    //     this.router.navigate(['details', id], { relativeTo: this.route })
    // }

    // onEditEvent(id: number){
    //     this.router.navigate(['edit', id], { relativeTo: this.route});
    // }

    onDelete(id: number) {
        // this.cursoSelecionado = id;
        // this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
        const event$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover este evento?');
        event$.asObservable()
            .pipe(
                take(1),
                switchMap(event => event ? this.eventsService.delete(id) : EMPTY)
            )
            .subscribe({
                next: success => {
                    this.onRefresh();
                    this.modalRef?.hide();
                },
                error: error => {
                    this.alertModalService.showAlertDanger('Erro ao remover o evento.');
                    this.modalRef?.hide();
                }
            })
    }

    // onConfirmDelete() {
    //     this.eventsService.delete(this.selectedEvent).subscribe({
    //         next: success => {
    //             // this.onRefresh();
    //             // this.modalRef?.hide(); Não precisa mais. É um método do showConfirm.
    //         },
    //         error: error => {
    //             this.alertModalService.showAlertDanger('Erro ao remover o curso.');
    //             // this.modalRef?.hide();
    //         }
    //     })
    // }

    // onDeclineDelete() {
    //     this.modalRef?.hide();
    // }
}
