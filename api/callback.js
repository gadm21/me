export default async function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).send('<html><body>Error: No code provided</body></html>');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code: code
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`<html><body>Error: ${data.error_description}</body></html>`);
    }

    const token = data.access_token;
    const content = `
<!DOCTYPE html>
<html>
  <head>
    <title>OAuth Callback</title>
  </head>
  <body>
    <script>
      (function() {
        function receiveMessage(e) {
          console.log("receiveMessage", e);
          window.opener.postMessage(
            'authorization:github:success:{"token":"${token}","provider":"github"}',
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        console.log("Sending authorizing message");
        window.opener.postMessage("authorizing:github", "*");
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
