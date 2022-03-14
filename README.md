<p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p>
<p align="center"><a href="https://docs.webpagetest.org/api/integrations/#officially-supported-integrations">Learn about more WebPageTest API Integrations in our docs</a></p>

# WebPageTest-API-Recipes

A collection of useful recipes for the [WebPageTest API](https://github.com/WebPageTest/webpagetest-api)

## Table Of Contents

- [Emulate a slow network](#emulate-a-slow-network)
- [Emulate a slow network and CPU throttling](#emulate-network-&-cputhrottle)
- [Retrieve your Core Web Vitals](#retrieve-your-core-web-vitals)
- [Retrieve your Core Web Vitals + CrUX data for the tested URL](#retrieve-your-core-web-vitals-+-crux)
- [Run a test with a third-party domain blocked](#run-a-test-with-a-third-party-domain-blocked)
- [Run a test and get the filmstrip screenshots](#run-a-test-and-get-the-filmstrip-screenshots)
- [Run a test and generate a lighthouse report](#run-a-test-and-generate-a-lighthouse-report)
- [Run a multi-step test with scripting](#run-a-multi-step-test-with-scripting)

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

[Source](network-and-cpu-throttling.js)

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

keys = [
  "chromeUserTiming.CumulativeLayoutShift",
  "chromeUserTiming.LargestContentfulPaint",
  "TotalBlockingTime",
];

const testId = "TEST_ID"; // Your Test ID

wpt.getTestResults(testId, (err, result) => {
  if (result) {
    const data = keys.reduce(
      (key, value) => ({
        ...key,
        [value]: result.data.average.firstView[value],
      }),
      {}
    );
    console.log("<-------------Core Web Vitals------------->");
    console.log(data);

    if (result.data.median.firstView.CrUX !== undefined) {
      console.log("<----------------Crux Data---------------->");
      console.log(result.data.median.firstView.CrUX);
    } else {
      console.log("No CrUX Data Found");
    }
  } else {
    console.log(err);
  }
});

```

[Source](webvitals-crux.js)

<h3 id="run-a-test-with-a-third-party-domain-blocked">Run a test with a third-party domain blocked</h3>

```js
const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testURL = "https://theverge.com"; //Your URL here

// URL's must be seprated by spaces (space-delimited)
let options = {
  block:
    "https://pagead2.googlesyndication.com https://creativecdn.com https://www.googletagmanager.com https://cdn.krxd.net https://adservice.google.com https://cdn.concert.io https://z.moatads.com https://cdn.permutive.com",
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

[Source](third-party-domain-blocked.js)

<h3 id="run-a-test-and-get-the-filmstrip-screenshots">Run a test and get the filmstrip screenshots</h3>

```js
const WebPageTest = require("webpagetest");
const fs = require("fs");
const axios = require("axios");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  firstViewOnly: true,
  location: "Dulles:Chrome",
  connectivity: "4G",
  pollResults: 5, //keep polling for results after test is scheduled
};

wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    result.data.median.firstView.videoFrames.forEach((item, index) => {
      axios({
        method: "get",
        url: item.image,
        responseType: "stream",
      }).then(function (response) {
        response.data.pipe(fs.createWriteStream(`screenshot-${index}.png`));
      });
    });
  } else {
    console.log(err);
  }
});

```

[Source](screenshot-strip.js)

<h3 id="run-a-test-and-generate-a-lighthouse-report">Run a test and generate a lighthouse report</h3>

```js
const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  pollResults: 5,
  timeout: 240,
  testtype: "lighthouse",
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

[Source](lighthouse.js)

<h3 id="run-a-multi-step-test-with-scripting">Run a multi-step test with scripting</h3>

```js
const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let options = {
  pollResults: 5,
  firstViewOnly: true, //Skips the Repeat View test
};

const script = wpt.scriptToString([
  { logData: 0 },
  { navigate: "http://foo.com/login" },
  { logData: 1 },
  { setValue: ["name=username", "johndoe"] },
  { setValue: ["name=password", "12345"] },
  { submitForm: "action=http://foo.com/main" },
  "waitForComplete",
]);

// Run the test
wpt.runTest(script, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});

```

Visit [Scripting Docs](https://docs.webpagetest.org/scripting/) for more information 

[Source](multistep.js)