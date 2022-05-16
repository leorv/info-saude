import { environment } from './../../environments/environment';
import { Student } from './../students/student';
import { delay, map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private readonly API: string = `${environment.API}students`

    constructor(
        private http: HttpClient
    ) { }


    getStudents(params?: { search: string, fields: string }): Observable<Student[]> {
        if (params) {
            return this.http.get<Student[]>(this.API, { params });
        } else {
            return this.http.get<Student[]>(this.API);
        }
    }

    getStudentsById(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.API}/${id}`);
    }

    // getStudentsByName(name: string): Observable<Student[]>{
    //     return this.http.get<Student[]>(this.API, )
    //         .pipe(
    //             delay(1500),

    //             tap(console.log)
    //         );
    // }
}