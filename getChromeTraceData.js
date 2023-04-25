import WebPageTest from "webpagetest";

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testId = "YOUR_TEST_ID"; //Your URL here

// Retrieving Chrome Trace Data
wpt.getChromeTraceData(testId, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});
