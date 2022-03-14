const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

keys = [
  "chromeUserTiming.CumulativeLayoutShift",
  "chromeUserTiming.LargestContentfulPaint",
  "TotalBlockingTime",
];

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  firstViewOnly: true,
  location: "Dulles:Chrome",
  pollResults: 5,
  timeout: 240,
};

wpt.runTest(testURL, options, (err, result) => {
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
