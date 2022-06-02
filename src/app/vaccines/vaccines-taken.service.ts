import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VaccineTaken } from './vaccine-taken';

@Injectable({
    providedIn: 'root'
})
export class VaccinesTakenService {

    private readonly API: string = `${environment.API}vaccinesTaken/`

    constructor(private http: HttpClient) { }

    getVaccineTakens(): Observable<VaccineTaken[]> {
        // if (name) {
        //     return this.http.get<VaccineTaken[]>(`${this.API}`);
        // }
        return this.http.get<VaccineTaken[]>(this.API);
    }

    getVaccineTakensById(id: string): Observable<VaccineTaken[]> {
        return this.http.get<VaccineTaken[]>(`${this.API}${id}`);
    }


    getVaccineTakensByStudentId(studentId: string): Observable<VaccineTaken[]> {
        // return this.http.get<VaccineTaken[]>(`${this.API}`, { params: { studentId: studentId } });
        return this.http.get<VaccineTaken[]>(`${this.API}getByStudentId/${studentId}`);
    }

    createVaccineTaken(vaccine: VaccineTaken) {
        return this.http.post(`${this.API}create`, vaccine).pipe(take(1));
    }

    updateVaccineTaken(vaccine: VaccineTaken) {
        return this.http.put(`${this.API}update`, vaccine).pipe(take(1));
    }

    delete(id: string) {
        return this.http.delete(`${this.API}delete/${id}`).pipe(take(1));
    }
}
