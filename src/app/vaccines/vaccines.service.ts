import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vaccine } from './vaccine';

@Injectable({
    providedIn: 'root'
})
export class VaccinesService {

    private readonly API: string = `${environment.API}vaccines/`

    constructor(private http: HttpClient) { }

    getVaccines(name?: string): Observable<Vaccine[]> {
        if (name) {
            return this.http.get<Vaccine[]>(`${this.API}getByName/${name}`);
        } else {
            return this.http.get<Vaccine[]>(this.API);
        }
    }

    getVaccinesById(id: number): Observable<Vaccine> {
        return this.http.get<Vaccine>(`${this.API}${id}`);
    }

    createVaccine(vaccine: Vaccine) {
        return this.http.post(`${this.API}create`, vaccine).pipe(take(1));
    }

    updateVaccine(vaccine: Vaccine) {
        return this.http.put(`${this.API}update`, vaccine).pipe(take(1));
    }

    delete(id: string) {
        return this.http.delete(`${this.API}delete/${id}`).pipe(take(1));
    }
}
