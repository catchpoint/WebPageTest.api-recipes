import WebPageTest from "webpagetest";

const wptServer = "https://www.webpagetest.org";
const wpt = new WebPageTest(wptServer, "YOUR_API_KEY");

let testId = "YOUR_TEST_ID"; //Your URL here

// Retrieving Chrome Trace Data
wpt.getChromeTraceData(testId, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});
