let core = require("../../src/pomodoro/core");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

describe("Pomodoro", () => {
    let breakSignal;
    let displayLeftRatio;
    beforeEach(() => {
        breakSignal = sinon.fake();
        displayLeftRatio = sinon.fake();
    });

    describe("Time passed", () => {
        describe('Break signal', function () {
            it("is given when the time ran out", () => {
                let state = core.handle({
                    "ratio": 1,
                    "state": {"breakSignaled": false}
                }, displayLeftRatio, breakSignal);
                expect(breakSignal).to.have.been.called;
                expect(state.breakSignaled).to.be.true;
            });

            it("is given when the time ran out (over)", () => {
                let state = core.handle({
                    "ratio": 1.00001,
                    "state": {"breakSignaled": false}
                }, displayLeftRatio, breakSignal);
                expect(breakSignal).to.have.been.called;
                expect(state.breakSignaled).to.be.true;
            });

            it("is not given when there is time left", () => {
                let state = core.handle({
                    "ratio": 0.9999999,
                    "state": {"breakSignaled": false}
                }, displayLeftRatio, breakSignal);
                expect(breakSignal).not.to.have.been.called;
                expect(state.breakSignaled).to.be.false;
            });

            it("is not given when it was already given", () => {
                let state = core.handle({
                    "ratio": 1.1,
                    "state": {"breakSignaled": false}
                }, displayLeftRatio, breakSignal);
                state = core.handle({"ratio": 1.2, "state": state}, displayLeftRatio, breakSignal);
                core.handle({"ratio": 1.3, "state": state}, displayLeftRatio, breakSignal);
                expect(breakSignal).to.have.been.calledOnce;
            });

            it("is not given when there is a turn in progress", () => {
                let data = {"ratio": 1.1, "turnInProgress": true, "state": {"breakSignaled": false}};
                core.handle(data, displayLeftRatio, breakSignal);
                expect(breakSignal).not.to.have.been.called;
            });
        });

        describe("Progress bar", () => {
            it("displays the time left", () => {
                core.handle({"ratio": 0.25, "state": {"breakSignaled": false}}, displayLeftRatio, breakSignal);
                expect(displayLeftRatio).to.have.been.calledOnceWith(0.75);
            });

            it("does not display overtime", () => {
                core.handle({"ratio": 1.1, "state": {"breakSignaled": false}}, displayLeftRatio, breakSignal);
                expect(displayLeftRatio).to.have.been.calledOnceWith(0);
            });

            it("display the progress bar full when ratio absent", () => {
                core.handle({"ratio": null, "state": {"breakSignaled": false}}, displayLeftRatio, breakSignal);
                expect(displayLeftRatio).to.have.been.calledOnceWith(0);
            });
        });

        describe("State", () => {
            it('break signal is false when a break was previously signaled and another pomodoro was started', () => {
                let state = core.handle({
                    "ratio": 0.2,
                    "state": {"breakSignaled": true}
                }, displayLeftRatio, breakSignal);
                expect(state.breakSignaled).to.be.false;
            });
            it('break signal is true when a break was signaled and ratio is one or more ', function () {
                let state = core.handle({
                    "ratio": 1,
                    "state": {"breakSignaled": true}
                }, displayLeftRatio, breakSignal);
                expect(state.breakSignaled).to.be.true;
            });
        });
    });
});
