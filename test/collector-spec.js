var should = require('should'),
    collector = require('../collector');

describe("Collector Units", function () {

    describe("getARGV", function () {
        it("should return argument value", function () {
            var argv = [
                "node",
                "app",
                "-something",
                "value",
                "-somethingElse",
                "anotherValue"
            ];
            var result = collector.getARGV(argv, "something");
            result.should.equal("value");
            result = collector.getARGV(argv, "somethingElse");
            result.should.equal("anotherValue");
        });
    });

    describe("makeRequest", function () {
        it("should make a request", function (done) {
            collector.makeRequest("http://www.nodejs.org", function(html) {
                html.should.be.ok;
                done();
            });
        });
    });

    describe("Collector", function () {

        it("should move files from one folder to another");

        it("should download a webpage and save it to a folder");

        it("should throw errors with incorrect arguments")

        it("should throw an error when there is a problem with the url");

    });

});

describe("Collector CLI", function () {

    it("should run by name");

    it("should show usage message when arguments are not supplied");

    it("should display help");

});