import { Student } from './../student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { map, switchMap } from 'rxjs';
import { StudentsService } from '../students.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';


@Component({
    selector: 'app-students-edit',
    templateUrl: './students-edit.component.html',
    styleUrls: ['./students-edit.component.css'],
    preserveWhitespaces: true
})
export class StudentsEditComponent implements OnInit {

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

        this.route.params.pipe(
            map((params: any) => {
                const id = params['id'];
                return id;
            }),
            switchMap((id: string) => this.service.getStudentsById(id))
        ).subscribe((student: Student) => this.updateForm(student));

        // .subscribe(
        //     (params: any) => {
        //         const id: number = params.id;
        //         const student$ = this.service.getStudentsById(id);
        //         student$.subscribe(
        //             {
        //                 next: (student: Student) => {
        //                     this.updateForm(student);
        //                 }
        //             }
        //         )
        //     })
    }

    updateForm(student: Student) {
        this.form.patchValue({
            id: student.id,
            name: student.name,
            birthDate: student.birthDate,
            grade: student.grade,
            gender: student.gender,
            cpf: student.cpf
        })
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

            this.service.updateStudent(this.form.value).subscribe({
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
