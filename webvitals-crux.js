import WebPageTest from "webpagetest";

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testURL = "https://www.webpagetest.org/"; //Your URL here

let options = {
  firstViewOnly: true,
  location: "Dulles:Chrome",
  pollResults: 5,
  timeout: 240,
};

wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log("<-------------Core Web Vitals------------->");
    console.log({
      CumulativeLayoutShift: result.data.average.firstView["chromeUserTiming.CumulativeLayoutShift"],
      LargestContentfulPaint: result.data.average.firstView["chromeUserTiming.LargestContentfulPaint"],
      TotalBlockingTime: result.data.average.firstView["TotalBlockingTime"],
    });

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
