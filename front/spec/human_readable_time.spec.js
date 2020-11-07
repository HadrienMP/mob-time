var time = require("../src/functions/human_readable_time");
var async = require('async');
var expect = require("chai").expect;

describe("Human Readable Time", function () {
    it("returns the number of seconds when the time is under a minute", function (done) {
        let human_readable = time.simple_format(59 * 1000);
        expect(human_readable).to.equal("59 s");
        done();
    });


    let secondRoundingParamters = [
        {seconds: 1.500, expected: "2 s"},
        {seconds: 1.499, expected: "1 s"}
    ];
    async.each(secondRoundingParamters, function (parameters, callback) {
        it("rounds to closest second when the time is under a minute - " + parameters.seconds + " -> " + parameters.expected, function (done) {
            let human_readable = time.simple_format(parameters.seconds * 1000);
            expect(human_readable).to.equal(parameters.expected);
            done();
        });
        callback();
    });

    describe("Simple Format", function () {
        it("returns only the minutes when the time is one minute", function (done) {
            let human_readable = time.simple_format(60 * 1000);
            expect(human_readable).to.equal("1 min");
            done();
        });
        it("returns only the minutes when the time is more than one minute", function (done) {
            let human_readable = time.simple_format(61 * 1000);
            expect(human_readable).to.equal("1 min");
            done();
        });
        it("returns 1 minute when rounding to 60 seconds", function (done) {
            let human_readable = time.simple_format(59.5 * 1000);
            expect(human_readable).to.equal("1 min");
            done();
        });


        let minuteRoundingParameters = [
            {seconds: (60 + 30), expected: "2 min"},
            {seconds: (60 + 29), expected: "1 min"},
            {seconds: (60 + 29.499), expected: "1 min"},
            {seconds: (60 + 29.5), expected: "2 min"}
        ];
        async.each(minuteRoundingParameters, function (parameters, callback) {
            it("rounds to closest minute - " + parameters.seconds + " s -> " + parameters.expected, function (done) {
                let human_readable = time.simple_format(parameters.seconds * 1000);
                expect(human_readable).to.equal(parameters.expected);
                done();
            });
            callback();
        });
    });

    describe("Extended Format", function () {
        it("returns the minutes and the seconds when the time is one minute", function (done) {
            let human_readable = time.extended_format(60 * 1000);
            expect(human_readable).to.equal("1 min 0 s");
            done();
        });
        it("returns the minutes and the seconds when the time is over one minute", function (done) {
            let human_readable = time.extended_format(61 * 1000);
            expect(human_readable).to.equal("1 min 1 s");
            done();
        });


        let secondRoundingParamters = [
            {seconds: (60 + 29.499), expected: "1 min 29 s"},
            {seconds: (60 + 29.5), expected: "1 min 30 s"}
        ];
        async.each(secondRoundingParamters, function (parameters, callback) {
            it("rounds to closest seconds when the time is over one minute - " + parameters.seconds + " s -> " + parameters.expected, function (done) {
                let human_readable = time.extended_format(parameters.seconds * 1000);
                expect(human_readable).to.equal(parameters.expected);
                done();
            });
            callback();
        });
    });
})
;