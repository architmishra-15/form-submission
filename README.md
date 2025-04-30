# InterestConnect

Connect people with shared interests and passions for better collaboration and personal growth.

## Features

- Beautiful, animated UI with Framer Motion
- Responsive design that works on all devices
- Theme toggle (light/dark mode with dark default)
- Form validation using React Hook Form
- Firebase backend for secure data storage
- Client-side code obfuscation for production builds

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Get your Firebase service account key
   - Create a `.env.local` file with your Firebase credentials:

```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id",...}
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

For a production build with obfuscated client-side JavaScript:

```bash
npm run build:prod
```

This will:
1. Build the Next.js application
2. Obfuscate all client-side JavaScript for security
3. Output to the `.next` directory

To start the production server:

```bash
npm run start
```

## Deployment

This application is ready to be deployed on Netlify or Vercel without any additional configuration. Both platforms will automatically recognize the Next.js project and configure the build correctly.

### Deploying to Vercel

The easiest way to deploy is directly through Vercel:

1. Push your code to a GitHub repository
2. Import the project on Vercel
3. Add your environment variables (FIREBASE_SERVICE_ACCOUNT_KEY)
4. Deploy

### Deploying to Netlify

To deploy on Netlify:

1. Push your code to a GitHub repository
2. Import the project on Netlify
3. Set build command to `npm run build:prod`
4. Set publish directory to `.next`
5. Add your environment variables (FIREBASE_SERVICE_ACCOUNT_KEY)
6. Deploy

## Security Features

- All form processing is handled server-side
- Firebase Admin SDK is only used on the server
- Production builds include JavaScript obfuscation
- Input validation using Zod schema

## Customization

### Categories

Edit `src/data/categories.json` to modify the list of interest categories.

### Styling

The application uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Firebase Configuration

Update your Firebase configuration in `.env.local` file. See the Firebase documentation for more details on setting up Firebase Admin SDK.

## License

This project is licensed under GPL-3.0