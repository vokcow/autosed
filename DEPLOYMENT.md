# Deployment Guide

## Quick Deploy to Vercel (Recommended)

The easiest way to deploy this application is using Vercel:

### Option 1: Deploy from GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/buffer-optimizer.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click **"New Project"**

4. Import your GitHub repository

5. Vercel will automatically detect Next.js and configure:
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`

6. Click **"Deploy"**

Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Other Platforms

Since this is a static export, you can deploy to any static hosting service:

### Netlify

1. Build the static site:
```bash
npm run build
```

2. Deploy the `out/` directory:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --dir=out --prod
```

### GitHub Pages

1. Build:
```bash
npm run build
```

2. Add to your repository's GitHub Actions workflow or manually upload the `out/` directory

### Cloudflare Pages

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Deploy

### AWS S3 + CloudFront

1. Build:
```bash
npm run build
```

2. Upload `out/` directory to S3:
```bash
aws s3 sync out/ s3://your-bucket-name --delete
```

3. Configure CloudFront distribution pointing to your S3 bucket

## Environment Variables

For production deployments with real backends:

1. Create a `.env.local` file (never commit this!):
```bash
NEXT_PUBLIC_LLM_API_URL=https://your-llm-api.com
NEXT_PUBLIC_LLM_API_KEY=your_key_here
NEXT_PUBLIC_SIMIO_API_URL=https://your-simio-backend.com/api
NEXT_PUBLIC_SIMIO_API_KEY=your_key_here
```

2. In Vercel dashboard:
   - Go to Project Settings
   - Select "Environment Variables"
   - Add your variables

3. Redeploy for changes to take effect

## Custom Domain

### On Vercel:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update your DNS records as instructed
4. Vercel handles SSL automatically

## Backend Integration Notes

When you're ready to integrate with real backends:

### LLM Backend

- Deploy your LLM integration service (can be serverless)
- Update `NEXT_PUBLIC_LLM_API_URL` environment variable
- Modify `app/lib/simulation.ts` to use `callLLMBackend()`

### Simio Backend

The Simio backend MUST run on Windows with Simio installed:

1. **Setup ASP.NET Core Service**:
   - Create API endpoint: `POST /api/simio/simulate`
   - Reference Simio DLLs
   - Implement model loading and experiment execution

2. **Deploy Options**:
   - **Azure Windows VM**: Recommended for .NET + Simio
   - **AWS EC2 Windows**: Alternative cloud option
   - **On-premises server**: If Simio licenses require it

3. **Update Environment Variables**:
```bash
NEXT_PUBLIC_SIMIO_API_URL=https://your-simio-backend.com/api
```

4. **CORS Configuration**: Ensure your Simio backend allows requests from your Vercel domain

### Architecture Diagram

```
[User Browser]
      ↓
[Vercel - Next.js Static Site]
      ↓
      ├─→ [LLM API] (OpenAI, Claude, etc.)
      │
      └─→ [Simio Backend] (Windows Server + ASP.NET)
            ↓
          [Simio Engine] (Desktop Simio Installation)
```

## Performance Tips

1. **Optimize Images**: Use Next.js Image component when adding images
2. **Bundle Size**: Keep dependencies minimal (already done)
3. **Caching**: Vercel handles this automatically
4. **CDN**: Vercel's Edge Network provides global CDN

## Monitoring

Consider adding monitoring services:

- **Vercel Analytics**: Built-in, just enable in project settings
- **Sentry**: For error tracking
- **Google Analytics**: For user behavior

## Security Checklist

- [ ] Never commit `.env.local` (already in `.gitignore`)
- [ ] Use environment variables for all API keys
- [ ] Enable CORS on backend APIs with specific origins
- [ ] Use HTTPS for all API endpoints
- [ ] Implement rate limiting on backend APIs
- [ ] Add API authentication (API keys, OAuth, etc.)

## Troubleshooting

### Build fails on Vercel

Check:
- `package.json` dependencies are correct
- `next.config.js` has `output: 'export'`
- No server-side features (API routes, ISR) being used

### Static export issues

This app uses:
- ✅ Client components (`'use client'`)
- ✅ Static generation
- ✅ Client-side routing
- ❌ No API routes (must use external APIs)
- ❌ No server components with dynamic data

### API connection issues

- Check CORS configuration on backends
- Verify environment variables are set correctly
- Test API endpoints with curl/Postman first

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Simio API Documentation](https://www.simio.com/resources/api-documentation.php)

