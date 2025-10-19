# Persons Management Frontend

A modern Angular frontend application for managing persons data, designed to work with your ASP.NET Core Web API backend.

## Features

- 📋 **Complete CRUD Operations**
  - View all persons in a responsive table
  - Add new persons with form validation
  - Edit existing person details
  - Delete persons with confirmation
  - View detailed person information

- 🎨 **Modern UI/UX**
  - Bootstrap 5 responsive design
  - Bootstrap Icons for visual elements
  - Mobile-friendly interface
  - Loading states and error handling
  - Smooth animations and transitions

- 🔧 **Technical Features**
  - Angular Reactive Forms with validation
  - HTTP client integration
  - Angular Router for navigation
  - TypeScript interfaces
  - Error handling and user feedback

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── person-list/          # List all persons
│   │   ├── person-form/          # Add/Edit person form
│   │   └── person-detail/        # View person details
│   ├── models/
│   │   └── person.model.ts       # Person interface
│   ├── services/
│   │   └── person.service.ts     # API service
│   ├── app-routing.module.ts     # Route configuration
│   ├── app.module.ts             # Main module
│   └── app.component.*           # Root component
├── index.html                    # Main HTML file
├── main.ts                       # Application bootstrap
└── styles.css                    # Global styles
```

## API Integration

The application is configured to work with your ASP.NET Core API at `https://localhost:7157/api/Persons`.

### API Endpoints Used:
- `GET /api/Persons` - Get all persons
- `GET /api/Persons?id={guid}` - Get person by ID
- `POST /api/Persons` - Create new person
- `PUT /api/Persons` - Update person
- `DELETE /api/Persons?id={guid}` - Delete person

### Person Model:
```typescript
interface Person {
  personId: string;    // GUID
  name?: string;
  email?: string;
  age?: string;
  photoUrl?: string;
}
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd persons-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API URL (if needed):**
   Edit `src/app/services/person.service.ts` and update the `apiUrl` if your backend runs on a different port:
   ```typescript
   private apiUrl = 'https://localhost:7157/api/Persons';
   ```

4. **Run the development server:**
   ```bash
   ng serve
   ```

5. **Open in browser:**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Usage

### Navigation
- **Home/List View**: Shows all persons in a table
- **Add Person**: Click "Add New Person" button
- **Edit Person**: Click pencil icon in the actions column
- **View Details**: Click eye icon or person name
- **Delete Person**: Click trash icon (with confirmation)

### Form Validation
- **Name**: Required, minimum 2 characters
- **Email**: Valid email format (optional)
- **Age**: Number between 0-150 (optional)
- **Photo URL**: Valid HTTP/HTTPS URL (optional)

### Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Photo Preview**: Preview uploaded photo URLs
- **Default Avatar**: Fallback avatar for persons without photos

## CORS Configuration

Make sure your ASP.NET Core API has CORS configured to allow requests from `http://localhost:4200`:

```csharp
// In Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

app.UseCors("AllowAngularApp");
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure CORS is configured in your API
2. **API Connection**: Verify the API URL in `person.service.ts`
3. **Port Conflicts**: Change the Angular dev server port with `ng serve --port 4201`

### API Testing

Test your API endpoints using the included `MyProject.http` file in your backend project.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.