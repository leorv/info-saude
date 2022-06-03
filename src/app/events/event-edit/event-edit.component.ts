import { Student } from 'src/app/students/student';
import { StudentsService } from './../../students/students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Event } from '../event';
import { EventsService } from '../events.service';
import { Location } from '@angular/common';
import { EventTypes2LabelMapping, EventTypesEnum } from '../event-types.enum';
import { map, switchMap, tap, take } from 'rxjs';
import { parseDate } from 'ngx-bootstrap/chronos';

@Component({
    selector: 'app-event-edit',
    templateUrl: './event-edit.component.html',
    styleUrls: ['./event-edit.component.css'],
    preserveWhitespaces: true
})
export class EventEditComponent implements OnInit {

    @Input('studentName') studentName?: string = '';
    @Input('event') event?: Event = {id: '', type: '', description: '', date: new Date, studentId: ''};

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
        private router: Router,
        private route: ActivatedRoute,
        private studentService: StudentsService
    ) { }

    ngOnInit(): void {
        if (this.event?.id != '' && this.event?.id != null){
            this.form.setValue({
                id: this.event?.id,
                type: this.event?.type,
                description: this.event?.description,
                date: this.event?.date,
                studentId: this.event?.studentId
            })
        } else {
            this.route.params.pipe(
                map((params: any) => {
                    const id = params['id'];
                    return id;
                }),
                switchMap((id: string) => {
                    return this.service.getEventsById(id);
                }),
                tap((event: Event) => {
                    this.form.setValue({
                        id: event.id,
                        type: event.type,
                        description: event.description,
                        date: parseDate(event.date),
                        studentId: event.studentId
                    });
                }),
                switchMap((event: Event) => {
                    return this.studentService.getStudentsById(event.studentId)
                }),
                take(1)
            ).subscribe({
                next: (student: Student) => {
                    this.studentName = student.name;
                }
            })
        }
        
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
