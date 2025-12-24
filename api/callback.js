export default async function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).send('<html><body>Error: No code provided</body></html>');
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).send('<html><body>Error: OAuth credentials not configured. Please set OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET in Vercel environment variables.</body></html>');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`<html><body>Error: ${data.error_description || data.error}</body></html>`);
    }

    if (!data.access_token) {
      return res.status(400).send(`<html><body>Error: No access token received. Response: ${JSON.stringify(data)}</body></html>`);
    }

    const token = data.access_token;
    const content = `
<!DOCTYPE html>
<html>
  <head>
    <title>OAuth Callback</title>
  </head>
  <body>
    <p>Authentication successful! Redirecting...</p>
    <script>
      (function() {
        var token = "${token}";
        var provider = "github";
        var origin = window.location.origin;
        
        // Store token for the CMS
        localStorage.setItem('netlify-cms-user', JSON.stringify({
          access_token: token,
          token_type: 'bearer',
          provider: provider
        }));
        
        if (window.opener) {
          try {
            // Try postMessage first
            window.opener.postMessage(
              'authorization:' + provider + ':success:{"token":"' + token + '","provider":"' + provider + '"}',
              origin
            );
            console.log("Sent success message to opener");
            setTimeout(function() { window.close(); }, 500);
          } catch(e) {
            console.log("postMessage failed, redirecting");
            window.location.href = '/admin/';
          }
        } else {
          // No opener, redirect
          console.log("No opener, redirecting to admin");
          window.location.href = '/admin/';
        }
      })();
    </script>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(content);
  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).send(`<html><body>Error: ${error.message}</body></html>`);
  }
}
