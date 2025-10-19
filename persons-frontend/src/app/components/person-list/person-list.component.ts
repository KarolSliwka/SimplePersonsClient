import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
    persons: Person[] = [];
    loading = false;
    error: string | null = null;

    constructor(
        private personService: PersonService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadPersons();
    }

    loadPersons(): void {
        this.loading = true;
        this.error = null;

        this.personService.getPersons().subscribe({
            next: (data) => {
                this.persons = data;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load persons. Please try again.';
                this.loading = false;
                console.error('Error loading persons:', error);
            }
        });
    }

    viewPerson(id: string): void {
        this.router.navigate(['/person', id]);
    }

    editPerson(id: string): void {
        this.router.navigate(['/person/edit', id]);
    }

    deletePerson(person: Person): void {
        if (confirm(`Are you sure you want to delete ${person.name}?`)) {
            this.personService.deletePerson(person.personId).subscribe({
                next: () => {
                    this.loadPersons(); // Reload the list
                },
                error: (error) => {
                    this.error = 'Failed to delete person. Please try again.';
                    console.error('Error deleting person:', error);
                }
            });
        }
    }

    addNewPerson(): void {
        this.router.navigate(['/person/new']);
    }
}