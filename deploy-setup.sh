#!/bin/bash

# Task Management System - Quick Deployment Setup Script

echo "🚀 Task Management System - Deployment Setup"
echo "=============================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Create MongoDB Atlas Database:"
echo "   - Go to https://www.mongodb.com/cloud/atlas"
echo "   - Create a free cluster"
echo "   - Get your connection string"
echo ""
echo "2️⃣  Push to GitHub:"
echo "   - Create a new repository on GitHub"
echo "   - Run: git remote add origin <your-repo-url>"
echo "   - Run: git push -u origin main"
echo ""
echo "3️⃣  Deploy Backend (Render):"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Root Directory: backend"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "4️⃣  Deploy Frontend (Vercel):"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repo"
echo "   - Root Directory: frontend"
echo "   - Add REACT_APP_API_URL environment variable"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "✨ Your app is ready to deploy!"
