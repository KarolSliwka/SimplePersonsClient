import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private apiUrl = `${environment.apiUrl}/Persons`;
    
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    // Get all persons
    getPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get person by ID
    getPerson(id: string): Observable<Person> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Person>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Add new person
    addPerson(person: Person): Observable<Person> {
        return this.http.post<Person>(this.apiUrl, person, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Update person
    updatePerson(person: Person): Observable<Person> {
        return this.http.put<Person>(this.apiUrl, person, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Delete person
    deletePerson(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Error handling
    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => error);
    }
}