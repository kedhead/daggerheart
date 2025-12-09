# Hosting Firebase App on GitHub Pages

## ⚠️ Important Notes

GitHub Pages **does NOT support environment variables** like Vercel/Netlify. However, you can still deploy a Firebase-enabled app using GitHub Actions.

## Why This Matters

- Firebase config includes API keys
- These keys are **safe to expose** in client-side code (they're public anyway)
- BUT: Better practice is to use build-time injection via GitHub Secrets

---

## Option 1: GitHub Actions with Secrets (Recommended)

### Step 1: Add Firebase Config to GitHub Secrets

1. Go to your repository: https://github.com/kedhead/daggerheart
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each Firebase config value:

```
Name: VITE_FIREBASE_API_KEY
Value: AIzaSy... (your actual API key)

Name: VITE_FIREBASE_AUTH_DOMAIN
Value: your-project.firebaseapp.com

Name: VITE_FIREBASE_PROJECT_ID
Value: your-project-id

Name: VITE_FIREBASE_STORAGE_BUCKET
Value: your-project.appspot.com

Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 123456789

Name: VITE_FIREBASE_APP_ID
Value: 1:123456789:web:abc123
```

### Step 2: Update GitHub Actions Workflow

The workflow file already exists at `.github/workflows/deploy.yml`, but it's commented out.

I've created `.github/workflows/deploy-with-firebase.yml` which:
- Pulls Firebase config from GitHub Secrets
- Builds the app with those values
- Deploys to GitHub Pages

### Step 3: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. Save

### Step 4: Push and Deploy

```bash
git add .
git commit -m "Enable GitHub Pages with Firebase"
git push
```

GitHub Actions will automatically:
1. Build your app with Firebase config
2. Deploy to GitHub Pages
3. Your site will be live at: `https://kedhead.github.io/daggerheart/`

### Step 5: Add Domain to Firebase

1. Go to Firebase Console → Authentication → Settings
2. Scroll to **Authorized domains**
3. Add: `kedhead.github.io`
4. Save

**Done! Your app is live on GitHub Pages with Firebase!** ✅

---

## Option 2: Hardcode Config (Not Recommended)

You can put Firebase config directly in `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Your actual values
  authDomain: "your-project.firebaseapp.com",
  // ... etc
};
```

**Pros:**
- Simpler, no GitHub Secrets needed
- Firebase API keys are designed to be public anyway

**Cons:**
- Config visible in source code
- Less professional
- Harder to rotate keys

**Security Note:** Firebase API keys are **safe to expose** in client-side code. They're not secret keys - they just identify your Firebase project. Real security comes from Firestore security rules.

---

## Option 3: Switch to Vercel (Easiest)

Honestly, **Vercel is much easier** for Firebase apps:

### Why Vercel is Better:

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| Environment Variables | ❌ Need GitHub Actions | ✅ Built-in UI |
| Auto Deploy | ✅ On push | ✅ On push |
| Setup Time | ~15 min | ~2 min |
| HTTPS | ✅ Automatic | ✅ Automatic |
| Custom Domain | ✅ Free | ✅ Free |
| Preview Deploys | ❌ No | ✅ Yes |
| Build Logs | ✅ In Actions | ✅ Better UI |

### Deploy to Vercel Now:

1. Go to https://vercel.com
2. Sign in with GitHub
3. Import `kedhead/daggerheart`
4. Add environment variables in UI
5. Click Deploy
6. **Done in 2 minutes!**

**Your URL:** `daggerheart.vercel.app` (cleaner than GitHub Pages)

---

## My Recommendation

### Use Vercel If:
- ✅ You want the easiest setup
- ✅ You want better deployment UI
- ✅ You want preview deployments
- ✅ You're okay with a different URL

### Use GitHub Pages If:
- ✅ You want everything in one GitHub repo
- ✅ You prefer `kedhead.github.io` domain
- ✅ You don't mind setting up GitHub Actions
- ✅ You want to avoid external services

### Use Netlify If:
- ✅ You want drag-and-drop deployment
- ✅ You want form handling features
- ✅ You want generous free tier

---

## Quick Comparison

**Ease of Setup:**
1. 🥇 Vercel (2 min) - Just click deploy
2. 🥈 Netlify (3 min) - Drag & drop
3. 🥉 GitHub Pages (15 min) - Need GitHub Actions setup

**Best URL:**
- Vercel: `daggerheart.vercel.app` ⭐
- Netlify: `daggerheart.netlify.app` ⭐
- GitHub Pages: `kedhead.github.io/daggerheart/` (longer)

**Free Tier:**
- All three are 100% free for your use case! ✅

---

## Current Status

Your app is **ready to deploy** to any platform:

✅ **GitHub Pages:** Follow steps above (use GitHub Actions)
✅ **Vercel:** Just import and add env vars
✅ **Netlify:** Just import and add env vars

---

## What I Recommend

**Use Vercel.** Here's why:

1. **2-minute setup** vs 15-minute GitHub Actions setup
2. **Better developer experience** (UI for env vars, build logs)
3. **Preview deployments** for testing
4. **Still free forever** for your use case
5. **Cleaner URL** (`daggerheart.vercel.app`)

GitHub Pages is great, but for Firebase apps, Vercel/Netlify make life much easier.

---

## Need Help?

- **For GitHub Pages:** Use the workflow file I created
- **For Vercel:** Just import repo and add 6 env vars
- **For Netlify:** Same as Vercel

Want me to help you set up whichever you choose? Just let me know! 🚀
