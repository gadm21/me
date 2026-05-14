# Vercel Deployment Setup

## PDF Issue
The PDF file has been moved to the `public/` folder and `vercel.json` has been updated to exclude PDF files from SPA routing. You need to redeploy:

1. Go to your Vercel dashboard
2. Select your project
3. Click "Deployments" tab
4. Click "Redeploy" button (or push a new commit to trigger deployment)

## Chat Environment Variables

To enable chat on Vercel, you need to add environment variables:

### Steps:
1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click "Environment Variables" in the left sidebar
4. Add the following variables:

**For OpenAI API (Recommended):**
- **Key**: `VITE_OPENAI_API_KEY`
- **Value**: Your OpenAI API key from https://platform.openai.com/api-keys
- **Environment**: Select "Production", "Preview", and "Development"

- **Key**: `VITE_OPENAI_MODEL`
- **Value**: `gpt-4o-mini`
- **Environment**: Select "Production", "Preview", and "Development"

### Important:
- After adding environment variables, you MUST redeploy your application
- Click "Deployments" tab → "Redeploy" to apply the changes

## Verification
After redeployment:
1. Test the resume modal - PDF should display inline
2. Test the chat - should respond instead of showing "not configured"
