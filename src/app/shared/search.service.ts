import { environment } from './../../environments/environment';
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
}