import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
    selector: 'app-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
    personForm: FormGroup;
    isEditMode = false;
    personId: string | null = null;
    loading = false;
    error: string | null = null;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private personService: PersonService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.personForm = this.formBuilder.group({
            personId: [''],
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.email]],
            age: ['', [Validators.min(0), Validators.max(150)]],
            photoUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]]
        });
    }

    ngOnInit(): void {
        this.personId = this.route.snapshot.params['id'];
        this.isEditMode = !!this.personId;

        if (this.isEditMode && this.personId) {
            this.loadPerson(this.personId);
        } else {
            // Generate new GUID for new person
            this.personForm.patchValue({
                personId: this.generateGuid()
            });
        }
    }

    loadPerson(id: string): void {
        this.loading = true;
        this.error = null;

        this.personService.getPerson(id).subscribe({
            next: (person) => {
                this.personForm.patchValue(person);
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load person details. Please try again.';
                this.loading = false;
                console.error('Error loading person:', error);
            }
        });
    }

    onSubmit(): void {
        this.submitted = true;
        this.error = null;

        if (this.personForm.invalid) {
            return;
        }

        this.loading = true;
        const person: Person = this.personForm.value;

        const operation = this.isEditMode
            ? this.personService.updatePerson(person)
            : this.personService.addPerson(person);

        operation.subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/persons']);
            },
            error: (error) => {
                this.error = `Failed to ${this.isEditMode ? 'update' : 'create'} person. Please try again.`;
                this.loading = false;
                console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} person:`, error);
            }
        });
    }

    onCancel(): void {
        this.router.navigate(['/persons']);
    }

    // Helper method to generate GUID
    private generateGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Getter for easy access to form fields in template
    get f() {
        return this.personForm.controls;
    }

    // Helper methods for validation
    isFieldInvalid(fieldName: string): boolean {
        const field = this.personForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
    }

    getFieldError(fieldName: string): string {
        const field = this.personForm.get(fieldName);
        if (field && field.errors) {
            if (field.errors['required']) return `${fieldName} is required`;
            if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
            if (field.errors['email']) return 'Please enter a valid email address';
            if (field.errors['min']) return `${fieldName} must be greater than ${field.errors['min'].min}`;
            if (field.errors['max']) return `${fieldName} must be less than ${field.errors['max'].max}`;
            if (field.errors['pattern']) return 'Please enter a valid URL (http:// or https://)';
        }
        return '';
    }

    onImageError(event: Event): void {
        const imgElement = event.target as HTMLImageElement;
        if (imgElement) {
            imgElement.style.display = 'none';
        }
    }
}