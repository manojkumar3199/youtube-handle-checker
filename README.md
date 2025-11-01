# YouTube Handle Checker

A modern, efficient web application to check YouTube handle availability instantly. Built with React, TypeScript, and TailwindCSS for optimal performance and user experience.

## Features

- **Instant Handle Checking**: Verify YouTube handle availability in real-time
- **Batch Processing**: Check multiple handles simultaneously (up to 50 at once)
- **Smart Validation**: Pre-validates handles to ensure they meet YouTube's requirements
- **Rate Limiting**: Respects YouTube's servers with intelligent request throttling
- **Session Caching**: Avoids duplicate checks during your session
- **Export Results**: Download results as CSV for further analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Progress Tracking**: Real-time progress indicators during batch checks

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool with optimized bundling
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

## Getting Started

### Prerequisites

- Node.js 16+ 
- pnpm (recommended) or npm

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd youtube-handle-checker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

1. **Create production build**
   ```bash
   pnpm build
   # or
   npm run build
   ```

2. **Preview production build**
   ```bash
   pnpm preview
   # or
   npm run preview
   ```

### GitHub Pages Deployment

This application is configured for GitHub Pages with relative paths:

1. **Build for deployment**
   ```bash
   pnpm build
   ```

2. **Deploy to GitHub Pages**
   - Upload the contents of the `dist` folder to your repository
   - Or use GitHub Actions to automate deployment

The application automatically handles relative paths for proper GitHub Pages deployment.

## Usage

### Basic Usage

1. **Enter Handles**: Type or paste YouTube handles into the text area
   - Separate handles with commas, semicolons, or new lines
   - Example: `techreview, gamingchannel, mychannel123`

2. **Check Availability**: Click "Check Handles" to start the verification

3. **View Results**: Results show availability status for each handle:
   - ✅ **Available**: Handle is not in use
   - ❌ **Taken**: Handle is already taken
   - ⚠️ **Error**: Unable to check (network issue)

### Advanced Features

- **Batch Processing**: Check up to 50 handles simultaneously
- **Real-time Progress**: Track checking progress with visual indicators
- **Session Caching**: Previously checked handles are cached for efficiency
- **Export Data**: Download results as CSV file for analysis
- **Copy Handles**: Click copy icons to copy handles to clipboard

### Handle Validation Rules

Handles must meet YouTube's requirements:
- 3-30 characters long
- Can contain letters, numbers, underscores, and hyphens
- Must start and end with alphanumeric characters
- Some handles are reserved and unavailable

## Architecture

### Component Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── HandleInput.tsx # Input form component
│   ├── ProgressIndicator.tsx # Progress tracking
│   ├── ResultsDisplay.tsx # Results table
│   └── Footer.tsx      # Application footer
├── types/              # TypeScript interfaces
│   └── index.ts        # Type definitions
├── utils/              # Utility functions
│   ├── validation.ts   # Handle validation logic
│   └── youtubeChecker.ts # Handle checking implementation
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

### Key Features

- **Rate Limiting**: Prevents overwhelming YouTube's servers
- **Session Caching**: Reduces redundant API calls
- **Error Recovery**: Retry logic for failed requests
- **Responsive UI**: Mobile-first design with TailwindCSS
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized bundle splitting and lazy loading

## API Integration

The application uses multiple methods to verify handle availability:

1. **Direct Channel Check**: Attempts to access YouTube channel pages
2. **OEmbed Endpoint**: Checks YouTube's oEmbed service
3. **YouTube API**: Uses official YouTube API when API key is available

### Optional API Key

For enhanced accuracy, you can add a YouTube Data API v3 key:

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Create `.env.local` file in project root:
   ```
   VITE_YOUTUBE_API_KEY=your_api_key_here
   ```
3. Rebuild the application

## Development

### Code Quality

- **ESLint**: Code linting with React-specific rules
- **TypeScript**: Strict type checking enabled
- **Modern Patterns**: React hooks and functional components
- **Performance**: Optimized re-renders and state management

### Scripts

```bash
# Development
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm preview       # Preview production build

# Code Quality
pnpm lint          # Run ESLint
pnpm type-check    # TypeScript type checking
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This tool provides estimates based on publicly available information. Handle availability can change rapidly. Always verify availability directly with YouTube before making final decisions. The developers are not responsible for any decisions made based on the results provided by this tool.

## Support

For issues, questions, or contributions, please visit the project repository or open an issue.