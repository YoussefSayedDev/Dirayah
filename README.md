# Dirayah Learning Management System 🎓

![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38b2ac?logo=tailwindcss)
![License](https://img.shields.io/github/license/YoussefSayedDev/dirayah)

## Overview

Dirayah is a comprehensive Learning Management System (LMS) designed to facilitate educational interactions between students, teachers, parents, and administrators. The platform offers a modern, responsive interface with multilingual support (Arabic and English) and role-based access control.

## 🔍 Demo

You can check out the live version of Dirayah here:  
👉 [Live Preview](https://dirayah.vercel.app)

---

## 🖼 Screenshots

> ✨ Screenshots of the application in different languages.

**Sign In Page:**

![Sign In Page English](./public/screenshots/sign-in-en.png)

![Sign In Page Arabic](./public/screenshots/sign-in-ar.png)

**Onboarding Page:**

![Onboarding Page English](./public/screenshots/onboarding-page-en.png)

![Onboarding Page Arabic](./public/screenshots/onboarding-page-ar.png)

---

**Role Selection Page:**

![Role Selection Page English](./public/screenshots/role-page-en.png)

![Role Selection Page Arabic](./public/screenshots/role-page-ar.png)

---

**Student Profile Page:**

![Student Profile Page English](./public/screenshots/student-profile-en.png)

![Student Profile Page Arabic](./public/screenshots/student-profile-ar.png)

---

## ✨ Features

- **User Authentication**

  - Multi-provider authentication (Credentials, Google, Facebook)
  - Session management
  - Protected routes
  - Email verification

- **Multilingual Support**

  - Full Arabic and English localization
  - RTL/LTR layout handling
  - Language switching

- **Role-Based Access Control**

  - Student dashboard
  - Teacher dashboard
  - Parent dashboard
  - Admin dashboard

- **Educational Tools**

  - Course management
  - Homework assignments
  - Test/exam creation and grading
  - Student progress tracking

- **User Experience**
  - Responsive design
  - Customized onboarding flow
  - Modern UI with ShadCN components
  - Dark/light theme support

## 🛠️ Technologies Used

### Frontend

- **Next.js 15** - React framework with server components
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **ShadCN UI** - Component library based on Radix UI
- **Next-Intl** - Internationalization library
- **Next-Auth** - Authentication solution
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend

- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database
- **Next.js API Routes** - Backend API endpoints

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/YoussefSayedDev/dirayah.git
   cd dirayah
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/dirayah"

   # Next Auth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   FACEBOOK_CLIENT_ID="your-facebook-client-id"
   FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
   ```

4. Initialize the database

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. Start the development server

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Folder Structure

```
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js app router
│   │   ├── [locale]/     # Localized routes
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   ├── onboarding/   # Onboarding flow components
│   │   ├── shared/       # Shared components
│   │   └── ui/           # UI components (ShadCN)
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization config
│   ├── lib/              # Utility functions and libraries
│   │   ├── api/          # API utilities
│   │   └── auth/         # Auth utilities
│   ├── messages/         # Localization messages
│   ├── providers/        # React context providers
│   └── types/            # TypeScript type definitions
├── .env                  # Environment variables
├── next.config.ts        # Next.js configuration
└── package.json          # Project dependencies
```

## 🌐 Deployment

Dirayah can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Configure the environment variables
4. Deploy

Alternatively, you can build the project for production:

```bash
pnpm build
pnpm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ by Youssef El Sayed
