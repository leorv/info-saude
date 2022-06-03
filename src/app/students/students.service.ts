import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './student';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private readonly API: string = `${environment.API}students/`

    constructor(private http: HttpClient) { }

    getStudents(name?: string): Observable<Student[]> {
        if (name) {
            return this.http.get<Student[]>(`${this.API}getByName/${name}`);
        } else {
            return this.http.get<Student[]>(this.API);
        }
    }

    getStudentsById(id: string): Observable<Student> {
        return this.http.get<Student>(`${this.API}${id}`);
    }

    createStudent(student: Student) {
        return this.http.post(`${this.API}create`, student);
    }

    updateStudent(student: Student) {
        return this.http.put(`${this.API}update/${student.id}`, student);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.API}delete/${id}`);
    }
}
