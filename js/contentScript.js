chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.entireHTML) {
        // Process the HTML with GPT
        const modifiedHTML = processHTMLWithGPT(message.entireHTML);

        // Send the modified HTML back to the popup
        sendResponse({ blurredHTML: modifiedHTML });
    }
});

function processHTMLWithGPT(html) {
    // Node.JS future dev
const apiKey = 'API KEY';

const htmlContent = "<p>This is a sample HTML content with sensitive information like Social Security Numbers: 123-45-6789, Phone Numbers: +1 727-727-7727, and Emails: chatgptopenai@gmail.com. Please detect all personally identifiable information in this code and only these specific portions within the text, you must blur them using CSS.</p>";

async function processHTMLWithGPT(html) {
    try {
        const prompt = `Analyze and suggest changes for the following HTML content: ${html}`;
        
        // Send a request to the GPT-3 API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt,
                max_tokens: 150
            })
        });

        const result = await response.json();
        const suggestions = result.choices[0].text;

        // Apply the suggestions to the HTML content
        const modifiedHTML = html.replace(/Sensitive Information/g, suggestions);

        return modifiedHTML;
    } catch (error) {
        console.error('Error processing HTML with GPT-3:', error);
        return html; // Return the original HTML on error
    }
}

processHTMLWithGPT(htmlContent).then((modifiedHTML) => {
    console.log(modifiedHTML);
});
    const blurredHTML = html.replace(/sensitive-text/g, '***SENSITIVE INFORMATION***');

    return blurredHTML;
}
