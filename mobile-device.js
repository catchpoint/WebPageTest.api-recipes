import WebPageTest from "webpagetest";

const wptServer = "https://www.webpagetest.org";
const wpt = new WebPageTest(wptServer, "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  location: "ec2-us-east-1:Chrome",
  label: "emulate mobile device",
  firstViewOnly: true,
  emulateMobile: true,
  device: "Nexus5", // optional (default: MotoG4)
};

//List of support devices https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/mobile_devices.ini

// Run the test
wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});
