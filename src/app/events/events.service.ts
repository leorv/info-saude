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
        return this.http.get<Event>(`${this.API}/${id}`).pipe(take(1));
    }

    getEventsByStudentId(studentId: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.API}`, { params: { studentId: studentId } }).pipe(take(1));
    }

    createEvent(event: Event) {
        return this.http.post(`${this.API}`, event).pipe(take(1));
    }

    updateEvent(event: Event) {
        return this.http.put(`${this.API}/${event.id}`, event).pipe(take(1));
    }

    delete(id: number) {
        return this.http.delete(`${this.API}/${id}`).pipe(take(1));
    }
}
