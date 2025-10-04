# Quiz Maker Frontend

A modern, interactive quiz application built with React that allows users to study through customizable quizzes, track their progress, and review incorrect answers.

## Features

- **Interactive Quiz System**: Take quizzes organized by subjects and chapters
- **Customizable Quiz Sessions**: Select specific chapters and shuffle questions for varied practice
- **Review Mode**: Focus on previously incorrect answers to improve weak areas
- **Progress Tracking**: Monitor your performance and identify topics that need more attention
- **Admin Dashboard**: Manage subjects and upload quiz content via CSV files
- **Search Functionality**: Look up terms and definitions through integrated Wikipedia search
- **Responsive Design**: Clean, modern interface built with Tailwind CSS

## Prerequisites

- Node.js 14.0 or higher
- npm or yarn package manager
- Backend API server (see [quiz-maker-backend](../quiz-maker-backend) repository)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quiz-maker-frontend.git
cd quiz-maker-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
# Admin credentials
REACT_APP_ADMIN_USERNAME=your_admin_username
REACT_APP_ADMIN_PASSWORD=your_secure_password

# Backend API URL
REACT_APP_API_URL=http://localhost:5005
```

## Usage

### Starting the Application

Run the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build` folder, ready for deployment.

## Application Structure

### Main Features

1. **Home Page**: Browse and select available subjects
2. **Quiz Interface**:
   - Answer multiple-choice questions
   - Get immediate feedback with explanations
   - Track correct/incorrect answers
3. **Review Dashboard**: Analyze your performance statistics
4. **Admin Panel** (`/admin`):
   - Upload quiz data via CSV files
   - Manage subjects and questions
   - Edit subject names

### CSV Format for Quiz Upload

The application accepts CSV files with the following structure:

**Required Columns:**
- `subject`: The subject name
- `chapter`: Chapter or topic name
- `type`: Question type (MCQ supported)
- `question`: The question text
- `answers`: Comma-separated numbers of correct options (e.g., "1,3")
- `explanation`: Explanation for the answer
- `option_1` to `option_6`: Answer choices (minimum 2 required)

**Example CSV:**
```csv
subject,chapter,type,question,option_1,option_2,option_3,answers,explanation
Math,Algebra,MCQ,What is 2+2?,3,4,5,2,Basic addition
```

A sample CSV template is available for download in the Admin panel.

## Technologies Used

- **React 18**: Core framework
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library

## Project Structure

```
src/
├── components/
│   ├── Admin/          # Admin panel components
│   ├── Chapters/       # Chapter selection components
│   ├── Review/         # Review statistics components
│   ├── Question.jsx    # Quiz question display
│   ├── Quiz.jsx        # Main quiz logic
│   └── SubjectChapters.jsx
├── pages/
│   ├── Home.jsx        # Subject selection
│   ├── Review.jsx      # Performance review
│   └── Search.jsx      # Term search
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development

### Available Scripts

- `npm start`: Run development server
- `npm test`: Launch test runner
- `npm run build`: Create production build
- `npm run lint`: Run ESLint checks

### Code Style

This project uses ESLint for code quality. Run linting before committing:
```bash
npm run lint
```

## Deployment

The application can be deployed to any static hosting service:

1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Configure environment variables on your hosting platform
4. Ensure the backend API is accessible from your deployed frontend

Popular hosting options:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainers.

## Acknowledgments

- Built with Create React App
- Icons provided by React Icons
- Styling powered by Tailwind CSS