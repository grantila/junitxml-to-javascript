"use strict";

const {expect} = require("chai");
const Parser = require("../src/parser/parser");
const fs = require("fs");
const path = require("path");

describe("xml report parser", function () {
    it("parseXMLString() - failed.xml", function (done) {

        let s = fs.readFileSync(path.join(__dirname, "resources", "failed.xml"));

        new Parser().parseXMLString(s)
            .then(r => {
                expect(r.testsuites.length).equal(1);
                expect(r.testsuites[0].name).equal("my.package.class.Something");
                expect(new Date(r.testsuites[0].timestamp).getTime()).equal(1512580452000);
                expect(r.testsuites[0].properties.length).equal(2);
                expect(JSON.stringify(r.testsuites[0].properties)).equal(JSON.stringify([{
                    name: "java.runtime.name",
                    value: "OpenJDK Runtime Environment"
                }, {
                    name: "sun.boot.library.path",
                    value: "/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.111-1.b15.el7_2.x86_64/jre/lib/amd64"
                }]));
                expect(r.testsuites[0].testCases.length).equal(4);

                expect(r.testsuites[0].testCases[1].name).equal("test02StartWith");
                expect(r.testsuites[0].testCases[1].duration).equal(72.29);
                expect(r.testsuites[0].testCases[1].result).equal("failed");
                expect(r.testsuites[0].testCases[1].message).equal("Timed out after 60 seconds waiting");

                expect(r.testsuites[0].testCases[2].name).equal("test03StartWithPagination");
                expect(r.testsuites[0].testCases[2].duration).equal(0);
                expect(r.testsuites[0].testCases[2].result).equal("skipped");
                expect(r.testsuites[0].testCases[2].message).equal("");

                expect(r.testsuites[0].succeeded).equal(1);
                expect(r.testsuites[0].tests).equal(4);
                expect(r.testsuites[0].errors).equal(1);
                expect(r.testsuites[0].skipped).equal(2);
                expect(r.testsuites[0].tag).equal("GENERAL");
                expect(r.testsuites[0].durationSec).equal(241.98);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("parseXMLString() - failed2.xml", function (done) {

        let s = fs.readFileSync(path.join(__dirname, "resources", "failed2.xml"));

        new Parser().parseXMLString(s)
            .then(r => {
                expect(r.testsuites.length).equal(1);
                expect(r.testsuites[0].name).equal("my.package.class.Something");
                expect(new Date(r.testsuites[0].timestamp).getTime()).equal(1512580452000);
                expect(r.testsuites[0].properties.length).equal(0);

                expect(r.testsuites[0].testCases.length).equal(4);
                expect(r.testsuites[0].testCases[1].name).equal("test02StartWith");
                expect(r.testsuites[0].testCases[1].duration).equal(72.29);
                expect(r.testsuites[0].testCases[1].result).equal("failed");
                expect(r.testsuites[0].testCases[1].message).equal("Timed out after 60 seconds waiting");

                expect(r.testsuites[0].succeeded).equal(1);
                expect(r.testsuites[0].tests).equal(4);
                expect(r.testsuites[0].errors).equal(1);
                expect(r.testsuites[0].skipped).equal(2);
                expect(r.testsuites[0].tag).equal("GENERAL");
                expect(r.testsuites[0].durationSec).equal(241.98);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("parseXMLString() - passed.xml", function (done) {

        let s = fs.readFileSync(path.join(__dirname, "resources", "passed.xml"));

        new Parser().parseXMLString(s)
            .then(r => {
                expect(r.testsuites.length).equal(1);
                expect(r.testsuites[0].name).equal("1my.package.class.Something");
                expect(new Date(r.testsuites[0].timestamp).getTime()).equal(1512580584000);
                expect(r.testsuites[0].properties.length).equal(0);

                expect(r.testsuites[0].testCases.length).equal(2);
                expect(r.testsuites[0].testCases[0].name).equal("test00Monitoring");
                expect(r.testsuites[0].testCases[0].duration).equal(0.15);
                expect(r.testsuites[0].testCases[0].result).equal("succeeded");
                expect(r.testsuites[0].testCases[0].message).equal("");

                expect(r.testsuites[0].succeeded).equal(2);
                expect(r.testsuites[0].tests).equal(2);
                expect(r.testsuites[0].errors).equal(0);
                expect(r.testsuites[0].skipped).equal(0);
                expect(r.testsuites[0].tag).equal("GENERAL");
                expect(r.testsuites[0].durationSec).equal(43.4);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("parseXMLFile() - passed2.xml", function (done) {

        new Parser().parseXMLFile(path.join(__dirname, "resources", "passed2.xml"))
            .then(r => {
                expect(r.testsuites.length).equal(1);
                expect(r.testsuites[0].name).equal("1my.package.class.Something");
                expect(new Date(r.testsuites[0].timestamp).getTime()).equal(1512580584000);
                expect(r.testsuites[0].properties.length).equal(1);

                expect(r.testsuites[0].properties[0].name).equal("java.runtime.name");
                expect(r.testsuites[0].properties[0].value).equal("OpenJDK Runtime Environment");

                expect(r.testsuites[0].testCases.length).equal(2);
                expect(r.testsuites[0].testCases[0].name).equal("test00Monitoring");
                expect(r.testsuites[0].testCases[0].duration).equal(0.15);
                expect(r.testsuites[0].testCases[0].result).equal("succeeded");
                expect(r.testsuites[0].testCases[0].message).equal("");

                expect(r.testsuites[0].succeeded).equal(2);
                expect(r.testsuites[0].tests).equal(2);
                expect(r.testsuites[0].errors).equal(0);
                expect(r.testsuites[0].skipped).equal(0);
                expect(r.testsuites[0].tag).equal("GENERAL");
                expect(r.testsuites[0].durationSec).equal(43.4);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("parseXMLFile() - passed3.xml", function (done) {

        new Parser({customTag: "GENERAL1"}).parseXMLFile(path.join(__dirname, "resources", "passed3.xml"))
            .then(r => {
                expect(r.testsuites.length).equal(1);
                expect(r.testsuites[0].name).equal("1my.package.class.Something");
                expect(new Date(r.testsuites[0].timestamp).getTime()).equal(1512580584000);
                expect(r.testsuites[0].properties.length).equal(1);

                expect(r.testsuites[0].properties[0].name).equal("java.runtime.name");
                expect(r.testsuites[0].properties[0].value).equal("OpenJDK Runtime Environment");

                expect(r.testsuites[0].testCases.length).equal(1);
                expect(r.testsuites[0].testCases[0].name).equal("test00Monitoring");
                expect(r.testsuites[0].testCases[0].duration).equal(0.15);
                expect(r.testsuites[0].testCases[0].result).equal("succeeded");
                expect(r.testsuites[0].testCases[0].message).equal("");

                expect(r.testsuites[0].succeeded).equal(1);
                expect(r.testsuites[0].tests).equal(1);
                expect(r.testsuites[0].errors).equal(0);
                expect(r.testsuites[0].skipped).equal(0);
                expect(r.testsuites[0].tag).equal("GENERAL1");
                expect(r.testsuites[0].durationSec).equal(0.15);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("parseXMLFile() - report.xml", function (done) {

        new Parser({customTag: "GENERAL1"}).parseXMLFile(path.join(__dirname, "resources", "report.xml"))
            .then(r => {
                expect(r.testsuites.length).equal(9);
                expect(r.testsuites[0].name).equal("Access");
                expect(r.testsuites[1].name).equal("BBBB");
                expect(r.testsuites[2].name).equal("grid");
                expect(r.testsuites[3].name).equal("list");
                expect(r.testsuites[4].name).equal("list2");
                expect(r.testsuites[5].name).equal("ctrl");
                expect(r.testsuites[6].name).equal("table");
                expect(r.testsuites[7].name).equal("args");
                expect(r.testsuites[8].name).equal("args2");

                expect(new Date(r.testsuites[0].timestamp).getTime()).equal(1512662456000);
                expect(r.testsuites[0].properties.length).equal(1);

                for (let x of r.testsuites) {
                    expect(x.properties[0].name).equal("browser.fullName");
                    expect(x.properties[0].value).equal("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36");
                }

                expect(r.testsuites[0].testCases.length).equal(2);
                expect(r.testsuites[0].testCases[0].name).equal("can - not specified");
                expect(r.testsuites[0].testCases[0].duration).equal(0.02);
                expect(r.testsuites[0].testCases[0].result).equal("succeeded");
                expect(r.testsuites[0].testCases[0].message).equal("");
                expect(r.testsuites[0].testCases[1].name).equal("can - no role specified");
                expect(r.testsuites[0].testCases[1].duration).equal(0.02);
                expect(r.testsuites[0].testCases[1].result).equal("failed");
                expect(r.testsuites[0].testCases[1].message).equal("");

                expect(r.testsuites[0].succeeded).equal(1);
                expect(r.testsuites[0].tests).equal(2);
                expect(r.testsuites[0].errors).equal(1);
                expect(r.testsuites[0].skipped).equal(0);
                expect(r.testsuites[0].tag).equal("GENERAL1");
                expect(r.testsuites[0].durationSec).equal(0.04);

                expect(r.testsuites[1].testCases.length).equal(1);
                expect(r.testsuites[1].testCases[0].name).equal("importFile 2");
                expect(r.testsuites[1].testCases[0].duration).equal(0.01);
                expect(r.testsuites[1].testCases[0].result).equal("succeeded");

                done();
            })
            .catch(e => {
                done(e);
            });
    });

});