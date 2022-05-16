import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './student';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private readonly API: string = `${environment.API}students`

    constructor(private http: HttpClient) { }

    getStudents(params?: { search: string, fields: string }): Observable<Student[]> {
        if (params) {
            return this.http.get<Student[]>(this.API, { params }).pipe(take(1));
        } else {
            return this.http.get<Student[]>(this.API).pipe(take(1));
        }
    }

    getStudentsById(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.API}/${id}`).pipe(take(1));
    }

    updateStudent(student: Student) {
        return this.http.put(`${this.API}/${student.id}`, student).pipe(take(1));
    }
}
