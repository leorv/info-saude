import { Student } from './../student';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html',
    styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

    queryField: FormControl = new FormControl;
    results$: Observable<Student[]> = new Observable();
    total: number = 0;

    readonly fields: string = 'id, name, lastName, grade';

    constructor(
        private studentsService: StudentsService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.results$ = this.queryField.valueChanges
            .pipe(
                map(value => value.trim()),
                filter(value => value.length > 1),
                debounceTime(400),
                distinctUntilChanged(),
                // tap(value => console.log(value)),
                switchMap(value => this.studentsService.getStudents({
                    search: value,
                    fields: this.fields
                })),
                tap((res: Student[]) => this.total = res.length)
            );
    }

    onSearch() {
        // console.log(this.queryField.value);
        let value: string = this.queryField.value;
        // const fields: string = 'name,description,version,alternativeNames,license,homepage,repository,author,originalName';

        if (value && value.trim() != '') {
            value = value.trim();

            // const params = {
            //     search: value,
            //     fields: this.fields
            // }

            // let params = new HttpParams();
            // params = params.set('search', value);
            // params = params.set('fields', fields);

            this.results$ = this.studentsService.getStudents()
                .pipe(
                    tap((res: Student[]) => this.total = res.length)
                    // map((res: Student[]) => res.results)
                );
        }
    }

    // onDetails(id: number){
    //     this.router.navigate(['details', id], { relativeTo: this.route })
    // }

    // onEditStudent(id: number){
    //     this.router.navigate(['edit', id], { relativeTo: this.route});
    // }
}
