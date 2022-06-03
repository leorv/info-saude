import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VaccinesTakenService } from './../vaccines-taken.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vaccine } from '../vaccine';
import { Observable, map, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { VaccinesService } from '../vaccines.service';
import { VaccineTaken } from '../vaccine-taken';

// export interface VaccineTaken {
//     id: number,
//     vaccineId: number,
//     studentId: number,
//     name: string,
//     description: string,
//     date: Date
// }

@Component({
    selector: 'app-vaccines-taken-create',
    templateUrl: './vaccines-taken-create.component.html',
    styleUrls: ['./vaccines-taken-create.component.css'],
    preserveWhitespaces: true
})
export class VaccinesTakenCreateComponent implements OnInit {

    @Input() studentId: string = '';
    @Input() studentName: string = '';

    @Output() vaccineCreated: EventEmitter<any> = new EventEmitter();

    vaccines$: Observable<Vaccine[]> = new Observable();
    selectedVaccine: Vaccine = {id: '', name: ''};

    form: FormGroup = new FormGroup({});
    submitted: boolean = false;

    constructor(
        private vaccinesTakenService: VaccinesTakenService,
        private vaccinesService: VaccinesService,
        private router: Router,
        private modal: AlertModalService,
        private location: Location,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: '',
            vaccineId: '',
            studentId: '',
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]],
            description: ['', Validators.required],
            date: [new Date, Validators.required]
        });
        this.vaccines$ = this.vaccinesService.getVaccines();
    }

    onCancel() {
        this.submitted = false;
        this.form.reset();
    }

    onReturn() {
        this.router.navigate(['..']);
    }

    onSubmit() {
        this.submitted = true;
        this.form.patchValue({
            studentId: this.studentId,
            vaccineId: this.selectedVaccine.id
        });
        if (this.form.valid) {

            let msgSuccess = 'Informações atualizadas com sucesso!';
            let msgError = 'Erro ao tentar gravar as informações.';

            const vaccineTaken: VaccineTaken = {
                id: '',
                date: this.form.controls['date'].value,
                description: this.form.controls['description'].value,
                name: this.form.controls['name'].value,
                studentId: this.form.controls['studentId'].value,
                vaccineId: this.form.controls['vaccineId'].value
            }
            // this.form.patchValue({
            //     id: ''
            // })

            this.vaccinesTakenService.createVaccineTaken(vaccineTaken).subscribe({
                next: success => {
                    this.modal.showAlertSuccess(msgSuccess);
                    // this.location.back();
                    this.vaccineCreated.emit();
                }
                // TODO: Tratar erro
                // ,
                // error: error => {
                //     this.modal.showAlertDanger(msgError);
                // }
            });
            this.location.back();
        }
    }

    hasError(field: string) {
        return this.form.get(field)?.errors;
    }

    selectVaccine(vaccine: Vaccine){
        console.log('selecionou a vacina: ', vaccine);
        this.selectedVaccine = vaccine;
        console.log('vacina selecionada id: ', this.selectedVaccine.id);
    }

}
