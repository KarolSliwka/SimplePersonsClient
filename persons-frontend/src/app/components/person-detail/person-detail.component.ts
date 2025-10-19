import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html',
    styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
    person: Person | null = null;
    loading = false;
    error: string | null = null;
    personId: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private personService: PersonService
    ) {
        this.personId = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        if (this.personId) {
            this.loadPerson();
        } else {
            this.error = 'No person ID provided';
        }
    }

    loadPerson(): void {
        this.loading = true;
        this.error = null;

        this.personService.getPerson(this.personId).subscribe({
            next: (data) => {
                this.person = data;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load person details. Person may not exist.';
                this.loading = false;
                console.error('Error loading person:', error);
            }
        });
    }

    editPerson(): void {
        this.router.navigate(['/person/edit', this.personId]);
    }

    deletePerson(): void {
        if (this.person && confirm(`Are you sure you want to delete ${this.person.name}?`)) {
            this.loading = true;
            this.personService.deletePerson(this.personId).subscribe({
                next: () => {
                    this.router.navigate(['/persons']);
                },
                error: (error) => {
                    this.error = 'Failed to delete person. Please try again.';
                    this.loading = false;
                    console.error('Error deleting person:', error);
                }
            });
        }
    }

    goBack(): void {
        this.router.navigate(['/persons']);
    }
}