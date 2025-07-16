# GitHub Sign-In Debugging Checklist

## Issues Found and Fixed:

### 1. ✅ Missing Function
- **Issue**: `createUserIfNotExists` function was imported but didn't exist
- **Fix**: Added the missing function to `src/server/implementations/user.impl.ts`

### 2. ✅ Added Comprehensive Logging
- **Issue**: No error handling or logging in authentication flow
- **Fix**: Added console logs throughout the authentication chain:
  - JWT callback (`src/server/auth/callbacks/jwt.callback.ts`)
  - User service (`src/server/services/user.service.ts`)
  - User mapper (`src/server/auth/mappers/user.mapper.ts`)
  - Firebase implementation (`src/server/implementations/user.impl.ts`)
  - Firebase admin initialization (`src/server/utils/firebase-admin.ts`)

## Environment Variables Required:

Make sure these environment variables are set in your `.env.local` file:

```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Firebase
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your_project_id",...}
```

## Testing Steps:

### 1. Test Firebase Connection
```bash
node test-firebase.js
```

### 2. Check Environment Variables
```bash
# Verify these are set
echo $GITHUB_CLIENT_ID
echo $GITHUB_CLIENT_SECRET
echo $NEXTAUTH_SECRET
echo $FIREBASE_SERVICE_ACCOUNT_KEY
```

### 3. Monitor Logs During Sign-In
1. Start your development server: `npm run dev`
2. Open browser developer tools (F12)
3. Go to Console tab
4. Try signing in with GitHub
5. Look for the console logs we added

## Expected Log Flow:

When signing in with GitHub, you should see logs like:
```
Firebase service account loaded successfully
Firebase Admin initialized successfully
Firestore database instance created
JWT Callback triggered
User: [GitHub Username]
Account provider: github
Profile: [GitHub Username]
Processing user and account data
fetchOrCreateUser called
mapToCreateUserDTO called
Account provider: github
Mapped GitHub info: { id: "123", username: "username", ... }
Looking for user with username: [username]
User not found: [username]
Creating new user: [username]
Successfully created user: [username]
User data successfully fetched/created: [username]
Token updated with user data
```

## Common Issues and Solutions:

### 1. Firebase Service Account Key Issues
- **Problem**: Invalid or malformed service account key
- **Solution**: Download fresh service account key from Firebase Console

### 2. GitHub OAuth Configuration
- **Problem**: Incorrect client ID/secret or callback URL
- **Solution**: Verify GitHub OAuth app settings in GitHub Developer Settings

### 3. NextAuth Configuration
- **Problem**: Missing or incorrect NEXTAUTH_SECRET
- **Solution**: Generate a secure random string for NEXTAUTH_SECRET

### 4. CORS Issues
- **Problem**: Cross-origin requests blocked
- **Solution**: Ensure NEXTAUTH_URL matches your development URL

## Next Steps:

1. Run the Firebase test script
2. Check all environment variables are set
3. Try signing in and monitor console logs
4. If issues persist, check the specific error messages in the logs

## Files Modified:

- `src/server/implementations/user.impl.ts` - Added missing function and logging
- `src/server/auth/callbacks/jwt.callback.ts` - Added error handling and logging
- `src/server/services/user.service.ts` - Added comprehensive logging
- `src/server/auth/mappers/user.mapper.ts` - Added debugging logs
- `src/server/utils/firebase-admin.ts` - Added validation and error handling
- `test-firebase.js` - Created Firebase connection test
- `DEBUG_CHECKLIST.md` - This debugging guide 