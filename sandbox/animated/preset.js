import { SensenAnimationEngine } from "./index";
export class FxPresenter {
    async entry(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [0], to: [100],
                    duration: 360,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.opacity = `${interpolarity[0] / 100}`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
    async entryReverse(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [0], to: [100],
                    duration: 200,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.opacity = `${interpolarity[0] / 10}`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
    async exit(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [100], to: [0],
                    duration: 200,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.opacity = `${interpolarity[0] / 10}`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
    async exitReverse(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [100], to: [0],
                    duration: 200,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.opacity = `${interpolarity[0] / 10}`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
}
export class FxSlideHorizontal extends FxPresenter {
    async entry(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [110], to: [0],
                    duration: 256,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.transform = `translateX(${interpolarity[0]}%)`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
    async entryReverse(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [-110], to: [0],
                    duration: 256,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.transform = `translateX(${interpolarity[0]}%)`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
    async exit(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [0], to: [110],
                    duration: 400,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.transform = `translateX(${interpolarity[0]}%)`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
    async exitReverse(widget) {
        return new Promise((done, fail) => {
            try {
                const fx = new SensenAnimationEngine({
                    from: [0], to: [-110],
                    duration: 400,
                    hit: (interpolarity) => {
                        if (widget) {
                            widget.style.transform = `translateX(${interpolarity[0]}%)`;
                        }
                    },
                    done: () => done(widget)
                });
                fx.Start();
            }
            catch (e) {
                fail(e);
            }
        });
    }
}
