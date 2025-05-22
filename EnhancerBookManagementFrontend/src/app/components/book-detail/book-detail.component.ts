import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

declare var bootstrap: any;

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  bookId: number | null = null;
  loading = false;
  deleting = false;
  error = '';
  private deleteModal: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.bookId = +params['id'];
        this.loadBook();
      }
    });
  }

  loadBook(): void {
    if (!this.bookId) return;

    this.loading = true;
    this.error = '';

    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load book details. Please try again.';
        this.loading = false;
        console.error('Error loading book:', error);
      }
    });
  }

  getYearsSincePublication(): number {
    if (!this.book) return 0;
    const currentYear = new Date().getFullYear();
    const publicationYear = new Date(this.book.publicationDate).getFullYear();
    return currentYear - publicationYear;
  }

  getPublicationEra(): string {
    if (!this.book) return 'Unknown';
    const year = new Date(this.book.publicationDate).getFullYear();
    
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '1990s';
    if (year >= 1980) return '1980s';
    if (year >= 1970) return '1970s';
    if (year >= 1960) return '1960s';
    if (year >= 1950) return '1950s';
    return 'Classic';
  }

  confirmDelete(): void {
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.deleteModal.show();
  }

  cancelDelete(): void {
    if (this.deleteModal) {
      this.deleteModal.hide();
    }
  }

  deleteBook(): void {
    if (!this.book || !this.bookId) return;

    this.deleting = true;

    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.deleting = false;
        this.cancelDelete();
        this.router.navigate(['/books'], { 
          queryParams: { deleted: this.book?.title } 
        });
      },
      error: (error) => {
        this.error = 'Failed to delete book. Please try again.';
        this.deleting = false;
        console.error('Error deleting book:', error);
      }
    });
  }
}