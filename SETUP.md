# Bob — Setup Guide
### Cross-device sync · GitHub hosting · Phone/iPad app

Your live URL once set up: **https://zzdoll.github.io/bob/**

---

## Step 1 — Set up Firebase (5 minutes, free)

Firebase is Google's real-time database. It keeps Bob in sync across your laptop, iPad, and iPhone automatically.

1. Go to **https://console.firebase.google.com** and sign in with `steven.m.doll@gmail.com`
2. Click **"Add project"** → name it `bob-priority-hub` → click Continue
3. Turn off Google Analytics (not needed) → click **Create project**
4. On the project dashboard, click the **`</>`** (Web) icon → name the app `Bob` → click **Register app**
5. You'll see a code block like this — **copy these 6 values:**
   ```
   apiKey: "AIzaSy..."
   authDomain: "bob-priority-hub.firebaseapp.com"
   projectId: "bob-priority-hub"
   storageBucket: "bob-priority-hub.appspot.com"
   messagingSenderId: "123456789"
   appId: "1:123456789:web:abc123"
   ```
6. Open **`firebase-config.js`** and paste each value into the matching line
7. Back in Firebase Console → click **Build → Firestore Database** in the left menu
8. Click **Create database** → choose **Start in test mode** → pick any region → **Done**

✅ Bob will now sync in real-time across all your devices.

---

## Step 2 — Publish to GitHub Pages (10 minutes)

This gives Bob a permanent web address you can visit from any browser.

### If you already have a GitHub repo for your site:
1. Copy all the Bob files into your repo (or a `/bob/` subfolder)
2. Push to GitHub — Bob will be live at `https://zzdoll.github.io/bob/` (or your existing site URL)

### If you need to create a new repo:
1. Go to **https://github.com/new**
2. Repository name: `bob`
3. Set it to **Public** → click **Create repository**
4. Upload all Bob files (drag & drop in the GitHub web interface, or use GitHub Desktop)
5. Go to repo **Settings → Pages** → Source: **Deploy from branch → main → / (root)** → Save
6. Wait 2 minutes → visit **https://zzdoll.github.io/bob/**

### Files to upload:
```
bob.html          ← the main app
delegate.html     ← the delegation tracker
firebase-config.js ← your Firebase credentials (already filled in from Step 1)
bob-logo.png      ← Bob's logo
manifest.json     ← makes it installable as an app
sw.js             ← makes it work offline
new_tasks.js      ← current task data (update this each sync)
initiatives.js    ← Jira initiative list (update periodically)
```

---

## Step 3 — Install on Phone and iPad

Once Bob is live on GitHub Pages, install it like a native app:

### iPhone / iPad (Safari):
1. Open Safari and go to `https://zzdoll.github.io/bob/bob.html`
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it **Bob** → tap **Add**
5. Bob appears on your home screen with its own icon — tap to open like any app

### Android (Chrome):
1. Open Chrome and go to `https://zzdoll.github.io/bob/bob.html`
2. Tap the three-dot menu → **"Add to Home screen"** → **Add**

### Desktop (Chrome/Edge):
1. Visit the URL in Chrome or Edge
2. Look for the install icon (⊕) in the address bar → click it → **Install**
3. Bob opens in its own window with no browser chrome

---

## How sync works

| Action | What happens |
|--------|-------------|
| Add/edit on laptop | Saves instantly to Firebase → phone updates within 1 second |
| Add/edit on phone | Saves to Firebase → laptop updates within 1 second |
| Offline on phone | Changes saved locally → synced to all devices when back online |
| Open Bob | Loads from local cache instantly (works offline) |

The sync pill in Bob's top bar shows **🔥 Live** when connected to Firebase, or **⚠️ Offline** if there's no internet.

---

## Delegating to Bob (AI)

When you hover a task card and click the **🤖** button, the task is sent to the Delegated list under the owner **🤖 Bob (AI)**. From there:
- It's pinned at the top of the owner sidebar
- Clicking **"🤖 Run with Claude"** opens a new Claude session with the task pre-loaded
- When Bob finishes the work, click **↩ Bob** to return it to your task list as completed

---

## Updating task data (daily sync)

The daily sync script writes new tasks to `new_tasks.js`. For GitHub hosting, after each sync:
1. Copy the updated `new_tasks.js` from your Outputs folder
2. Upload it to your GitHub repo (GitHub will auto-deploy in ~30 seconds)
3. Bob picks up new items on next load or when the 60-second countdown hits

*Alternatively: once Firebase is set up, the daily sync can write directly to Firestore and Bob will update instantly without touching GitHub.*

---

## Quick reference

| URL | Purpose |
|-----|---------|
| `https://zzdoll.github.io/bob/bob.html` | Main hub |
| `https://zzdoll.github.io/bob/delegate.html` | Delegated list |
| `https://console.firebase.google.com` | Firebase console |
| `https://github.com/zzDoll/bob` | GitHub repo |
