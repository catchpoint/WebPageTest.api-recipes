<p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p>
<p align="center"><a href="https://docs.webpagetest.org/api/integrations/#officially-supported-integrations">Learn about more WebPageTest API Integrations in our docs</a></p>

# WebPageTest-API-Recipes

A collection of useful recipes for the [WebPageTest API](https://github.com/WebPageTest/webpagetest-api)

## Table Of Contents

- [Emulate a slow network](#emulate-a-slow-network)
- [Emulate a slow network and CPU throttling](#emulate-network-&-cputhrottle)
- [Retrieve your Core Web Vitals](#retrieve-your-core-web-vitals)
- [Run a test with a third-party domain blocked](#run-a-test-with-a-third-party-domain-blocked)
- [Run a test and get the filmstrip screenshots](#run-a-test-and-get-the-filmstrip-screenshots)

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

<h3 id="run-a-test-and-get-the-filmstrip-screenshots">Run a test and get the filmstrip screenshots</h3>

```js
const WebPageTest = require("webpagetest");
const fs = require("fs");
const Stream = require("stream").Transform;
const https = require("https");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

const testId = "TEST_ID"; // Your Test Id

wpt.getTestResults(testId, (err, result) => {
  if (result) {
    result.data.median.firstView.videoFrames.forEach((item, index) => {
      https
        .request(item.image, function (response) {
          var data = new Stream();

          response.on("data", function (chunk) {
            data.push(chunk);
          });

          response.on("end", function () {
            fs.writeFileSync(`screenshot-${index}.png`, data.read());
          });
        })
        .end();
    });
  } else {
    console.log(err);
  }
});


```

[Source](screenshot-strip.js)