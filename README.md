# WhatsApp Keyword Response Bot

This is a simple WhatsApp bot built using the `whatsapp-web.js` library. The bot automatically replies to messages based on keywords from multiple JSON files (`responses.json`, `inforesponses.json`, `kata_responses.json`, and `agakresponses.json`). Additionally, it randomly selects a quote from `kata_responses.json` when the message contains the phrase "kata kata hari ini".

## Features

- Auto-reply based on keywords from multiple JSON files.
- Prioritizes responses from `inforesponses.json`.
- Randomly selects a quote when the keyword "kata kata hari ini" is detected.
- Supports session persistence using `LocalAuth`.

## Prerequisites

- Node.js installed on your machine.
- WhatsApp account for the bot.
- `whatsapp-web.js` library.

## Installation

1. Clone this repository or download the code.

2. Install the required dependencies:
   ```bash
   npm install whatsapp-web.js qrcode-terminal fs
   ```
3. Create the following JSON files in the root directory:
    - `responses.json`: Contains general keyword responses.
    - `inforesponses.json`: Contains higher-priority keyword responses.
    - `kata_responses.json`: Contains an array of quotes for the "kata kata hari ini" feature.
    - `agakresponses.json`: Contains medium-priority keyword responses.

## Usage
1. Start the bot:

   ```bash
   node bot.js
   ```
2. Scan the QR code displayed in the terminal to log in to WhatsApp.

3. The bot will automatically reply to messages based on the keyword logic described above.

## Error Handling
  - If the bot encounters an issue reading the JSON files, it will log an error and terminate the process.
  - If an error occurs during message reply, it will be logged to the console.

## License
This project is open-source and available for free use.
```
README ini menjelaskan secara sederhana cara instalasi, penggunaan, dan struktur JSON untuk bot WhatsApp Anda. Anda bisa menggantikan `bot.js` dengan nama file script Anda.
```
