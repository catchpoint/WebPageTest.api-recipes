import WebPageTest from "webpagetest";
import fs from "fs";
import axios from "axios";

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  firstViewOnly: true,
  location: "Dulles:Chrome",
  connectivity: "4G",
  pollResults: 5, //keep polling for results after test is scheduled
};

wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    result.data.median.firstView.videoFrames.forEach((item, index) => {
      axios({
        method: "get",
        url: item.image,
        responseType: "stream",
      }).then(function (response) {
        response.data.pipe(fs.createWriteStream(`screenshot-${index}.png`));
      });
    });
  } else {
    console.log(err);
  }
});
