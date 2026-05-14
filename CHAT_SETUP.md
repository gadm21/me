# Chat Setup Instructions

The chat functionality supports both OpenAI API and custom backend APIs.

## Option 1: OpenAI API (Recommended)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your OpenAI API key from https://platform.openai.com/api-keys

3. Update the `.env` file with your credentials:
   ```
   VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here
   VITE_OPENAI_MODEL=gpt-4o-mini
   ```

   Available models:
   - `gpt-4o-mini` - Fast, cost-effective (recommended)
   - `gpt-4o` - Most capable
   - `gpt-3.5-turbo` - Legacy, cheaper

4. Restart the dev server:
   ```bash
   npm run dev
   ```

## Option 2: Custom Backend API

If you prefer to use a custom backend (like Railway):

1. Update the `.env` file:
   ```
   VITE_CHAT_API_TOKEN=your_api_token_here
   VITE_CHAT_API_URL=https://your-backend-url.com/query
   ```

2. Restart the dev server.

## Production (Vercel)

1. Go to your Vercel project settings.

2. Add the environment variables based on your chosen option:
   - **OpenAI**: `VITE_OPENAI_API_KEY` and `VITE_OPENAI_MODEL`
   - **Custom**: `VITE_CHAT_API_TOKEN` and `VITE_CHAT_API_URL`

3. Redeploy your application.

## What You Need from OpenAI

If using OpenAI API, you need:
- **API Key**: From https://platform.openai.com/api-keys
- **Model Selection**: Choose a model (gpt-4o-mini recommended for cost/speed)
- **Billing Setup**: Add payment method in OpenAI dashboard (pay-as-you-go)

## Troubleshooting

If the chat shows configuration errors:
- Verify your API key is correct and has credits
- Check that environment variables are set (restart server after changes)
- Ensure the model name is valid
- Check browser console for specific error messages

## Recent Fixes

- **Resume PDF Link**: Fixed path resolution by using proper Vite import
- **Chat API**: Added OpenAI API support with fallback to custom backend
- **Missing Import**: Fixed `getCurrentLanguageConfig` import
- **Speech Code**: Added `speechCode` to language configs for TTS
