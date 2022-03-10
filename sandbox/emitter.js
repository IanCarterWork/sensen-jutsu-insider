/**
 * Sensen Event Emitter Response
 */
export function EmitterResponse(type, emit) {
    return { type, emit };
}
/**
 * Sensen Event Emitter
 */
export class SensenEmitter {
    constructor() {
        this.entries = {};
        this.listener = [];
        this.dispatcher = [];
    }
    /**
     * Listener
     */
    listen(type, callback) {
        if (this.listener.indexOf(type) == -1) {
            this.listener[this.listener.length] = type;
        }
        if (typeof type == 'string' && typeof callback == 'function') {
            this.entries[type] = this.entries[type] || [];
            this.entries[type].push(callback);
        }
        return this;
    }
    /**
     * Dispatcher
     */
    dispatch(type, args, resolve, reject) {
        if (this.dispatcher.indexOf(type) == -1) {
            this.dispatcher[this.dispatcher.length] = type;
        }
        if (typeof type == 'string') {
            if (type in this.entries) {
                if (this.entries[type] instanceof Array) {
                    this.entries[type].map((entry) => {
                        if (entry instanceof Function) {
                            this.returned = SensenEmitter.resolveDispatcher({
                                instance: this,
                                type,
                                callback: entry,
                                args,
                                resolve,
                                reject,
                            });
                        }
                    });
                }
            }
        }
        return this;
    }
    static resolveDispatcher({ instance, type, args, callback, resolve, reject, }) {
        const $args = {
            emit: args,
            type,
        };
        const applied = callback.apply(instance, [$args]);
        /**
         * Promise
         */
        if (applied instanceof Promise) {
            return applied.then(response => {
                if (typeof resolve == 'function') {
                    resolve(EmitterResponse(type, response));
                }
            }).catch(err => {
                if (typeof reject == 'function') {
                    reject(err);
                }
            });
        }
        else if (typeof applied == 'boolean') {
            return applied;
        }
        else {
            return this;
        }
    }
}
