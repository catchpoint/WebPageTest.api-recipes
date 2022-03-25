const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("www.webpagetest.org", "YOUR_API_KEY");
const finalResults = [];

// Your list of URLs to test
let urls = [
  "https://www.webpagetest.org/",
  "https://www.product.webpagetest.org/api",
  "https://docs.webpagetest.org/api/",
  "https://blog.webpagetest.org/",
  "https://www.webpagetest.org/about",
];

let options = {
  firstViewOnly: true,
  location: "Dulles:Chrome",
  connectivity: "4G",
  pollResults: 5,
  timeout: 240,
};

const runTest = (wpt, url, options) => {
  return new Promise((resolve, reject) => {
    console.log(`Submitting test for ${url}...`);
    wpt.runTest(url, options, async (err, result) => {
      try {
        if (result) {
          return resolve(result);
        } else {
          return reject(err);
        }
      } catch (e) {
        console.info(e);
      }
    });
  });
};

(async function () {
  Promise.all(
    urls.map(async (url) => {
      try {
        await runTest(wpt, url, options).then(async (result) => {
          if (result.data) {
            let median = result.data.median.firstView;
            //Pushing the data into the Array
            finalResults.push({
              id: result.data.id,
              url: result.data.url,
              cls: median["chromeUserTiming.CumulativeLayoutShift"],
              lcp: median["chromeUserTiming.LargestContentfulPaint"],
              tbt: median["TotalBlockingTime"],
            });
          }
        });
      } catch (e) {
        console.error(e);
      }
    })
  ).then(() => {
    console.info(finalResults);
  });
})();
