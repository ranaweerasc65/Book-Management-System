# 📚 EnhancerBookManagement

A modern, full-stack web application for managing your digital book library with a beautiful user interface and robust backend API.

## 🌟 Features

### ✨ Frontend Features
- **Modern UI/UX** - Beautiful gradient-based design with smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Book Management** - Complete CRUD operations (Create, Read, Update, Delete)
- **Search & Filter** - Real-time search functionality by title or author
- **Form Validation** - Client-side validation with real-time feedback
- **Loading States** - Professional loading indicators and error handling
- **Confirmation Dialogs** - Safe delete operations with confirmation modals

### 🔧 Backend Features
- **RESTful API** - Clean, well-structured API endpoints
- **Data Validation** - Server-side validation and error handling
- **Swagger Documentation** - Interactive API documentation
- **CORS Support** - Configured for frontend integration
- **In-Memory Storage** - Quick setup with sample data
- **Error Handling** - Comprehensive error responses

## 🛠️ Technology Stack

### Frontend
- **Angular 19** - Modern web framework with standalone components
- **TypeScript** - Type-safe development
- **Bootstrap 5** - Responsive CSS framework
- **Font Awesome** - Beautiful icons

### Backend
- **ASP.NET Core Web API** - High-performance web API
- **C#** - Modern programming language
- **.NET 8** - Latest framework features
- **Swagger/OpenAPI** - API documentation

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Visual Studio 2022** (Community/Professional/Enterprise)
- **Visual Studio Code**
- **Node.js**  - [Download here](https://nodejs.org/)
- **Angular CLI** - Install with `npm install -g @angular/cli`
- **.NET SDK**  - [Download here](https://dotnet.microsoft.com/download)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/enhancer-book-management.git
cd enhancer-book-management
```

### 2. Backend Setup (ASP.NET Core API)

1. **Open Visual Studio 2022**
2. **Open** the `EnhancerBookManagement.API.sln` solution file
3. **Restore NuGet packages** (Visual Studio will do this automatically)
4. **Build the solution** (`Ctrl + Shift + B`)
5. **Run the project** (`F5` or `Ctrl + F5`)

The API will start on `https://localhost:7266` (or similar port)

#### API Endpoints
- **GET** `/api/books` - Get all books
- **GET** `/api/books/{id}` - Get book by ID
- **POST** `/api/books` - Create new book
- **PUT** `/api/books/{id}` - Update existing book
- **DELETE** `/api/books/{id}` - Delete book

### 3. Frontend Setup (Angular)

1. **Navigate to frontend directory**
```bash
cd enhancer-book-management-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Update API URL** (if needed)
   - Open `src/app/services/book.service.ts`
   - Update `apiUrl` to match your backend port

4. **Start the development server**
```bash
ng serve
```

The application will open at `http://localhost:4200`

## 📱 Usage

### Adding a New Book
1. Click the **"Add New Book"** button on the main page
2. Fill in all required fields (Title, Author, ISBN, Publication Date)
3. Click **"Add Book"** to save

### Viewing Book Details
1. Click on any book title or the **"View"** button
2. See complete book information and statistics
3. Access quick actions (Edit/Delete)

### Editing a Book
1. Click the **"Edit"** button on any book
2. Update the information in the form
3. Click **"Update Book"** to save changes

### Deleting a Book
1. Click the **"Delete"** button
2. Confirm the deletion in the modal dialog
3. The book will be permanently removed

### Searching Books
- Use the search bar to find books by title or author
- Results update in real-time as you type

## 🏗️ Project Structure

```
EnhancerBookManagement/
├── EnhancerBookManagement.API/
│   ├── Controllers/
│   │   └── BooksController.cs
│   ├── Models/
│   │   └── Book.cs
│   ├── Services/
│   │   ├── IBookService.cs
│   │   └── BookService.cs
│   ├── DTOs/
│   │   └── BookDto.cs
│   └── Program.cs
├── EnhancerBookManagementFrontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── book-list/
│   │   │   │   ├── book-form/
│   │   │   │   └── book-detail/
│   │   │   ├── services/
│   │   │   │   └── book.service.ts
│   │   │   ├── models/
│   │   │   │   └── book.ts
│   │   │   └── app.component.ts
│   │   └── styles.css
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Backend Configuration
- **CORS**: Configured to allow requests from `http://localhost:4200`
- **Swagger**: Available at `/swagger` endpoint
- **HTTPS**: Enabled by default for secure communication

### Frontend Configuration
- **API Base URL**: Configurable in `book.service.ts`
- **Routing**: Configured for single-page application experience
- **Responsive Breakpoints**: Bootstrap 5 standard breakpoints

## 🧪 Testing

### Backend Testing
1. **Run the API project**
2. **Navigate to Swagger UI** at `https://localhost:7266/swagger`
3. **Test all endpoints** using the interactive documentation

### Frontend Testing
1. **Start both backend and frontend**
2. **Test all CRUD operations**:
   - ✅ Create new books
   - ✅ View book list and details
   - ✅ Update existing books
   - ✅ Delete books with confirmation
   - ✅ Search functionality

## 🚨 Troubleshooting

### Common Issues

#### CORS Errors
- Ensure the backend is running on the correct port
- Check CORS configuration in `Program.cs`
- Verify the frontend API URL matches the backend port

#### Build Errors
- **Frontend**: Run `npm install` to ensure all dependencies are installed
- **Backend**: Restore NuGet packages in Visual Studio

#### Port Conflicts
- **Backend**: Change port in `launchSettings.json`
- **Frontend**: Use `ng serve --port 4201` for different port

### Debug Mode
- **Backend**: Run with `F5` in Visual Studio for debugging
- **Frontend**: Use browser developer tools for debugging

## 🔮 Future Enhancements

- [ ] **Database Integration** (SQL Server/PostgreSQL)
- [ ] **User Authentication** and authorization
- [ ] **Book Categories** and tagging system
- [ ] **Image Upload** for book covers
- [ ] **Import/Export** functionality (CSV, Excel)
- [ ] **Advanced Search** with filters
- [ ] **Reading Lists** and favorites
- [ ] **Book Reviews** and ratings
- [ ] **Dark Mode** theme option
- [ ] **Offline Support** with PWA features

## 👥 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- **Angular Team** for the amazing framework
- **Microsoft** for ASP.NET Core
- **Bootstrap Team** for the responsive framework
- **Font Awesome** for the beautiful icons
