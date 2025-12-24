# 🚀 Quick Testing Reference Card

## What Changed?
Added debug logging to track authentication flow and state changes.

## How to Test (Quick Steps)

### 1. Start the App
```powershell
cd c:\projects\hirelift
npm run dev
```

### 2. Open Browser Console
Press **F12** → Click **Console** tab

### 3. Test Registration
1. Click "Create" button on landing page
2. Fill form and submit
3. **Watch console for:**
   - ✅ "Setting appState to PROFILE after registration"
   - ✅ "🔄 AppState changed to: PROFILE"
4. **Expect:** Profile building page appears

### 4. Test Login
1. Click "Log in" button
2. Enter credentials and submit
3. **Watch console for:**
   - ✅ "User profile incomplete..." OR "User has complete profile..."
   - ✅ "🔄 AppState changed to: [PROFILE or DASHBOARD]"
4. **Expect:** Correct page appears

## Console Output to Look For

### ✅ GOOD - Registration Working:
```
Setting appState to PROFILE after registration
AppState set to: PROFILE
Current appState: PROFILE
🔄 AppState changed to: PROFILE
🔐 IsAuthenticated: true
```

### ✅ GOOD - Login Working (Incomplete Profile):
```
User profile incomplete, setting appState to PROFILE
Current appState: PROFILE
🔄 AppState changed to: PROFILE
🔐 IsAuthenticated: true
```

### ❌ BAD - Not Working:
```
Setting appState to PROFILE after registration
AppState set to: PROFILE
Current appState: LANDING  ⬅️ Still on landing!
```

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Console shows errors | Check backend server is running |
| State is correct but wrong page shows | Check for typos in render logic |
| No console logs appear | Check browser console is open |
| Modal won't close | Try refreshing the page |

## Files Modified
- ✅ `App.tsx` - Added logging to track state changes

## What to Report Back

Please share:
1. ✅ or ❌ Does registration work?
2. ✅ or ❌ Does login work?
3. 📋 Copy the console output
4. 🖼️ What page do you see after auth?

---

**Full documentation:** See `POST_LOGIN_DEBUGGING_COMPLETE.md` for detailed guide.
