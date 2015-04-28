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
desired.name = 'Color Selector Component on ' + desired.browserName;
desired.tags = ['res-plus'];

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

    it("should load Color Selector Molecule", function(done) {
        browser
            .get("http://devixd.toyota.com/tcom-ui/molecules/color-selector")
            .title()
            .should.become("Color Selector Component")
            .nodeify(done);
    });

    it("should contain 'Prices and colors' blurb at bottom", function(done) {
        browser
            .elementByClassName("tcom-color-selector-disclaimer")
            .text().should.become("Prices and colors may vary by model.")
            .nodeify(done);
    });

    it("color selection title on load should be Nautical Blue Metallic", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("NAUTICAL BLUE METALLIC")
            .nodeify(done);
    });

    it("should be able to select Attitude Black Metallic", function(done) {
        browser
            .elementByXPath("//button[3]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Attitude Black Metallic", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("ATTITUDE BLACK METALLIC")
            .nodeify(done);
    });

    it("should be able to select Super White", function(done) {
        browser
            .elementByXPath("//button[4]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Super White", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("SUPER WHITE")
            .nodeify(done);
    });

    it("should be able to select Celestial Silver Metallic", function(done) {
        browser
            .elementByXPath("//button[5]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Celestial Silver Metallic", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("CELESTIAL SILVER METALLIC")
            .nodeify(done);
    });

    it("should be able to select Predawn Gray Mica", function(done) {
        browser
            .elementByXPath("//button[6]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Predawn Gray Mica", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("PREDAWN GRAY MICA")
            .nodeify(done);
    });

    it("should be able to select Cosmic Gray Mica", function(done) {
        browser
            .elementByXPath("//button[7]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Cosmic Gray Mica", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("COSMIC GRAY MICA")
            .nodeify(done);
    });

    it("should be able to select Ruby Flare Pearl", function(done) {
        browser
            .elementByXPath("//button[2]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Ruby Flare Pearl", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("RUBY FLARE PEARL")
            .nodeify(done);
    });

    it("should be able to select Crème Brulee Mica", function(done) {
        browser
            .elementByXPath("//button[8]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Crème Brulee Mica", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("CRÈME BRULEE MICA")
            .nodeify(done);
    });

    it("should be able to select Parisian Night Pearl", function(done) {
        browser
            .elementByXPath("//button[9]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Parisian Night Pearl", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("PARISIAN NIGHT PEARL")
            .nodeify(done);
    });

    it("should be able to select Blizzard Pearl", function(done) {
        browser
            .elementByXPath("//button[10]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Blizzard Pearl", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("BLIZZARD PEARL")
            .nodeify(done);
    });

    it("should be able to select Blue Crush Metallic", function(done) {
        browser
            .elementByXPath("//button[11]")
            .click()
            .nodeify(done);
    });

    it("should be the correct color selection title as Blue Crush Metallic", function(done) {
        browser
            .elementByClassName("tcom-color-selector-name")
            .text().should.become("BLUE CRUSH METALLIC")
            .nodeify(done);
    });
});
