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
