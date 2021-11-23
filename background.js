// opens a communication port
chrome.runtime.onConnect.addListener(function(port) {

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && /^http/.test(tab.url)){
            chrome.scripting.executeScript({
                target: { tabId: tabId},
                files: ["Writedata.js"]
            })
            .then(()=>{
                console.log("Data analyzed")
            })
            .catch(err => console.log(err));
        }
    })

});
