import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from './event';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private readonly API: string = `${environment.API}events`

    constructor(private http: HttpClient) { }

    getEvents(params?: { description: string }): Observable<Event[]> {
        if (params) {
            return this.http.get<Event[]>(this.API, { params });
        } else {
            return this.http.get<Event[]>(this.API);
        }
    }

    getEventsById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.API}/${id}`);
    }

    getEventsByStudentId(studentId: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.API}`, { params: { studentId: studentId } });
    }

    createEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.API}`, event);
    }

    updateEvent(event: Event) {
        return this.http.put(`${this.API}/${event.id}`, event);
    }

    delete(id: number) {
        return this.http.delete(`${this.API}/${id}`);
    }
}
