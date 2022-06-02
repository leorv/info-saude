import { StudentsService } from './../students.service';
import { SearchService } from './../../shared/search.service';
import { Student } from './../student';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';

@Component({
    selector: 'app-students-details',
    templateUrl: './students-details.component.html',
    styleUrls: ['./students-details.component.css']
})
export class StudentsDetailsComponent implements OnInit {

    student: Student = { id: "", name: '', gender: '', birthDate: new Date, grade: '', cpf: 0, events: []};

    showEvents: boolean = false;
    showVaccinesTaken: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private service: StudentsService
    ) { }

    ngOnInit(): void {
        this.route.params.pipe(
            map((params: any) => {
                const id = params['id'];
                return id;
            }),
            switchMap((id: string) => this.service.getStudentsById(id))
        ).subscribe((student: Student) => {
            this.student = student;
            console.log(this.student);
            this.showEvents = true
            this.showVaccinesTaken = true;
        });
    }

    eventCreated(){
        this.showEvents = false;
        setTimeout(() => {
            this.showEvents = true;
        }, 500);
    }

    vaccineCreated(){
        this.showVaccinesTaken = false;
        setTimeout(() => {
            this.showVaccinesTaken = true;
        }, 500);
    }
    

}
