# ProfilePro AI

A modern web application that leverages AI to generate professional portfolios. Built with React, TypeScript, and powered by Google's Gemini AI.

## 🚀 Features

- AI-powered portfolio generation using Google's Gemini
- Modern, responsive UI built with Tailwind CSS and shadcn/ui
- User authentication with Firebase
- Real-time portfolio preview
- Mobile-friendly design
- Accessible components following WCAG guidelines

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **Authentication**: Firebase
- **AI Integration**: Google's Generative AI (Gemini)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key
- Firebase project setup

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/profile-pro-ai.git
   cd profile-pro-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🔑 API Configuration

### Google Gemini API

1. Visit the [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the API key to your `.env` file as `VITE_GEMINI_API_KEY`

### Firebase Configuration

1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Get your Firebase configuration from the project settings
4. Add the configuration to your `.env` file

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React contexts (Auth, Theme, etc.)
├── lib/          # Utility functions and configurations
├── pages/        # Page components
├── types/        # TypeScript type definitions
└── App.tsx       # Main application component
```

## 🎨 UI Components

The project uses shadcn/ui components, which are built on top of Radix UI primitives and styled with Tailwind CSS. Key components include:

- Dialog
- Sheet
- Button
- Form
- Input
- Card
- Alert
- Toast

## 🔒 Authentication

The application uses Firebase Authentication for user management. Features include:

- Email/Password authentication
- Protected routes
- Session persistence
- Secure logout

## 🤖 AI Integration

The portfolio generation feature uses Google's Gemini AI to:

- Generate professional content based on user input
- Create personalized sections
- Optimize content for different industries
- Provide real-time suggestions

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@profileproai.com or open an issue in the repository.
