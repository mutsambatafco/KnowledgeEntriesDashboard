# Knowledge Entries Dashboard

A modern, mobile-first knowledge capture interface built with React and TypeScript, designed for manufacturing technicians to efficiently document and manage knowledge entries.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete knowledge entries
- **Mobile-First Design**: Optimized for mobile devices with responsive layouts for tablet and desktop
- **Detail View**: Click any entry card to view full details with edit/delete options
- **Image Upload**: Support for uploading and managing images with entries (with preview and Base64 encoding)
- **Real-time Validation**: Form validation with helpful error messages
- **Brutalist Design**: Black and white material design with bold typography and strong borders
- **Interactive Effects**:
  - WebGL-powered PixelBlast header animation
  - StaggeredMenu overlay navigation
  - Mobile dock with magnification effect
- **Toast Notifications**: Real-time feedback for all operations (react-hot-toast)
- **Type-Safe**: Built with TypeScript for enhanced code quality and developer experience
- **Comprehensive Testing**: Automated end-to-end tests with Playwright
- **CI/CD Ready**: GitHub Actions workflow for automated testing

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **3D Graphics**:
  - Three.js 0.181.0
  - @react-three/fiber 9.4.0
  - @react-three/postprocessing 3.0.4
- **Animations**:
  - GSAP 3.13.0
  - Motion 12.23.24
- **Icons**:
  - Lucide React 0.344.0
  - React Icons 5.5.0
- **UI Libraries**:
  - react-hot-toast 2.6.0
- **Mock API**: json-server 1.0.0-beta.3
- **Testing**: Playwright 1.56.1
- **Code Quality**: ESLint with TypeScript support
- **CI/CD**: GitHub Actions

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
npm install --legacy-peer-deps
```

**Note**: The `--legacy-peer-deps` flag is required due to React version compatibility between React 18.3.1 and @react-three/fiber.

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

The project includes 2 comprehensive automated Playwright tests:

1. **Add Entry Test**: Creates a new knowledge entry and verifies it appears in the list
2. **Delete Entry Test**: Creates an entry, deletes it with confirmation, and verifies removal

Tests automatically start both the Vite dev server and json-server API.

**Run tests:**

```bash
# Run all tests
npm run test:e2e

# Run with UI mode for debugging
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

**Test Configuration:**
- Tests run on Chromium only (Firefox and Safari disabled due to WebGL compatibility)
- Automatically starts both dev server and API server via `webServer` config
- Global test timeout: 60 seconds
- Navigation timeout: 30 seconds
- Action timeout: 10 seconds

## Project Structure

```
KnowledgeEntriesDashboard/
├── .github/
│   └── workflows/
│       └── playwright.yml           # GitHub Actions CI/CD workflow
├── src/
│   ├── components/                  # React components
│   │   ├── Dither/
│   │   │   └── Dither.tsx          # Dithering effect component
│   │   ├── Dock/
│   │   │   └── Dock.tsx            # Mobile bottom navigation dock
│   │   ├── PixelBlast/
│   │   │   └── PixelBlast.tsx      # WebGL header animation
│   │   ├── PillNav/
│   │   │   └── PillNav.tsx         # Pill-style navigation
│   │   ├── StaggeredMenu/
│   │   │   └── StaggeredMenu.tsx   # Overlay navigation menu
│   │   ├── DeleteConfirmModal.tsx   # Deletion confirmation dialog
│   │   ├── EmptyState.tsx          # Empty state component
│   │   ├── KnowledgeCard.tsx       # Entry card component
│   │   ├── KnowledgeDetail.tsx     # Entry detail view
│   │   └── KnowledgeForm.tsx       # Create/edit form modal
│   ├── services/                    # API service layer
│   │   └── knowledgeEntries.ts     # Knowledge entries service
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts                # Type definitions
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Application entry point
│   ├── index.css                    # Global styles
│   └── vite-env.d.ts               # Vite type definitions
├── tests/                           # E2E tests
│   └── knowledge-entries.spec.ts   # Playwright test suite
├── public/
│   └── logo.png                     # Application logo
├── db.json                          # Mock API database
├── index.html                       # HTML entry point
├── vite.config.ts                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # App-specific TS config
├── tsconfig.node.json               # Node-specific TS config
├── eslint.config.js                 # ESLint configuration
├── postcss.config.js                # PostCSS configuration
└── package.json                     # Project dependencies
```

## Key Components

### App.tsx
Main application component that orchestrates:
- State management for entries, forms, modals, and detail view
- CRUD operations via knowledgeEntriesService
- Navigation between list view and detail view
- Mobile dock and StaggeredMenu integration
- Toast notifications for user feedback

### KnowledgeCard.tsx
Clickable card component displaying entry preview:
- Truncated description (2 lines)
- Image display with placeholder fallback
- Edit and Delete action buttons (with stopPropagation)
- onClick handler for navigation to detail view
- Brutalist design with black borders and shadows

### KnowledgeDetail.tsx
Full-page detail view for individual entries:
- Back button navigation
- Full-size image display
- Complete description text
- Formatted creation date
- Edit and Delete actions
- Responsive layout with proper spacing

### KnowledgeForm.tsx
Modal form component for creating and editing:
- Form validation (title min 3 chars, description min 10 chars)
- Image upload with Base64 encoding and preview
- Mobile-optimized with bottom padding for dock
- Full-screen modal on mobile, centered on desktop
- Loading states during submission
- Error handling with visual feedback

### DeleteConfirmModal.tsx
Confirmation dialog for safe deletions:
- Warning message with entry context
- Loading state during API call
- Cancel and confirm actions
- Prevents accidental data loss

### EmptyState.tsx
Friendly empty state when no entries exist:
- Encouraging message
- "Create First Entry" call-to-action
- BookOpen icon for context

### PixelBlast.tsx
WebGL-powered animated header effect:
- Circle pattern with customizable parameters
- Ripple effects and liquid animations
- Responsive sizing (100px mobile, 200px desktop)
- Window check for SSR compatibility

### StaggeredMenu.tsx
Overlay navigation menu (desktop):
- Fixed position overlay
- Animated menu items with stagger effect
- Social media links
- Logo display
- Customizable colors and styling

### Dock.tsx
Mobile bottom navigation:
- Magnification effect on hover/touch
- Home, New Entry, Entries, and About actions
- Fixed position at bottom
- Only visible on mobile (hidden on md+ screens)

## UI/UX Improvements

This implementation includes several UX enhancements beyond the base requirements:

### 1. Mobile-First Responsive Design
- **Mobile dock navigation**: Fixed bottom dock with magnification effect (mobile only)
- **Desktop overlay menu**: StaggeredMenu for desktop navigation
- **Adaptive layouts**: Single column on mobile, 2 columns on tablet, 3 columns on desktop
- **Touch-friendly**: Large tap targets and appropriate spacing for mobile interactions
- **Responsive header**: Button text adapts ("New Entry" on desktop, "New" on mobile)
- **Bottom padding**: Main content and forms have mobile-specific padding to prevent dock overlap

### 2. Enhanced Visual Feedback
- **Brutalist design system**: Black and white color scheme with bold borders and shadows
- **Toast notifications**: Real-time feedback with react-hot-toast for all CRUD operations
- **WebGL animations**: PixelBlast header effect with ripples and liquid animations
- **Smooth transitions**: Interactive hover states and button animations
- **Loading states**: Spinner indicators during API operations
- **Shadow effects**: Consistent shadow styling (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`)

### 3. Navigation & Routing
- **Detail view**: Click any card to view full entry details
- **Back navigation**: Return to list view from detail page
- **Sticky back button**: Always accessible at top of detail view
- **Deep state management**: selectedEntry state for view switching

### 4. Error Handling & Validation
- **Form validation**: Title (min 3 chars), Description (min 10 chars)
- **Inline error messages**: Clear error feedback below invalid fields
- **Toast notifications**: Error alerts for API failures
- **Try-catch blocks**: Comprehensive error handling in service layer

### 5. Image Management
- **Base64 encoding**: Images converted to Base64 for json-server compatibility
- **Image preview**: Real-time preview of uploaded images
- **Remove capability**: Easy removal of selected images
- **Placeholder fallback**: Icon displayed when no image exists
- **File input handling**: Proper FileReader implementation

### 6. Accessibility Features
- **ARIA labels**: Proper labeling for interactive elements (Edit entry, Delete entry)
- **Semantic HTML**: Proper heading hierarchy and role attributes
- **Keyboard navigation**: Full keyboard support for all interactions
- **Focus indicators**: Visual focus states for accessibility

### 7. Performance & Browser Compatibility
- **Window checks**: SSR compatibility for WebGL components
- **Chromium testing**: E2E tests optimized for Chromium
- **WebGL fallback**: Graceful degradation when WebGL unavailable
- **Vite HMR**: Fast hot module replacement during development
- **Efficient state updates**: Optimized React re-renders

## Mobile-First Approach

The application is designed with a mobile-first philosophy:

### Breakpoints
- **Default (Mobile)**: < 640px - Single column layout
- **sm (Tablet)**: ≥ 640px - Two column grid, expanded buttons
- **lg (Desktop)**: ≥ 1024px - Three column grid, full features

### Mobile Optimizations
- **Dock navigation**: Fixed bottom dock with Home, New Entry, Entries, and About
- **Magnification effect**: Dock items magnify on hover for better UX
- **Touch-optimized targets**: Large tap areas for mobile interactions
- **Bottom padding**: Content padded to prevent dock overlap (`pb-24 md:pb-8`)
- **Responsive text**: "New Entry" on desktop, "New" on mobile
- **Full-width cards**: Single column layout on mobile
- **Sticky header**: Always-accessible "New Entry" button
- **WebGL header**: Responsive height (100px mobile, 200px desktop)

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
