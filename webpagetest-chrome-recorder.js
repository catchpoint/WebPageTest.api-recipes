import WebPageTest from "webpagetest";
import { WPTStringifyChromeRecording } from "webpagetest-chrome-recorder";

//Recording generated using chrome recorder
const recordingContent = {
  title: "Webpagetest Chrome Recorder",
  steps: [
    {
      type: "setViewport",
      width: 1263,
      height: 600,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false,
    },
    {
      type: "navigate",
      url: "https://blog.webpagetest.org/",
      assertedEvents: [
        {
          type: "navigation",
          url: "https://blog.webpagetest.org/",
          title: "WebPageTest Blog",
        },
      ],
    },
    {
      type: "click",
      target: "main",
      selectors: [["header li:nth-of-type(2) > a"]],
      offsetY: 27.802078247070312,
      offsetX: 26.427078247070312,
      assertedEvents: [
        {
          type: "navigation",
          url: "https://blog.webpagetest.org/categories/webpagetest-news/",
          title: "",
        },
      ],
    },
  ],
};

//Converting json recording to webpagetest script
const script = await WPTStringifyChromeRecording(recordingContent);
console.log("\nStringified Webpagetest Recorder Script: \n\n" + script + "\n");

// Initializing webpagetest
const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let options = {
  firstViewOnly: true,
  label: recordingContent.title,
};

console.log("Webpagetest Custom Script Test Result: \n");

// Run the test using webpagetest script
wpt.runTest(script, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});
