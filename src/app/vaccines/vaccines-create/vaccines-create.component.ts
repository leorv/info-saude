import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { VaccinesService } from '../vaccines.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-vaccines-create',
    templateUrl: './vaccines-create.component.html',
    styleUrls: ['./vaccines-create.component.css'],
    preserveWhitespaces: true
})
export class VaccinesCreateComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private service: VaccinesService,
        private location: Location,
        private modal: AlertModalService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: 0,
            name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(128)]]
        });

    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {

            let msgSuccess = 'Aluno criado com sucesso!';
            let msgError = 'Erro ao tentar gravar as informações.';

            this.service.createVaccine(this.form.value).subscribe({
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

    onCancel() {
        this.submitted = false;
        this.form.reset();
    }

    onReturn() {
        this.router.navigate(['..']);
    }

    hasError(field: string) {
        return this.form.get(field)?.errors;
    }

}
