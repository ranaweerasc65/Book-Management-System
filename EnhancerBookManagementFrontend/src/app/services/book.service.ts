import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book, CreateBookDto, UpdateBookDto } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7070/api/books';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      map(books => books.map(book => ({
        ...book,
        publicationDate: new Date(book.publicationDate)
      }))),
      catchError(this.handleError)
    );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      map(book => ({
        ...book,
        publicationDate: new Date(book.publicationDate)
      })),
      catchError(this.handleError)
    );
  }

  createBook(book: CreateBookDto): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      map(newBook => ({
        ...newBook,
        publicationDate: new Date(newBook.publicationDate)
      })),
      catchError(this.handleError)
    );
  }

  updateBook(id: number, book: UpdateBookDto): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book).pipe(
      map(updatedBook => ({
        ...updatedBook,
        publicationDate: new Date(updatedBook.publicationDate)
      })),
      catchError(this.handleError)
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}