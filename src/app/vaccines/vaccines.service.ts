import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vaccine } from './vaccine';

@Injectable({
    providedIn: 'root'
})
export class VaccinesService {

    private readonly API: string = `${environment.API}vaccines`

    constructor(private http: HttpClient) { }

    getVaccines(params?: { name: string }): Observable<Vaccine[]> {
        if (params) {
            return this.http.get<Vaccine[]>(this.API, { params });
        } else {
            return this.http.get<Vaccine[]>(this.API);
        }
    }

    getVaccinesById(id: number): Observable<Vaccine> {
        return this.http.get<Vaccine>(`${this.API}/${id}`).pipe(take(1));
    }

    createVaccine(vaccine: Vaccine) {
        return this.http.post(`${this.API}`, vaccine).pipe(take(1));
    }

    updateVaccine(vaccine: Vaccine) {
        return this.http.put(`${this.API}/${vaccine.id}`, vaccine).pipe(take(1));
    }

    delete(id: number) {
        return this.http.delete(`${this.API}/${id}`).pipe(take(1));
    }
}
