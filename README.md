# Dad Joke Generator 👨

A modern web application that generates dad jokes using AI, with beautiful dynamic backgrounds and social sharing capabilities.

## Features

- 🤖 AI-powered dad joke generation using OpenAI
- 🖼️ Dynamic background images from Unsplash
- 🌐 Social sharing with dynamic OpenGraph images
- 📊 Analytics integration with Google Tag Manager
- ⚡ Built with Next.js 14 App Router and React Server Components
- 🎨 Beautiful UI with Tailwind CSS and Shadcn UI
- 🔄 Recent jokes history with local storage
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion, Tailwind Motion
- **State Management**: React Hooks + Local Storage
- **Analytics**: Google Tag Manager
- **APIs**: OpenAI, Unsplash
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dad-joke-generator.git
   cd dad-joke-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env`:
   ```
   OPENAI_API_KEY=your_openai_key
   UNSPLASH_ACCESS_KEY=your_unsplash_key
   NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=your_gtm_id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dad-joke-generator/ # Dad joke generator feature
│   │   ├── actions/       # Server actions
│   │   ├── _components/   # Feature-specific components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/          # Feature-specific utilities
│   └── layout.tsx         # Root layout
├── components/            # Shared components
├── lib/                  # Shared utilities
└── types/               # TypeScript type definitions
```

## Features in Detail

### Dynamic OpenGraph Images

The application generates dynamic OpenGraph images for social sharing. When a joke is generated, a custom image is created with:
- The joke text
- A dynamic background
- Branding elements

### Recent Jokes History

The application keeps track of your 5 most recent jokes using local storage, allowing you to:
- View your joke history
- Share previous jokes
- See your joke-telling journey

### Animations and Interactions

- Smooth page transitions
- Interactive UI elements
- Playful hover effects
- Loading states and transitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details