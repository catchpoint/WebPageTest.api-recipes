import WebPageTest from "webpagetest";

const wptServer = "https://www.webpagetest.org";
const wpt = new WebPageTest(wptServer, "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  firstViewOnly: true,
  location: "Dulles:Chrome",
  pollResults: 5,
  timeout: 240,
  // Set you budget specs here
  specs: {
    average: {
      firstView: {
        "chromeUserTiming.CumulativeLayoutShift": 0.1,
        "chromeUserTiming.LargestContentfulPaint": 2500,
        firstContentfulPaint: 2000,
        TotalBlockingTime: 0.1,
      },
    },
  },
};

wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log(`Your results are here for test ID:- ${result.testId}`);
  } else {
    console.log(err);
  }
});
