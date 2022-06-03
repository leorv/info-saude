import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from './event';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private readonly API: string = `${environment.API}events/`

    constructor(private http: HttpClient) { }

    getEvents(type?: string ): Observable<Event[]> {
        if (type) {
            return this.http.get<Event[]>(`${this.API}getEventsByType/${type}`);
        } else {
            return this.http.get<Event[]>(this.API);
        }
    }

    getEventsById(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.API}${id}`);
    }

    getEventsByStudentId(studentId: string): Observable<Event[]> {
        // return this.http.get<Event[]>(`${this.API}`, { params: { studentId: studentId } });
        return this.http.get<Event[]>(`${this.API}getByStudentId/${studentId}`);
    }

    getEventsByType(type: string): Observable<Event[]> {
        // return this.http.get<Event[]>(`${this.API}`, { params: { type: type } });
        return this.http.get<Event[]>(`${this.API}getEventsByType/${type}`);
    }

    createEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.API}create`, event);
    }

    updateEvent(event: Event) {
        return this.http.put(`${this.API}update`, event);
    }

    delete(id: string) {
        return this.http.delete(`${this.API}delete/${id}`);
    }
}
