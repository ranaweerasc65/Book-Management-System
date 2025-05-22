import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

declare var bootstrap: any;

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  deleting: boolean = false;
  error: string = '';
  successMessage: string = '';
  bookToDelete: Book | null = null;
  private deleteModal: any;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = '';
    
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load books. Please try again.';
        this.loading = false;
        console.error('Error loading books:', error);
      }
    });
  }

  filterBooks(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBooks = this.books;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  }

  confirmDelete(book: Book): void {
    this.bookToDelete = book;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.deleteModal.show();
  }

  cancelDelete(): void {
    if (this.deleteModal) {
      this.deleteModal.hide();
    }
    this.bookToDelete = null;
  }

  deleteBook(): void {
    if (!this.bookToDelete) return;

    this.deleting = true;
    const bookId = this.bookToDelete.id;
    const bookTitle = this.bookToDelete.title;

    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== bookId);
        this.filterBooks();
        this.successMessage = `"${bookTitle}" has been deleted successfully.`;
        this.deleting = false;
        this.cancelDelete();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.error = 'Failed to delete book. Please try again.';
        this.deleting = false;
        console.error('Error deleting book:', error);
      }
    });
  }
}