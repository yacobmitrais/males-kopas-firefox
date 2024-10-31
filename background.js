browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.executeScript({
        file: 'content.js'
    });
});

browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const { type } = request;
        if (type === 'put') {
            console.log(request);

            browser.storage.sync.set({ authValues: request.values })
                .then(() => sendResponse(true));
        } else {
            browser.storage.sync.get(['authValues'])
                .then((values) => sendResponse(values));
        }

        return true;
    }
);
