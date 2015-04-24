var wd = require('wd');
require('colors');
var _ = require("lodash");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// checking sauce credential
if(!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY){
    console.warn(
        '\nPlease configure your sauce credential:\n\n' +
        'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
        'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
    );
    throw new Error("Missing sauce credentials");
}

// http configuration, not needed for simple runs
wd.configureHttp( {
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
});

var desired = JSON.parse(process.env.DESIRED || '{browserName: "chrome"}');
desired.name = 'Toyota Yaris MLP with ' + desired.browserName;
desired.tags = ['yaris-mlp'];

describe('MLP Base Color Selector (' + desired.browserName + ')', function() {
    var browser;
    var allPassed = true;

    before(function(done) {
        var username = process.env.SAUCE_USERNAME;
        var accessKey = process.env.SAUCE_ACCESS_KEY;
        browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
        if(process.env.VERBOSE){
            // optional logging     
            browser.on('status', function(info) {
                console.log(info.cyan);
            });
            browser.on('command', function(meth, path, data) {
                console.log(' > ' + meth.yellow, path.grey, data || '');
            });            
        }
        browser
            .init(desired)
            .nodeify(done);
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {
        browser
            .quit()
            .sauceJobStatus(allPassed)
            .nodeify(done);
    });

    it("should load Toyota Yaris MLP", function(done) {
        browser
            .get("http://toyota.com/yaris")
            .title()
            .should.become("2015 Toyota Yaris | Let's explore your world")
            .nodeify(done);
    });

    it("should display the default jelly", function(done) {
        browser
            .elementByClassName("is-on")
            .nodeify(done);
    });

    it("color selection title should be Super White", function(done) {
        browser
            .elementByClassName("mlp-colorizer-name")
            .text().should.become("SUPER WHITE")
            .nodeify(done);
    });

    it("should be able to select Magnetic Gray Metallic", function(done) {
        browser
            .elementByXPath(".//li[3]/i")
            .click()
            .nodeify(done);
    });

    it("color selection should have changed the jelly", function(done) {
        browser
            .elementByClassName("is-loaded")
            .nodeify(done);
    });

    it("should be the correct color selection jelly", function(done) {
        browser
            .waitForElementByClassName("is-loaded")
            .elementByClassName("is-loaded").getAttribute("data-code").should.become("1G3")
            .nodeify(done);
    });

    it("should be the correct color selection title as Magnetic Gray Metallic", function(done) {
        browser
            .elementByClassName("mlp-colorizer-name")
            .text().should.become("MAGNETIC GRAY METALLIC")
            .nodeify(done);
    });

    it("should be able to select Classic Silver Metallic", function(done) {
        browser
            .elementByXPath(".//li[2]/i")
            .click()
            .nodeify(done);
    });

    it("color selection should have changed the jelly", function(done) {
        browser
            .elementByClassName("is-loaded")
            .nodeify(done);
    });

    it("should be the correct color selection jelly", function(done) {
        browser
            .waitForElementByClassName("is-loaded")
            .elementByClassName("is-loaded").getAttribute("data-code").should.become("1F7")
            .nodeify(done);
    });

    it("should be the correct color selection title as Classic Silver Metallic", function(done) {
        browser
            .elementByClassName("mlp-colorizer-name")
            .text().should.become("CLASSIC SILVER METALLIC")
            .nodeify(done);
    });

    it("should be able to select Black Sand Pearl", function(done) {
        browser
            .elementByXPath(".//li[4]/i")
            .click()
            .nodeify(done);
    });

    it("color selection should have changed the jelly", function(done) {
        browser
            .elementByClassName("is-loaded")
            .nodeify(done);
    });

    it("should be the correct color selection jelly", function(done) {
        browser
            .waitForElementByClassName("is-loaded")
            .elementByClassName("is-loaded").getAttribute("data-code").should.become("209")
            .nodeify(done);
    });

    it("should be the correct color selection title as Classic Silver Metallic", function(done) {
        browser
            .elementByClassName("mlp-colorizer-name")
            .text().should.become("BLACK SAND PEARL")
            .nodeify(done);
    });

    it("should be able to select Absolutely Red", function(done) {
        browser
            .elementByXPath(".//li[5]/i")
            .click()
            .nodeify(done);
    });

    it("color selection should have changed the jelly", function(done) {
        browser
            .elementByClassName("is-loaded")
            .nodeify(done);
    });

    it("should be the correct color selection jelly", function(done) {
        browser
            .waitForElementByClassName("is-loaded")
            .elementByClassName("is-loaded").getAttribute("data-code").should.become("3P0")
            .nodeify(done);
    });

    it("should be the correct color selection title as Classic Silver Metallic", function(done) {
        browser
            .elementByClassName("mlp-colorizer-name")
            .text().should.become("ABSOLUTELY RED")
            .nodeify(done);
    });

    it("should be able to select Blue Streak Metallic", function(done) {
        browser
            .elementByXPath(".//li[6]/i")
            .click()
            .nodeify(done);
    });

    it("color selection should have changed the jelly", function(done) {
        browser
            .elementByClassName("is-loaded")
            .nodeify(done);
    });

    it("should be the correct color selection jelly", function(done) {
        browser
            .waitForElementByClassName("is-loaded")
            .elementByClassName("is-loaded").getAttribute("data-code").should.become("8T7")
            .nodeify(done);
    });

    it("should be the correct color selection title as Classic Silver Metallic", function(done) {
        browser
            .elementByClassName("mlp-colorizer-name")
            .text().should.become("BLUE STREAK METALLIC")
            .nodeify(done);
    });
});
