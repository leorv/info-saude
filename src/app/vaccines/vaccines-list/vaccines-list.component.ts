import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Vaccine } from './../vaccine';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { VaccineService } from '../vaccine.service';

@Component({
    selector: 'app-vaccine-list',
    templateUrl: './vaccines-list.component.html',
    styleUrls: ['./vaccines-list.component.css']
})
export class VaccinesListComponent implements OnInit {

    queryField: FormControl = new FormControl;
    vaccines$: Observable<Vaccine[]> = new Observable();
    total: number = 0;

    readonly fields: string = 'id, name, lastName, grade';

    // delete Modal
    modalRef?: BsModalRef;
    message?: string;
    selectedVaccine: number = 0;

    @ViewChild('deleteModal') deleteModal: any;

    constructor(
        private vaccineService: VaccineService,
        private alertModalService: AlertModalService
    ) { }

    ngOnInit(): void {
        this.vaccines$ = this.vaccineService.getVaccines().pipe(
            tap((res: Vaccine[]) => this.total = res.length)
        );
        // setTimeout(() => {
        //     this.onRefresh();
        // }, 1000);
    }

    onRefresh() {
        console.log(this.queryField.value);
        if (this.queryField.value != null || this.queryField.value != undefined || this.queryField.value != '') {
            console.log('dentro do if');
            this.vaccines$ = this.queryField.valueChanges
                .pipe(
                    map((value: string) => value.trim()),
                    filter(value => value.length > 1),
                    debounceTime(3000),
                    distinctUntilChanged(),
                    // tap(value => console.log(value)),
                    switchMap(value => this.vaccineService.getVaccines({
                        name: value
                    })),
                    tap((res: Vaccine[]) => {
                        this.total = res.length;
                        console.log('feita a requisição');
                    })
                );
        }

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

            this.vaccines$ = this.vaccineService.getVaccines()
                .pipe(
                    tap((res: Vaccine[]) => this.total = res.length)
                    // map((res: Vaccine[]) => res.vaccines)
                );
        }
    }

    onDelete(id: number) {
        // this.cursoSelecionado = id;
        // this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
        const vaccine$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover esta vacina?');
        vaccine$.asObservable()
            .pipe(
                take(1),
                switchMap(vaccine => vaccine ? this.vaccineService.delete(id) : EMPTY)
            )
            .subscribe({
                next: success => {
                    this.onRefresh();
                    this.modalRef?.hide();
                },
                error: error => {
                    this.alertModalService.showAlertDanger('Erro ao remover a vacina.');
                    this.modalRef?.hide();
                }
            })
    }
}
