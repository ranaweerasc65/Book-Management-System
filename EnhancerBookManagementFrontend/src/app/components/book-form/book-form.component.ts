import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CreateBookDto, UpdateBookDto } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId: number | null = null;
  submitting = false;
  error = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookId = +params['id'];
        this.loadBook();
      }
    });
  }

  private initializeForm(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.required, Validators.maxLength(20)]],
      publicationDate: ['', Validators.required]
    });
  }

  private loadBook(): void {
    if (!this.bookId) return;

    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        const formattedDate = this.formatDateForInput(book.publicationDate);
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationDate: formattedDate
        });
      },
      error: (error) => {
        this.error = 'Failed to load book details. Please try again.';
        console.error('Error loading book:', error);
      }
    });
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    this.error = '';
    this.successMessage = '';

    const formData = this.bookForm.value;
    const bookData = {
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      publicationDate: new Date(formData.publicationDate)
    };

    if (this.isEditMode && this.bookId) {
      this.updateBook(bookData as UpdateBookDto);
    } else {
      this.createBook(bookData as CreateBookDto);
    }
  }

  private createBook(bookData: CreateBookDto): void {
    this.bookService.createBook(bookData).subscribe({
      next: (book) => {
        this.successMessage = `"${book.title}" has been added successfully!`;
        this.submitting = false;
        
        // Redirect after success
        setTimeout(() => {
          this.router.navigate(['/books']);
        }, 1500);
      },
      error: (error) => {
        this.error = 'Failed to add book. Please check your input and try again.';
        this.submitting = false;
        console.error('Error creating book:', error);
      }
    });
  }

  private updateBook(bookData: UpdateBookDto): void {
    if (!this.bookId) return;

    this.bookService.updateBook(this.bookId, bookData).subscribe({
      next: (book) => {
        this.successMessage = `"${book.title}" has been updated successfully!`;
        this.submitting = false;
        
        // Redirect after success
        setTimeout(() => {
          this.router.navigate(['/books']);
        }, 1500);
      },
      error: (error) => {
        this.error = 'Failed to update book. Please check your input and try again.';
        this.submitting = false;
        console.error('Error updating book:', error);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bookForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.bookForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.get(key)?.markAsTouched();
    });
  }
}