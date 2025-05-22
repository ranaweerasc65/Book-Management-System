using EnhancerBookManagement.API.DTOs;
using EnhancerBookManagement.API.Models;
using EnhancerBookManagement.API.Services;

namespace EnhancerBookManagement.API.Services
{
    public class BookService : IBookService
    {
        private static List<Book> _books = new List<Book>
        {
            new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", ISBN = "9780743273565", PublicationDate = new DateTime(1925, 4, 10) },
            new Book { Id = 2, Title = "To Kill a Mockingbird", Author = "Harper Lee", ISBN = "9780061120084", PublicationDate = new DateTime(1960, 7, 11) },
            new Book { Id = 3, Title = "SANDAGIRA ASABADA", Author = "Sudusinghe S", ISBN = "9786245710911", PublicationDate = new DateTime(2009, 6, 8) },
            new Book { Id = 4, Title = "Percy Jackson Saha Raksha Sayura-පර්සි ජැක්සන් සහ රාක්ෂ සයුර", Author = "Savindi Ariyathilake", ISBN = "23902863745", PublicationDate = new DateTime(2020, 10, 11) }


        };

        private static int _nextId = 4;

        public async Task<IEnumerable<BookDto>> GetAllBooksAsync()
        {
            await Task.Delay(10); 

            return _books.Select(book => new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                ISBN = book.ISBN,
                PublicationDate = book.PublicationDate
            }).OrderBy(b => b.Title);
        }

        public async Task<BookDto?> GetBookByIdAsync(int id)
        {
            await Task.Delay(10);

            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return null;

            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                ISBN = book.ISBN,
                PublicationDate = book.PublicationDate
            };
        }

        public async Task<BookDto> CreateBookAsync(CreateBookDto createBookDto)
        {
            await Task.Delay(10); 

            var book = new Book
            {
                Id = _nextId++,
                Title = createBookDto.Title,
                Author = createBookDto.Author,
                ISBN = createBookDto.ISBN,
                PublicationDate = createBookDto.PublicationDate,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _books.Add(book);

            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                ISBN = book.ISBN,
                PublicationDate = book.PublicationDate
            };
        }

        public async Task<BookDto?> UpdateBookAsync(int id, UpdateBookDto updateBookDto)
        {
            await Task.Delay(10); 

            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return null;

            book.Title = updateBookDto.Title;
            book.Author = updateBookDto.Author;
            book.ISBN = updateBookDto.ISBN;
            book.PublicationDate = updateBookDto.PublicationDate;
            book.UpdatedAt = DateTime.UtcNow;

            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                ISBN = book.ISBN,
                PublicationDate = book.PublicationDate
            };
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            await Task.Delay(10); 

            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return false;

            _books.Remove(book);
            return true;
        }
    }
}