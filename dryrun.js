const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "YOUR_API_KEY");

let options = {
  dryRun: true, // outputs the api endpoint
};

// multistep script
const script = wpt.scriptToString([
  { navigate: "https://timkadlec.com/" },
  { execAndWait: 'document.querySelector("#nav > ul > li:nth-child(2) > a").click();' },
  { execAndWait: 'document.querySelector("#nav > ul > li:nth-child(3) > a").click();' },
  { execAndWait: 'document.querySelector("#nav > ul > li:nth-child(4) > a").click();' },
]);

// fire up the runtest function with a script or a url
wpt.runTest(script, options, (err, result) => {
  if (result) {
    console.log(result);
  } else {
    console.log(err);
  }
});
