import WebPageTest from "webpagetest";

const wptServer = "https://www.webpagetest.org";
const wpt = new WebPageTest(wptServer, "YOUR_API_KEY");

let testID = "YOUR_TEST_ID";

let options = {
  run: 1, // the run from which you'd want to fetch the response body
  request: 2, // the request number same as waterfall
  cached: 1, // check for the repeat view
};

// Retrieving response body (Make sure you've enabled the save response body on this test)
wpt.getResponseBody(testID, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});
