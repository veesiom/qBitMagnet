
# qBitMagnet
**Version 0.0.1** (Initial Release)

A Chrome extension that captures magnet links from web pages and sends them to qBittorrent Web UI for downloading.

English language not yet implemented in code (see Future Improvements).

## Description

The qBitMagnet extension simplifies the process of adding torrents to qBittorrent by automatically detecting magnet links on any webpage and sending them to your qBittorrent Web UI instance. It includes a popup interface to configure the qBittorrent URL, username, and password.

### Features

- Automatically captures magnet links when clicked on any webpage.
- Sends magnet links to qBittorrent Web UI via API.
- Configurable settings via a popup (URL, username, and password).
- Notifications to confirm successful or failed torrent additions.

### Requirements

- **qBittorrent**: Version 4.6.3 or later with Web UI enabled.
- **Google Chrome**: Compatible with Chrome browser (Manifest V3).
- **Network**: qBittorrent Web UI must be accessible (e.g., `http://192.168.10.10:8080` or `https://192.168.10.10:8080`).

## Installation

### Clone the Repository:

```bash
git clone https://github.com/veesiom/qBitMagnet.git
cd qBitMagnet
```

### Load the Extension in Chrome:

1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" in the top right corner.
3. Click "Load unpacked" and select the `qBitMagnet` folder.

### Configure qBittorrent:

1. Ensure **Web UI** is enabled in qBittorrent settings.
2. Note the **Web UI URL** (e.g., `https://192.168.100.10:8080`).
3. Set a **username** and **password** if authentication is required.

### Set Up the Extension:

1. Click the extension icon in Chrome.
2. Enter the **qBittorrent Web UI URL**, **username**, and **password** in the popup.
3. Click "Save" to store the settings.

## Usage

1. Browse any webpage with magnet links.
2. Click a magnet link, and the extension will send it to qBittorrent.
3. A notification will appear to confirm success or display an error (e.g., `401 Unauthorized`).

## Known Issues

- **CSRF Protection**: When "Enable Cross-Site Request Forgery (CSRF) protection" is enabled in qBittorrent, the extension may return a `401 Unauthorized` error. This is due to the need for an `XSRF-TOKEN`, which the current version does not handle.  
  **Workaround**: Disable CSRF protection in qBittorrent settings for now.
  
- **HTTPS**: If using a self-signed certificate, ensure it is trusted in Chrome, or switch to HTTP for testing.

## Troubleshooting

- **401 Unauthorized**: Verify the URL, username, and password. If CSRF is enabled, consider disabling it or updating the extension to handle `XSRF-TOKEN` (see Future Improvements).
- **No Response**: Check the browser console (`chrome://extensions/` → Service Worker → Console) for logs.
- **CORS Issues**: Ensure qBittorrent allows cross-origin requests or add `chrome-extension://<extension-id>` to CORS settings.

## Future Improvements

- Add support for `XSRF-TOKEN` to work with CSRF protection enabled.
- Improve HTTPS handling for self-signed certificates.
- Add option to bypass authentication for local networks.
- Enhance popup UI with validation and feedback.
- Add support for English.
- Make an icon lol.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Feel free to submit issues or pull requests on GitHub. Contributions are welcome!

## Credits

Me + 4 liters of beer + couple AI adjustments.
Icon found on the internet.
