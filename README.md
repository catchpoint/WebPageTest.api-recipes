<p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p>
<p align="center"><a href="https://docs.webpagetest.org/api/integrations/#officially-supported-integrations">Learn about more WebPageTest API Integrations in our docs</a></p>

# WebPageTest-API-Recipes

A collection of useful recipes for the [WebPageTest API](https://github.com/WebPageTest/webpagetest-api)

## Table Of Contents

- [Emulate a slow network](#emulate-a-slow-network)
- [Emulate a slow network and CPU throttling](#emulate-network-&-cputhrottle)
- [Retrieve your Core Web Vitals](#retrieve-your-core-web-vitals)
- [Retrieve your Core Web Vitals + CrUX data for the tested URL](#retrieve-your-core-web-vitals-+-crux)

<h3 id="emulate-a-slow-network">Emulate a slow network</h3>

```js
const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

// Simulated network throttling (Slow 3G)
let options = {
  location: "Dulles:Chrome", //mandatory with connectivity
  connectivity: "3G",
};

// Run the test
wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});

```

[Source](slow-network.js)

<h3 id="emulate-network-&-cputhrottle">Emulate a slow network and CPU throttling</h3>

```js
const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

// Simulated network & cpu throttling
let options = {
  location: "Dulles:Chrome",
  connectivity: "3G",
  throttleCPU: 5,
};

// Run the test
wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});


```

[Source](slow-network.js)

<h3 id="retrieve-your-core-web-vitals">Retrieve your Core Web Vitals</h3>

```js
const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

// CoreWebVitals
keys = [
  "chromeUserTiming.CumulativeLayoutShift",
  "chromeUserTiming.LargestContentfulPaint",
  "TotalBlockingTime",
];

const testId = "TEST_ID"; // Your Test Id

wpt.getTestResults(testId, (err, result) => {
  if (result) {
    const data = keys.reduce(
      (key, value) => ({
        ...key,
        [value]: result.data.average.firstView[value],
      }),
      {}
    );
    console.log(data);
  } else {
    console.log(err);
  }
});



```

[Source](webvitals.js)


<h3 id="retrieve-your-core-web-vitals-+-crux">Retrieve your Core Web Vitals + CrUX data for the tested URL</h3>

```js
const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

// Extract CoreWebVitals + Crux
const keys = [
  "chromeUserTiming.navigationStart",
  "chromeUserTiming.fetchStart",
  "chromeUserTiming.unloadEventStart",
  "chromeUserTiming.unloadEventEnd",
  "chromeUserTiming.commitNavigationEnd",
  "chromeUserTiming.domLoading",
  "chromeUserTiming.responseEnd",
  "chromeUserTiming.firstPaint",
  "chromeUserTiming.firstContentfulPaint",
  "chromeUserTiming.firstMeaningfulPaintCandidate",
  "chromeUserTiming.firstMeaningfulPaint",
  "chromeUserTiming.firstImagePaint",
  "chromeUserTiming.LayoutShift",
  "chromeUserTiming.domInteractive",
  "chromeUserTiming.domContentLoadedEventStart",
  "chromeUserTiming.domContentLoadedEventEnd",
  "chromeUserTiming.domComplete",
  "chromeUserTiming.loadEventStart",
  "chromeUserTiming.loadEventEnd",
  "chromeUserTiming.LargestContentfulPaint",
  "chromeUserTiming.LargestTextPaint",
  "chromeUserTiming.LargestImagePaint",
  "chromeUserTiming.TotalLayoutShift",
  "chromeUserTiming.CumulativeLayoutShift",
  "TotalBlockingTime",
];

const testId = "TEST_ID"; // Your Test Id

wpt.getTestResults(testId, (err, result) => {
  if (result) {
    const data = keys.reduce(
      (key, value) => ({
        ...key,
        [value]: result.data.average.firstView[value],
      }),
      {}
    );
    console.log(data);
  } else {
    console.log(err);
  }
});




```

[Source](webvitals-crux.js)