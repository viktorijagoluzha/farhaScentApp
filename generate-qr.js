const QRCode = require('qrcode');
const fs = require('fs');

// Your Netlify app URL
const appURL = 'https://stupendous-taiyaki-1614bb.netlify.app';

// Generate QR code as SVG
QRCode.toString(appURL, { type: 'svg', width: 300 }, (err, svg) => {
  if (err) throw err;
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farha Scent App - QR Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        p {
            color: #666;
            margin-bottom: 30px;
        }
        .qr-code {
            background: white;
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .url {
            margin-top: 20px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 8px;
            word-break: break-all;
            color: #333;
            font-family: monospace;
        }
        .instructions {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌸 Farha Scent App</h1>
        <p>Scan the QR code to visit the app</p>
        <div class="qr-code">
            ${svg}
        </div>
        <div class="url">
            ${appURL}
        </div>
        <div class="instructions">
            <p><strong>How to use:</strong></p>
            <p>Open your phone's camera app and point it at the QR code.<br>
            Tap the notification to open the Farha Scent app in your browser.</p>
        </div>
    </div>
</body>
</html>
  `;
  
  fs.writeFileSync('qr-code.html', htmlContent);
  console.log('✅ QR code generated successfully!');
  console.log('📱 Open qr-code.html in your browser to view and scan the QR code');
});

// Also generate PNG version
QRCode.toFile('qr-code.png', appURL, {
  width: 500,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
}, (err) => {
  if (err) throw err;
  console.log('✅ QR code PNG saved as qr-code.png');
});
