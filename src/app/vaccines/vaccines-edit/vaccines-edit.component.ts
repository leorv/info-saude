import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vaccine } from './../vaccine';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { VaccinesService } from '../vaccines.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-vaccines-edit',
    templateUrl: './vaccines-edit.component.html',
    styleUrls: ['./vaccines-edit.component.css'],
    preserveWhitespaces: true
})
export class VaccinesEditComponent implements OnInit {

    form: FormGroup = new FormGroup({});
    submitted: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vaccinesService: VaccinesService,
        private formBuilder: FormBuilder,
        private modal: AlertModalService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: 0,
            name: ['', Validators.required]
        });
        this.route.params.pipe(
            map((params: any) => {
                const id = params['id'];
                return id;
            }),
            switchMap((id: number) => this.vaccinesService.getVaccinesById(id))
        ).subscribe({
            next: (vaccine: Vaccine) => {
                this.updateForm(vaccine);
            }
        })
        ;
    }

    updateForm(vaccine: Vaccine){
        this.form.patchValue({
            id: vaccine.id,
            name: vaccine.name
        });
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

            this.vaccinesService.updateVaccine(this.form.value).subscribe({
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
