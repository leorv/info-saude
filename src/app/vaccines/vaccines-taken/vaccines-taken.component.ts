import { AlertModalService } from './../../shared/alert-modal.service';
import { EMPTY, Observable, switchMap, take } from 'rxjs';
import { VaccineTaken } from './../vaccine-taken';
import { Component, Input, OnInit } from '@angular/core';
import { VaccinesTakenService } from '../vaccines-taken.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

// export interface VaccineTaken {
//     id: number,
//     vaccineId: number,
//     studentId: number,
//     name: string,
//     description: string,
//     date: Date
// }

@Component({
    selector: 'app-vaccines-taken',
    templateUrl: './vaccines-taken.component.html',
    styleUrls: ['./vaccines-taken.component.css']
})
export class VaccinesTakenComponent implements OnInit {

    vaccinesTaken$: Observable<VaccineTaken[]>  = new Observable();

    @Input() studentId: number = 0;
    @Input() studentName: string = '';

    modalRef?: BsModalRef;
    message?: string;

    constructor(
        private vaccinesTakenService: VaccinesTakenService,
        private alertModalService: AlertModalService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.vaccinesTaken$ = this.vaccinesTakenService.getVaccineTakensByStudentId(this.studentId);
    }

    onEdit(id: number){
        this.router.navigateByUrl(`vaccines-taken/edit/${id}`);
    }

    onDelete(id: number){
        const result$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover esta vacinação?');
        result$.asObservable()
            .pipe(
                take(1),
                switchMap(result => result ? this.vaccinesTakenService.delete(id) : EMPTY)
            )
            .subscribe({
                next: success => {
                    // this.onRefresh();
                    this.modalRef?.hide();
                },
                error: error => {
                    this.alertModalService.showAlertDanger('Erro ao remover a vacinação.');
                    this.modalRef?.hide();
                }
            })
    }

}
