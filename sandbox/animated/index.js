export class SensenAnimationEngine {
    constructor(options) {
        this.options = options;
        this.defaultFrame = 1000 / 60;
    }
    Start() {
        const interpolarity = [];
        const frame = this.options.duration / (this.options.frame || this.defaultFrame);
        /**
         * Profilling
         */
        this.options.from.forEach((v, k) => {
            const delta = (Math.abs(this.options.to[k] - v) / frame);
            const sens = this.options.to[k] > v;
            let from = v;
            let to = sens ? this.options.to[k] + delta : this.options.to[k] - delta;
            interpolarity[k] = [];
            if (sens) {
                for (let x = from; x <= to; x += delta) {
                    interpolarity[k][interpolarity[k].length] = x >= this.options.to[k] ? this.options.to[k] : x;
                }
            }
            else {
                for (let x = from; x >= to; x -= delta) {
                    interpolarity[k][interpolarity[k].length] = (x <= this.options.to[k]) ? this.options.to[k] : x;
                }
            }
        });
        /**
         * Play
         */
        if (!interpolarity.length) {
            throw (`Sensen.Fx.Engine : No Interpolarity Data < ${JSON.stringify(interpolarity)} >`);
        }
        let x = 0;
        const limit = interpolarity[0].length - 1;
        const player = () => {
            const couple = interpolarity.map(entry => entry[x]);
            const percent = (x / limit) * 100;
            if (x >= limit) {
                this.options.hit(interpolarity.map(entry => entry[limit]), this, percent);
                if (typeof this.options.done == 'function') {
                    this.options.done(this);
                }
            }
            else {
                x++;
                this.options.hit(couple, this, percent);
                globalThis.requestAnimationFrame(player);
            }
        };
        /**
         * Trigger Engine
         */
        player();
        return this;
    }
}
