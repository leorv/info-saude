import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VaccinesTakenService } from './../vaccines-taken.service';
import { Component, Input, OnInit } from '@angular/core';
import { Vaccine } from '../vaccine';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { VaccinesService } from '../vaccines.service';

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
    styleUrls: ['./vaccines-taken-create.component.css']
})
export class VaccinesTakenCreateComponent implements OnInit {

    @Input() studentId: number = 0;
    @Input() studentName: string = '';

    vaccines$: Observable<Vaccine[]> = new Observable();

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
            id: 0,
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
        if (this.form.valid) {

            let msgSuccess = 'Informações atualizadas com sucesso!';
            let msgError = 'Erro ao tentar gravar as informações.';

            this.vaccinesTakenService.createVaccineTaken(this.form.value).subscribe({
                next: success => {
                    this.modal.showAlertSuccess(msgSuccess);
                    this.location.back();
                },
                error: error => {
                    this.modal.showAlertDanger(msgError);
                }
            })
        }
    }

    hasError(field: string) {
        return this.form.get(field)?.errors;
    }

}
