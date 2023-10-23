document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate');

    generateButton.addEventListener('click', function () {
        // capture HTML content
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: captureEntireHTML,
            });
        });
    });
});

function captureEntireHTML() {
    const entireHTML = document.documentElement.outerHTML;

    // sends to content script.
    chrome.runtime.sendMessage({ entireHTML }, function (response) {
        if (response.blurredHTML) {
            // replace original html data with new secure html data
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: replaceHTML,
                args: [response.blurredHTML],
            });
        }
    });
}
