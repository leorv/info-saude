import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VaccineTaken } from './vaccine-taken';

@Injectable({
    providedIn: 'root'
})
export class VaccinesTakenService {

    private readonly API: string = `${environment.API}vaccinesTaken`

    constructor(private http: HttpClient) { }

    getVaccineTakens(params?: { name: string }): Observable<VaccineTaken[]> {
        if (params) {
            return this.http.get<VaccineTaken[]>(this.API, { params });
        }
        return this.http.get<VaccineTaken[]>(this.API);
    }

    getVaccineTakensByStudentId(studentId: number): Observable<VaccineTaken[]> {
        return this.http.get<VaccineTaken[]>(`${this.API}`, { params: { studentId: studentId } });
    }

    createVaccineTaken(vaccine: VaccineTaken) {
        return this.http.post(`${this.API}`, vaccine).pipe(take(1));
    }

    updateVaccineTaken(vaccine: VaccineTaken) {
        return this.http.put(`${this.API}/${vaccine.id}`, vaccine).pipe(take(1));
    }

    delete(id: number) {
        return this.http.delete(`${this.API}/${id}`).pipe(take(1));
    }
}
