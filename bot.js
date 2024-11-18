const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// Load JSON files
let responses, infoResponses, kataResponses, agakResponses;

try {
    // Parsing the necessary JSON files
    responses = JSON.parse(fs.readFileSync('responses.json', 'utf-8'));
    infoResponses = JSON.parse(fs.readFileSync('inforesponses.json', 'utf-8'));
    kataResponses = JSON.parse(fs.readFileSync('kata_responses.json', 'utf-8'));
    agakResponses = JSON.parse(fs.readFileSync('agakresponses.json', 'utf-8'));
} catch (error) {
    console.error('Error reading one of the JSON files:', error);
    process.exit(1); // Exit the script if there's an issue reading the files
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and display QR code in terminal
    const qrcode = require('qrcode-terminal');
    console.log('Scan QR code to login:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', () => {
    console.log('Authenticated successfully!');
});

client.on('message', async message => {
    const pesanMasuk = message.body.toLowerCase(); // Convert message to lowercase for case-insensitive matching

    // Check if the message contains 'kata kata hari ini'
    if (pesanMasuk.includes('kata kata hari ini')) {
        // Select a random quote from kata_responses.json
        const randomIndex = Math.floor(Math.random() * kataResponses.quotes.length);
        const randomQuote = kataResponses.quotes[randomIndex]['kata kata hari ini'];

        console.log('Random Quote:', randomQuote); // Log the random quote for debugging

        try {
            // Reply with the random quote
            await message.reply(randomQuote);
            // Clear console after sending the message
            console.clear();
        } catch (err) {
            console.error('Error during message reply:', err);
        }
    } else {
        // Initialize response variable
        let response;

        // Check if the message contains any of the keywords from all JSON files
        const allKeywords = [
            ...Object.keys(responses),
            ...Object.keys(infoResponses),
            ...Object.keys(kataResponses.quotes.reduce((acc, quote) => {
                return { ...acc, ...quote };
            }, {})),
            ...Object.keys(agakResponses)
        ];
        
        for (const keyword of allKeywords) {
            if (pesanMasuk.includes(keyword)) {
                // Determine the response based on priority
                if (infoResponses[keyword]) {
                    response = infoResponses[keyword];
                    break; // Prioritize infoResponses
                } else if (agakResponses[keyword]) {
                    response = agakResponses[keyword];
                    break; // Then check agakResponses
                } else if (responses[keyword]) {
                    response = responses[keyword];
                    break; // Finally check responses
                }
            }
        }

        // If a valid response is found, reply to the message
        if (response) {
            try {
                await message.reply(response);
                // Clear console after sending the message
                console.clear();
            } catch (err) {
                console.error('Error during message reply:', err);
            }
        }
    }
});

// Initialize the WhatsApp client
client.initialize();
