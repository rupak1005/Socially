<div align="center">

# Socially - Full-Stack Social Media Platform

A modern, full-featured social media platform built with Next.js 15, featuring real-time interactions, user authentication, and a beautiful responsive design.

<img width="600" height="600" alt="icon" src="https://github.com/user-attachments/assets/42ff96d7-51d4-432e-95ec-db8b575e0dc6" />

### [Live Link](https://socially-neon.vercel.app/)

</div>

##  Features

### Core Functionality
- **User Authentication** - Secure sign-up/sign-in with Clerk
- **Post Creation** - Create text and image posts
- **Real-time Interactions** - Like, comment, and share posts
- **User Profiles** - Customizable profiles with bio, location, and website
- **Follow System** - Follow/unfollow users and build your network
- **Notifications** - Real-time notifications for likes, comments, and follows
- **Image Uploads** - Seamless image uploads with UploadThing
- **Dark/Light Mode** - Beautiful theme switching
- **Responsive Design** - Mobile-first, responsive across all devices

### Advanced Features
- **Activity Dashboard** - Track your posts, followers, and engagement
- **User Recommendations** - Discover new people to follow
- **Optimistic UI Updates** - Instant feedback for better UX
- **Server-Side Rendering** - Fast page loads and SEO optimization
- **Type Safety** - Full TypeScript implementation
- **Error Handling** - Graceful error boundaries and fallbacks

## 🛠 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)** - Type-safe server functions

### Authentication & File Storage
- **[Clerk](https://clerk.com/)** - Complete authentication solution
- **[UploadThing](https://uploadthing.com/)** - File uploads made easy

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[React Hot Toast](https://react-hot-toast.com/)** - Beautiful notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.0 or later
- npm, yarn, or pnpm
- PostgreSQL database
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/socially.git
cd socially/my-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/socially"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# UploadThing
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure
```
my-app/
├── prisma/
│ └── schema.prisma # Database schema
├── src/
│ ├── actions/ # Server actions
│ │ ├── notification.action.ts
│ │ ├── post.action.ts
│ │ ├── profile.action.ts
│ │ └── user.action.ts
│ ├── app/ # App Router pages
│ │ ├── api/
│ │ │ └── uploadthing/ # File upload API
│ │ ├── notifications/ # Notifications page
│ │ ├── profile/
│ │ │ └── [username]/ # Dynamic user profiles
│ │ ├── globals.css # Global styles
│ │ ├── layout.tsx # Root layout
│ │ └── page.tsx # Home page
│ ├── components/ # Reusable components
│ │ ├── ui/ # Shadcn/ui components
│ │ ├── CreatePost.tsx
│ │ ├── PostCard.tsx
│ │ ├── Navbar.tsx
│ │ └── ...
│ ├── lib/ # Utility libraries
│ │ ├── prisma.ts # Prisma client
│ │ ├── uploadthing.ts # UploadThing config
│ │ └── utils.ts # Utility functions
│ └── middleware.ts # Clerk middleware
├── public/ # Static assets
├── package.json
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json # TypeScript configuration
└── next.config.ts # Next.js configuration
```

## 🗄️ Database Schema

### Core Models

#### User
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  clerkId   String   @unique
  name      String?
  bio       String?
  image     String?
  location  String?
  website   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  posts         Post[]
  comments      Comment[]
  likes         Like[]
  followers     Follows[] @relation("following")
  following     Follows[] @relation("follower")
  notifications Notification[] @relation("userNotifications")
}
```

#### Post
```prisma
model Post {
  id        String   @id @default(cuid())
  authorId  String
  content   String?
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  author        User @relation(fields: [authorId], references: [id])
  comments      Comment[]
  likes         Like[]
  notifications Notification[]
}
```

#### Notification Types
- `LIKE` - When someone likes your post
- `COMMENT` - When someone comments on your post  
- `FOLLOW` - When someone follows you

## 🎨 UI Components

### Design System
- **Consistent Spacing** - 4px, 8px, 16px, 24px, 32px scale
- **Color Palette** - Primary, secondary, accent, and semantic colors
- **Typography** - Font sizes from 12px to 48px with proper line heights
- **Border Radius** - 4px, 8px, 12px, 16px scale
- **Shadows** - Subtle elevation system

### Key Components
- **PostCard** - Interactive post display with like/comment actions
- **CreatePost** - Rich post creation with image upload
- **UserProfile** - Comprehensive user profile display
- **Navbar** - Responsive navigation with mobile menu
- **Sidebar** - User info and recommendations
- **NotificationCard** - Real-time notification display

## 🔧 API Routes & Server Actions

### Server Actions
All server actions are located in `src/actions/`:

#### User Actions (`user.action.ts`)
- `syncUser()` - Sync Clerk user with database
- `getUserByClerkId()` - Fetch user by Clerk ID
- `getDbUserId()` - Get database user ID
- `getUserStats()` - Get user activity statistics
- `toggleFollow()` - Follow/unfollow user
- `getRandomUsers()` - Get user recommendations

#### Post Actions (`post.action.ts`)
- `createPost()` - Create new post
- `getPosts()` - Fetch all posts
- `toggleLike()` - Like/unlike post
- `createComment()` - Add comment to post
- `deletePost()` - Delete user's post

#### Profile Actions (`profile.action.ts`)
- `getProfileByUsername()` - Get user profile
- `getUserPosts()` - Get user's posts
- `getUserLikedPosts()` - Get posts liked by user
- `updateProfile()` - Update user profile
- `isFollowing()` - Check follow status

#### Notification Actions (`notification.action.ts`)
- `getNotifications()` - Get user notifications
- `markNotificationsAsRead()` - Mark notifications as read

## 🎯 Performance Optimizations

### Next.js Optimizations
- **Server Components** - Default server rendering for better performance
- **Client Components** - Strategic use for interactivity
- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic code splitting per route
- **Static Generation** - Pre-rendered pages where possible

### Database Optimizations
- **Composite Indexes** - Optimized queries for common patterns
- **Eager Loading** - Efficient data fetching with Prisma includes
- **Connection Pooling** - Efficient database connections
- **Query Optimization** - Minimized N+1 queries

### UX Optimizations
- **Optimistic Updates** - Instant UI feedback for likes/comments
- **Loading States** - Skeleton screens and loading indicators
- **Error Boundaries** - Graceful error handling
- **Toast Notifications** - Non-intrusive user feedback

## 🔒 Security Features

### Authentication
- **Clerk Integration** - Secure authentication with social logins
- **Session Management** - Automatic session handling
- **Route Protection** - Middleware-based route protection
- **CSRF Protection** - Built-in CSRF protection

### Data Validation
- **Server-side Validation** - All inputs validated on server
- **Type Safety** - TypeScript for compile-time safety
- **Sanitization** - User input sanitization
- **Rate Limiting** - API rate limiting (recommended for production)

## 📱 Responsive Design

### Breakpoints
- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

### Mobile Features
- **Touch Gestures** - Swipe and tap interactions
- **Mobile Menu** - Collapsible navigation
- **Optimized Images** - Responsive image sizing
- **Touch Targets** - Minimum 44px touch targets

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy automatically on push

### Environment Variables for Production
```env
DATABASE_URL="your_production_database_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_production_clerk_key"
CLERK_SECRET_KEY="your_production_clerk_secret"
UPLOADTHING_SECRET="your_production_uploadthing_secret"
UPLOADTHING_APP_ID="your_production_uploadthing_app_id"
```

### Database Migration
```bash
# Generate and apply migrations
npx prisma migrate deploy
```

## 🧪 Testing

### Testing Strategy
- **Unit Tests** - Component and function testing
- **Integration Tests** - API route testing
- **E2E Tests** - Full user journey testing

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 🔄 Development Workflow

### Git Workflow
1. Create feature branch from `main`
2. Make changes and commit with conventional commits
3. Create pull request
4. Review and merge

### Code Standards
- **ESLint** - Code linting rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Strict type checking
- **Conventional Commits** - Standardized commit messages

## 📊 Monitoring & Analytics

### Performance Monitoring
- **Web Vitals** - Core web vitals tracking
- **Error Tracking** - Runtime error monitoring
- **Performance Metrics** - Page load times and interactions

### User Analytics
- **User Engagement** - Track user interactions
- **Feature Usage** - Monitor feature adoption
- **Conversion Metrics** - Sign-up and engagement rates

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Clerk** - Seamless authentication
- **Prisma** - Excellent ORM
- **Tailwind CSS** - Beautiful utility-first CSS
- **Shadcn/ui** - Gorgeous component library
- **UploadThing** - Simple file uploads

## 📞 Support

- **Documentation** - [docs.socially.com](https://docs.socially.com)
- **Issues** - [GitHub Issues](https://github.com/yourusername/socially/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/socially/discussions)
- **Email** - support@socially.com

## 🗺️ Roadmap

### Upcoming Features
- [ ] Direct Messaging
- [ ] Stories (24h posts)
- [ ] Video Posts
- [ ] Advanced Search
- [ ] User Verification
- [ ] Mobile App (React Native)
- [ ] Real-time Chat
- [ ] Post Scheduling
- [ ] Advanced Analytics
- [ ] Content Moderation

### Performance Improvements
- [ ] Edge Functions
- [ ] CDN Integration
- [ ] Database Optimization
- [ ] Caching Strategy
- [ ] Progressive Web App

---

**Built with ❤️ by [Rupak Kumar](https://github.com/rupak1005)**

⭐ Star this repo if you find it helpful!
