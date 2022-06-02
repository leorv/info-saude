import { take } from 'rxjs';
import { StudentsService } from './../../students/students.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';
import { EventTypes2LabelMapping, EventTypesEnum } from '../event-types.enum';
import { Event } from '../event';

// switch (event.type) {
//     case 'CC':
//         this.eventType = 'Câncer';
//         break
//     case 'DB':
//         this.eventType = 'Doenças bacterianas';
//         break
//     case 'DG':
//         this.eventType = 'Doenças genéticas';
//         break
//     case 'DP':
//         this.eventType = 'Doenças psicológicas';
//         break
//     case 'DST':
//         this.eventType = 'Doenças sexualmente transmissíveis';
//         break
//     case 'MC':
//         this.eventType = 'Micoses';
//         break
//     case 'PV':
//         this.eventType = 'Protozooses/Verminoses';
//         break
//     case 'VIR':
//         this.eventType = 'Viroses';
//         break
//     case 'GRI':
//         this.eventType = 'Gripes';
//         break
//     case 'COV':
//         this.eventType = 'Covid';
//         break
// }


@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',
    styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

    @Input('studentId') studentId: string = '';

    @Output() eventCreated: EventEmitter<any> = new EventEmitter();

    eventTypes2LabelMapping: Record<EventTypesEnum, string> = EventTypes2LabelMapping;
    eventTypes: EventTypesEnum[] = Object.values(EventTypesEnum);

    form: FormGroup = this.formBuilder.group({
        id: 0,
        type: ["", Validators.required],
        description: ["", Validators.required],
        date: [new Date, Validators.required],
        studentId: 0
    });

    submitted: boolean = false;

    studentName: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private studentService: StudentsService,
        private location: Location,
        private modal: AlertModalService,
        private router: Router,
        private service: EventsService
    ) { }

    ngOnInit(): void {
        this.studentService.getStudentsById(this.studentId).pipe(take(1))
            .subscribe({
                next: (student: any) => {
                    this.studentName = student.name;
                    this.form.get('studentId')?.setValue(student.id);
                    //  = this.formBuilder.group({
                    //     id: 0,
                    //     type: ["", Validators.required],
                    //     description: ["", Validators.required],
                    //     date: [Date, Validators.required],
                    //     studentId: student.id
                    // });
                }
            });
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            let msgSuccess = 'Evento lançado com sucesso!';
            let msgError = 'Erro ao tentar gravar as informações.';
            
            this.service.createEvent(this.form.value).subscribe({
                next: (success: Event) => {
                    console.log(success);
                    this.modal.showAlertSuccess(msgSuccess);
                    this.eventCreated.emit();
                    // this.location.back();
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
