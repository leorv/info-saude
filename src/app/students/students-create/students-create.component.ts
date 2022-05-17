import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { StudentsService } from '../students.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-students-create',
    templateUrl: './students-create.component.html',
    styleUrls: ['./students-create.component.css']
})
export class StudentsCreateComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service: StudentsService,
        private location: Location,
        private modal: AlertModalService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: 0,
            name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(128)]],
            gender: ["", Validators.required],
            birthDate: [new Date, Validators.required],
            grade: ["", Validators.required],
            cpf: [0] // TODO: Validação para o CPF.
        });

    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {

            let msgSuccess = 'Aluno criado com sucesso!';
            let msgError = 'Erro ao tentar gravar as informações.';

            this.service.createStudent(this.form.value).subscribe({
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
