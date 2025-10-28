# Deployment Guide for Task Management Application

This guide will help you deploy your MERN stack application to production using free hosting services.

## Prerequisites

1. GitHub account
2. MongoDB Atlas account (free tier)
3. Render account (for backend)
4. Vercel account (for frontend)

---

## Step 1: Prepare MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (M0 Free tier)
4. Create a database user:
   - Go to Database Access
   - Add new database user with username and password
   - Note down the credentials
5. Whitelist all IP addresses:
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `task-management`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/task-management?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub

1. Initialize git (if not already done):
```bash
cd /Users/ananyashailesh/development/project_management_tool
git init
git add .
git commit -m "Initial commit with deployment configs"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/yourusername/task-management.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

1. Go to [Render](https://render.com/) and sign up/sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: task-management-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - Click "Environment" tab
   - Add these variables:
     ```
     PORT=8000
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET_KEY=your_random_secret_key_here
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```
   
   To generate JWT_SECRET_KEY, run in terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

6. Click "Create Web Service"
7. Wait for deployment to complete (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://task-management-backend.onrender.com`)

---

## Step 4: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com/) and sign up/sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```
   - Use the backend URL from Step 3

6. Click "Deploy"
7. Wait for deployment to complete (2-3 minutes)
8. **Copy your frontend URL** (e.g., `https://task-management.vercel.app`)

---

## Step 5: Update CORS Settings

1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Update the `FRONTEND_URL` variable with your actual Vercel URL
5. Save changes (this will redeploy the backend)

---

## Step 6: Test Your Deployed Application

1. Open your Vercel frontend URL in a browser
2. Try to register a new user
3. Log in
4. Test all features:
   - Dashboard
   - Employees
   - Projects
   - Tasks
   - Timesheets
   - Attendance
   - Search functionality

---

## Troubleshooting

### Backend Issues

1. **Database Connection Error**:
   - Check MongoDB Atlas connection string
   - Verify database user credentials
   - Ensure IP whitelist includes 0.0.0.0/0

2. **Port Issues**:
   - Render automatically assigns a port, don't hardcode PORT
   - Use `process.env.PORT || 8000`

3. **Build Failures**:
   - Check Render logs for specific errors
   - Ensure package.json has correct dependencies

### Frontend Issues

1. **API Connection Error**:
   - Verify `REACT_APP_API_URL` is set correctly
   - Check if backend is running (visit backend URL)
   - Check browser console for CORS errors

2. **Environment Variables Not Working**:
   - Ensure variables start with `REACT_APP_`
   - Redeploy after adding environment variables

3. **Build Failures**:
   - Check Vercel logs
   - Run `npm run build` locally to test
   - Fix any warnings or errors

---

## Updating Your Deployment

### Backend Updates:
```bash
git add .
git commit -m "Update backend"
git push
```
Render will automatically redeploy.

### Frontend Updates:
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel will automatically redeploy.

---

## Free Tier Limitations

### Render Free Tier:
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-50 seconds
- 750 hours/month of runtime

### Vercel Free Tier:
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

### MongoDB Atlas Free Tier:
- 512 MB storage
- Shared RAM
- Sufficient for development/small projects

---

## Alternative Deployment Options

### Railway (Backend + Database):
- Combined backend and database hosting
- Better than Render for always-on services
- Free tier: $5/month credit

### Netlify (Frontend):
- Alternative to Vercel
- Similar features and performance

### Heroku (Backend):
- No longer offers free tier
- Paid plans start at $7/month

---

## Production Checklist

- [ ] MongoDB Atlas database created and configured
- [ ] GitHub repository created and code pushed
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Application tested end-to-end
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled (automatic on Vercel/Render)

---

## Support

If you encounter issues:
1. Check service logs (Render/Vercel dashboards)
2. Verify all environment variables
3. Test backend API endpoints directly
4. Check browser console for frontend errors

---

## Security Best Practices

1. **Never commit .env files** to Git
2. Use strong JWT secret keys
3. Regularly rotate database passwords
4. Monitor MongoDB Atlas for suspicious activity
5. Keep dependencies updated

---

## Monitoring

### Backend Monitoring:
- Use Render dashboard for logs and metrics
- Set up status page for uptime monitoring

### Frontend Monitoring:
- Use Vercel Analytics
- Monitor Core Web Vitals

---

## Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### For Render (Backend):
1. Upgrade to paid plan for custom domains
2. Add custom domain in settings
3. Configure DNS records

---

## Cost Estimates

**Free Tier (Recommended for Development):**
- Backend: Free (Render)
- Frontend: Free (Vercel)
- Database: Free (MongoDB Atlas)
- **Total: $0/month**

**Paid Tier (Recommended for Production):**
- Backend: $7/month (Render)
- Frontend: Free (Vercel)
- Database: $9/month (MongoDB Atlas)
- **Total: $16/month**

---

## Next Steps

1. Follow this guide step by step
2. Deploy your application
3. Test thoroughly
4. Share your deployed URL!

Good luck with your deployment! 🚀
