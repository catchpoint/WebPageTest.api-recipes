import WebPageTest from "webpagetest";

const wptServer = "https://www.webpagetest.org";
const wpt = new WebPageTest(wptServer, "YOUR_API_KEY");

let testURL = "https://docs.webpagetest.org/"; //Your URL here

let options = {
  pollResults: 5,
  timeout: 240,
  lighthouse: 1, // This parameter will generate both WPT results and Lighthouse report
};

// Run the test
wpt.runTest(testURL, options, (err, result) => {
  if (result) {
    console.log(`\n
      Lighthouse scores:
       Performance: ${result.data.lighthouse.categories.performance.score * 100},
       Accessibility: ${result.data.lighthouse.categories.accessibility.score * 100},
       Best Practices: ${result.data.lighthouse.categories["best-practices"].score * 100},
       SEO: ${result.data.lighthouse.categories.seo.score * 100},
       PWA: ${result.data.lighthouse.categories.pwa.score * 100}

      Lighthouse report: https://www.webpagetest.org/lighthouse.php?test=${result.data.id}
      Full WebPageTest results: ${result.data.summary}
    `);
  } else {
    console.log(err);
  }
});
