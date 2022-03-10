import { SensenEmitter } from "./emitter";
export class SensenState {
    constructor(state) {
        this.state = state;
        this.store = {};
        this.$emitter = new SensenEmitter();
        this.store = Object.assign({}, { ...(this.state || {}) });
        this.proxies();
    }
    proxies() {
        if (typeof this.state == 'object') {
            Object.entries(this.state).map($ => {
                const slot = $[0];
                if (Array.isArray($[1])) {
                    this.setObjectProxy(slot, [...$[1]]);
                }
                else if (typeof $[1] == 'object') {
                    this.setObjectProxy(slot, { ...$[1] });
                }
                else {
                    this.setDataProxy(slot);
                }
            });
        }
        return this;
    }
    setObjectProxy(slot, input) {
        const $ = this;
        $.state[slot] = new Proxy(input, {
            get: function (target, prop) {
                return target[prop];
            },
            set: function (target, prop, value, prox) {
                target[prop] = value;
                // console.log('setObjectProxy', prop, value)
                $.$emitter.dispatch('objectHydrates', { slot, value });
                $.$emitter.dispatch('hydrates', { slot, value });
                return true;
            }
        });
        return this;
    }
    setDataProxy(slot) {
        const $ = this;
        Object.defineProperty(this.state, slot, {
            get() { return $.store[slot]; },
            set(value) {
                $.store[slot] = value;
                // console.log('setDataProxy : ', slot, ' = ', value)
                $.$emitter.dispatch('dataHydrates', { slot, value });
                $.$emitter.dispatch('hydrates', { slot, value });
                return true;
            },
        });
        return this;
    }
}
