import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Student } from './../student';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html',
    styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

    queryField: FormControl = new FormControl;
    results$: Observable<Student[]> = new Observable();
    total: number = 0;

    readonly fields: string = 'id, name, lastName, grade';

    // delete Modal
    modalRef?: BsModalRef;
    message?: string;
    selectedStudent: number = 0;

    @ViewChild('deleteModal') deleteModal: any;

    constructor(
        private studentsService: StudentsService,
        private router: Router,
        private route: ActivatedRoute,
        private alertModalService: AlertModalService
    ) { }

    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh() {
        this.results$ = this.queryField.valueChanges
            .pipe(
                map((value: string) => {
                    return value.trim();
                }),
                filter(value => value.length > 1),
                debounceTime(2000),
                distinctUntilChanged(),
                // tap(value => console.log(value)),
                switchMap(value => this.studentsService.getStudents({
                    name: value
                })),
                tap((res: Student[]) => this.total = res.length)
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

            this.results$ = this.studentsService.getStudents()
                .pipe(
                    tap((res: Student[]) => this.total = res.length)
                    // map((res: Student[]) => res.results)
                );
        }
    }

    // onDetails(id: number){
    //     this.router.navigate(['details', id], { relativeTo: this.route })
    // }

    // onEditStudent(id: number){
    //     this.router.navigate(['edit', id], { relativeTo: this.route});
    // }

    onDelete(id: number) {
        // this.cursoSelecionado = id;
        // this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
        const result$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover este aluno?');
        result$.asObservable()
            .pipe(
                take(1),
                switchMap(result => result ? this.studentsService.delete(id) : EMPTY)
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
            })
    }

    // onConfirmDelete() {
    //     this.studentsService.delete(this.selectedStudent).subscribe({
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
