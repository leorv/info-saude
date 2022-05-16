import { Student } from './../student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from 'src/app/shared/search.service';
import { map, switchMap } from 'rxjs';


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
        private service: SearchService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: 0,
            nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(128)]],
            birthDate: [new Date, Validators.required],
            grade: ["", Validators.required],
            cpf: [0] // TODO: Validação para o CPF.
        });


        this.route.params.pipe(
            map((params: any) => {
                const id = params['id'];
                return id;
            }),
            switchMap((id: number) => this.service.getStudentsById(id))
        ).subscribe((student: Student) => this.updateForm(student))
        
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

    updateForm(student: Student){
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

    onReturn(){
        this.router.navigate(['..']);
    }

    onSubmit() {
        this.submitted = true;
        // if (this.form.valid) {

        //     let msgSuccess = 'Curso criado com sucesso!';
        //     let msgError = 'Erro ao criar curso.';
        //     if (this.form.value.id) {
        //         msgSuccess = 'Curso atualizado com sucesso!';
        //         msgError = 'Erro ao atualizar curso.';
        //     }

        //     this.cursosService.save(this.form.value).subscribe({
        //         next: success => {
        //             this.modal.showAlertSuccess(msgSuccess);
        //             this.location.back();
        //         },
        //         error: error => {
        //             this.modal.showAlertDanger(msgError);
        //         }
        //     })
        // }
    }

    hasError(field: string){

    }

}
