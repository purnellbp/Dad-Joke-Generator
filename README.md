# Dad Joke Generator 👨

A modern web application that generates dad jokes using AI, with beautiful dynamic backgrounds and social sharing capabilities.

## Features

- 🤖 AI-powered dad joke generation using OpenAI
- 🖼️ Dynamic background images from Unsplash
- 🌐 Social sharing with dynamic OpenGraph images
- 📊 Analytics integration with Google Tag Manager
- ⚡ Built with Next.js 14 App Router and React Server Components
- 🎨 Beautiful UI with Tailwind CSS and Shadcn UI
- 🔄 Rate limiting with Redis/Vercel KV
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: Vercel KV (Redis)
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

4. Update the environment variables in `.env` with your own values:
   - Get OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Get Unsplash API keys from [Unsplash Developers](https://unsplash.com/developers)
   - Set up Vercel KV in your Vercel dashboard
   - Get Google Tag Manager ID from [Google Tag Manager](https://tagmanager.google.com/)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for all required environment variables. Make sure to set these up before running the application.

## Features in Detail

### Dynamic OpenGraph Images

The application generates dynamic OpenGraph images for social sharing. When a joke is generated, the URL updates with the joke text, and the OpenGraph image includes the current joke. This creates a better sharing experience on social media platforms.

#### Previewing OpenGraph Images

You can preview how your OpenGraph images will look in several ways:

1. **Direct URL Access**:
   ```
   http://localhost:3000/opengraph-image?joke=Your joke text here
   ```
   This will show you exactly how the image will appear when shared.

2. **Social Media Preview Tools**:
   - Use [OpenGraph.xyz](https://www.opengraph.xyz/) - paste your URL to see how it appears on different platforms
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

3. **Vercel Deployment**:
   - After deploying to Vercel, use the built-in OpenGraph Image Preview in your deployment dashboard
   - Each deployment will show you a preview of your OpenGraph images in the "OpenGraph" tab

4. **Local Development**:
   - Generate a joke on the homepage
   - The URL will update with the joke parameter
   - Visit `/opengraph-image` with that URL to see the generated image

### Rate Limiting

Rate limiting is implemented using Redis (locally) or Vercel KV (in production) to prevent abuse. The limits are configurable through environment variables:
- `RATE_LIMIT_DURATION`: Duration of the rate limit window in seconds
- `MAX_REQUESTS_PER_WINDOW`: Maximum number of requests allowed per window

### Analytics

Google Tag Manager is integrated to track:
- Page views
- Joke generations
- Social shares
- User interactions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details