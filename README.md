# Knowledge Entries Dashboard

A modern, mobile-first knowledge capture interface built with React and TypeScript, designed for manufacturing technicians to efficiently document and manage knowledge entries.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete knowledge entries
- **Mobile-First Design**: Optimized for mobile devices with responsive layouts for tablet and desktop
- **Image Upload**: Support for uploading and managing images with entries
- **Real-time Validation**: Form validation with helpful error messages
- **Intuitive UX**: Smooth animations, loading states, and confirmation dialogs
- **Type-Safe**: Built with TypeScript for enhanced code quality and developer experience
- **Comprehensive Testing**: End-to-end tests with Playwright

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Mock API**: json-server 1.0.0-beta.3
- **Testing**: Playwright 1.56.1
- **Code Quality**: ESLint with TypeScript support

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd KnowledgeEntriesDashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

You have two options to run the application:

**Option A: Run both servers separately (recommended for development)**

```bash
# Terminal 1: Start the mock API server
npm run api

# Terminal 2: Start the Vite dev server
npm run dev
```

**Option B: Run both servers concurrently**

```bash
npm run dev:all
```

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **Mock API**: `http://localhost:3001`

### 4. Mock API Data

The mock API uses `json-server` with data stored in [db.json](db.json). This file contains sample knowledge entries and is automatically watched for changes.

**Default endpoints:**
- `GET http://localhost:3001/knowledge_entries` - Get all entries
- `GET http://localhost:3001/knowledge_entries/:id` - Get entry by ID
- `POST http://localhost:3001/knowledge_entries` - Create new entry
- `PATCH http://localhost:3001/knowledge_entries/:id` - Update entry
- `DELETE http://localhost:3001/knowledge_entries/:id` - Delete entry

The database comes pre-populated with 2 sample entries. You can modify [db.json](db.json) directly or through the UI.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server only |
| `npm run api` | Start json-server mock API only |
| `npm run dev:all` | Run both API and dev server concurrently |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run test:e2e:report` | View E2E test report |

## Running Tests

### End-to-End Tests

The project includes comprehensive Playwright tests covering:

1. Creating new knowledge entries
2. Editing existing entries
3. Deleting entries with confirmation
4. Form validation
5. Empty state display
6. Form cancellation

**Run tests:**

```bash
# Run all tests
npm run test:e2e

# Run with UI mode for debugging
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

**Test Requirements:**
- Mock API server must be running (`npm run api` in a separate terminal)
- Tests will auto-start the Vite dev server

## Project Structure

```
KnowledgeEntriesDashboard/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── DeleteConfirmModal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── KnowledgeCard.tsx
│   │   └── KnowledgeForm.tsx
│   ├── services/             # API service layer
│   │   └── knowledgeEntries.ts
│   ├── lib/                  # External library integrations
│   │   └── supabase.ts
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and animations
├── e2e/                      # Playwright E2E tests
│   └── knowledge-entries.spec.ts
├── public/                   # Static assets
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Key Components

### App.tsx
Main application component that orchestrates state management and CRUD operations.

### KnowledgeForm.tsx
Modal form component for creating and editing entries with:
- Form validation (title min 3 chars, description min 10 chars)
- Image upload with preview
- Mobile-optimized slide-up animation
- Loading states during submission

### KnowledgeCard.tsx
Displays individual knowledge entries in a card layout with:
- Truncated description (2 lines)
- Image display with placeholder fallback
- Edit and Delete action buttons
- Hover effects for better UX

### DeleteConfirmModal.tsx
Confirmation dialog for destructive delete operations with:
- Warning message
- Loading state during deletion
- Cancel and confirm actions

### EmptyState.tsx
Friendly empty state when no entries exist, encouraging users to create their first entry.

## UI/UX Improvements

This implementation includes several UX enhancements beyond the base requirements:

### 1. Mobile-First Responsive Design
- **Mobile optimization**: Forms slide up from bottom on mobile devices for native app feel
- **Adaptive layouts**: Single column on mobile, 2 columns on tablet, 3 columns on desktop
- **Touch-friendly**: Large tap targets and appropriate spacing for mobile interactions
- **Responsive header**: Button text adapts ("New Entry" on desktop, "New" on mobile)

### 2. Enhanced Visual Feedback
- **Smooth animations**:
  - Slide-up animation for forms (300ms)
  - Scale-in animation for modals (200ms)
  - Loading spinners for async operations
- **Loading states**: Clear visual feedback during API operations
- **Hover effects**: Interactive elements provide visual feedback on hover
- **Focus states**: Accessible focus indicators for keyboard navigation

### 3. Error Handling & Validation
- **Real-time validation**: Immediate feedback on form inputs
- **Inline error messages**: Clear, contextual error messages below fields
- **Visual error states**: Red borders and text for invalid inputs
- **Error notifications**: Dismissible error banners for API failures

### 4. Confirmation Dialogs
- **Delete confirmation**: Prevents accidental deletions with clear warning
- **Visual hierarchy**: Warning icon and descriptive message
- **Action clarity**: "Cancel" and "Delete" buttons with distinct styling

### 5. Empty State Design
- **Friendly messaging**: Encouraging call-to-action when no entries exist
- **Clear guidance**: "Create First Entry" button to guide new users
- **Visual icon**: BookOpen icon provides context

### 6. Image Upload Experience
- **Drag-and-drop style interface**: Dashed border upload area
- **Image preview**: Immediate preview of uploaded images
- **Remove capability**: Easy removal of selected images
- **File name display**: Shows selected file name
- **Hover states**: Upload area changes color on hover

### 7. Accessibility Features
- **ARIA labels**: Proper labeling for screen readers
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Logical tab order
- **Required field indicators**: Visual asterisks for required fields

### 8. Performance Optimizations
- **Lazy loading**: Components loaded as needed
- **Optimized images**: Proper image sizing and object-fit
- **Efficient re-renders**: React best practices for state management
- **Vite build optimization**: Fast builds and HMR during development

## Mobile-First Approach

The application is designed with a mobile-first philosophy:

### Breakpoints
- **Default (Mobile)**: < 640px - Single column layout
- **sm (Tablet)**: ≥ 640px - Two column grid, expanded buttons
- **lg (Desktop)**: ≥ 1024px - Three column grid, full features

### Mobile Optimizations
- Forms slide up from bottom (native app feel)
- Touch-optimized button sizes (min 44x44px)
- Simplified navigation on small screens
- Reduced text on mobile buttons
- Full-screen modals on mobile devices
- Sticky header for constant access to actions

## Code Quality

- **TypeScript Strict Mode**: Enabled for maximum type safety
- **ESLint**: Configured with React and TypeScript rules
- **Component Modularity**: Single responsibility principle
- **Service Layer**: Separation of concerns with dedicated API service
- **Type Definitions**: Comprehensive interfaces for all data structures
- **Error Handling**: Try-catch blocks with proper error logging
- **Clean Code**: Consistent naming conventions and formatting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential improvements for future iterations:

- Search and filter functionality
- Categories/tags for entries
- Offline support with service workers
- Export entries to PDF or CSV
- Rich text editor for descriptions
- Multiple image uploads per entry
- User authentication and authorization
- Sharing entries between team members
- Activity log/audit trail

## Troubleshooting

### Common Issues

**Development server won't start:**
- Ensure Node.js version is 18 or higher
- Delete `node_modules` and `package-lock.json`, then run `npm install`

**Mock API connection errors:**
- Ensure json-server is running on port 3001 (`npm run api`)
- Check that port 3001 is not already in use
- Verify `db.json` exists in the root directory

**Tests failing:**
- Ensure mock API server is running (`npm run api`)
- Tests will auto-start the Vite dev server
- Reset database by editing `db.json` back to original state
- Run `npx playwright install` to ensure browsers are installed

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.
