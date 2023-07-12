import WebPageTest from "webpagetest";

const wptServer = "https://www.webpagetest.org";
const wpt = new WebPageTest(wptServer, "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

// Simulated custom connectivity options (custom)
let options = {
  connectivity: "custom",
  location: "ec2-us-east-1:Chrome",
  label: "custom connectivity",
  bandwidthDown: 1000,
  bandwidthUp: 1000,
  latency: 5,
  packetLossRate: 5,
};

// Run the test
wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});
