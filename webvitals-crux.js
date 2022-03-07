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
