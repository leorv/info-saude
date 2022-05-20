import { Router } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Event } from '../event';
import { EventsService } from '../events.service';
import { Location } from '@angular/common';
import { EventTypes2LabelMapping, EventTypesEnum } from '../event-types.enum';

@Component({
    selector: 'app-event-edit',
    templateUrl: './event-edit.component.html',
    styleUrls: ['./event-edit.component.css'],
    preserveWhitespaces: true
})
export class EventEditComponent implements OnInit {

    @Input('studentName') studentName: string = '';
    @Input('event') event: Event = {id: 0, type: '', description: '', date: new Date, studentId: 0};

    eventTypes2LabelMapping: Record<EventTypesEnum, string> = EventTypes2LabelMapping;
    eventTypes: EventTypesEnum[] = Object.values(EventTypesEnum);

    form: FormGroup = this.formBuilder.group({
        id: 0,
        type: ["", Validators.required],
        description: ["", Validators.required],
        date: [Date, Validators.required],
        studentId: 0
    });
    submitted: boolean = false;

    constructor(
        private service: EventsService,
        private modal: AlertModalService,
        private location: Location,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form.setValue({
            id: this.event.id,
            type: this.event.type,
            description: this.event.description,
            date: this.event.date,
            studentId: this.event.studentId
        })
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {

            let msgSuccess = 'Informações atualizadas com sucesso!';
            let msgError = 'Erro ao tentar gravar as informações.';

            this.service.updateEvent(this.form.value).subscribe({
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
