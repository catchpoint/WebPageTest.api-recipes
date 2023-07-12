import WebPageTest from "webpagetest";

const wptServer = "https://www.webpagetest.org";
const wpt = new WebPageTest(wptServer, "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  firstViewOnly: true,
  location: "Dulles:Chrome",
  pollResults: 5,
  timeout: 240,
};

wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log({
      CumulativeLayoutShift:
        result.data.average.firstView["chromeUserTiming.CumulativeLayoutShift"],
      LargestContentfulPaint:
        result.data.average.firstView["chromeUserTiming.LargestContentfulPaint"],
      TotalBlockingTime: result.data.average.firstView["TotalBlockingTime"],
    });
  } else {
    console.log(err);
  }
});
