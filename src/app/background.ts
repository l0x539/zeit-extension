chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background got a message!');
  sendResponse({});
});

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === 'Zeit') {
    port.onDisconnect.addListener(function() {
      chrome.runtime.reload();
    });
  }
});
