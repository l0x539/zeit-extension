/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/app/content.ts ***!
  \****************************/
chrome.runtime.sendMessage({}, (response) => {
    const checkReady = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(checkReady);
            // console.log('We\'re in the injected content script!');
        }
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO0lBQzFDLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDbEMsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUN0QyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUIseURBQXlEO1NBQzFEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzcndwY3gvLi9zcmMvYXBwL2NvbnRlbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe30sIChyZXNwb25zZSkgPT4ge1xuICBjb25zdCBjaGVja1JlYWR5ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICBjbGVhckludGVydmFsKGNoZWNrUmVhZHkpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1dlXFwncmUgaW4gdGhlIGluamVjdGVkIGNvbnRlbnQgc2NyaXB0IScpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==