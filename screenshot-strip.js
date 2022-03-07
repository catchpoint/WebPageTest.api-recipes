const WebPageTest = require("webpagetest");
const fs = require("fs");
const Stream = require("stream").Transform;
const https = require("https");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

const testId = "TEST_ID"; // Your Test Id

wpt.getTestResults(testId, (err, result) => {
  if (result) {
    result.data.median.firstView.videoFrames.forEach((item, index) => {
      https
        .request(item.image, function (response) {
          var data = new Stream();

          response.on("data", function (chunk) {
            data.push(chunk);
          });

          response.on("end", function () {
            fs.writeFileSync(`screenshot-${index}.png`, data.read());
          });
        })
        .end();
    });
  } else {
    console.log(err);
  }
});
