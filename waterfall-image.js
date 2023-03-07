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
    let imgurl = result.data.median.firstView.images.waterfall;

    axios({
      method: "get",
      url: imgurl,
      responseType: "stream",
    }).then(function (response) {
      response.data.pipe(fs.createWriteStream("waterfall.png"));
    });
  } else {
    console.log(err);
  }
});
