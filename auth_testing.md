# Auth-Gated App Testing Playbook

## Step 1: Create Test User & Session
```bash
mongosh --eval "
use('focusflow_db');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  id: userId,
  email: 'test.user.' + Date.now() + '@example.com',
  name: 'Test User',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date().toISOString()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
  created_at: new Date().toISOString()
});
db.user_stats.insertOne({
  id: 'stats-' + Date.now(),
  user_id: userId,
  total_study_minutes: 0,
  total_breaks: 0,
  last_timer_duration: 25,
  updated_at: new Date().toISOString()
});
print('Session token: ' + sessionToken);
print('User ID: ' + userId);
"
```

## Step 2: Test Backend API
```bash
# Test auth endpoint
curl -X GET "https://focusflow-135.preview.emergentagent.com/api/auth/me" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN"

# Test stats endpoint
curl -X GET "https://focusflow-135.preview.emergentagent.com/api/stats" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN"
```

## Step 3: Browser Testing with Playwright
```javascript
// Set cookie and navigate
await page.context().addCookies([{
    "name": "session_token",
    "value": "YOUR_SESSION_TOKEN",
    "domain": "focusflow-135.preview.emergentagent.com",
    "path": "/",
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
}]);
await page.goto("https://focusflow-135.preview.emergentagent.com");
```

## Important Notes
- MongoDB stores dates as ISO strings in this implementation
- Session tokens expire after 7 days
- User stats are created automatically on first user creation
- Always test with timezone-aware datetime comparisons