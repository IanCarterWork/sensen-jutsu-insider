var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SensenElement_instances, _SensenElement_connectedProtocol;
import { SensenAppearance } from "./appearance";
import { CommonDirectives } from "./directive";
import { SensenEmitter } from "./emitter";
import { FindGlobalExpressions, FindStateData } from "./expression";
import { SensenDataRender, SensenNodeRender, SensenRender, SyntaxDelimiter } from "./render";
import { SensenRouter } from "./router";
import { SensenState } from "./state";
import { CloneObject } from "./utilities";
window.$SensenComponents = window.$SensenComponents || {};
window.$SensenRouter = window.$SensenRouter || {};
/**
 * Sensen Component
 */
export function RawComponent($, config) {
    const $initial = { ...($ || {}) };
    $initial.state = { ...$initial.state };
    return class extends SensenElement {
        constructor($state = {}) {
            super($state);
            this.$observations = {};
            this.$state = {};
            this.$emitter = new SensenEmitter();
            this.$tnamespace = config?.namespace?.prefix || "sense";
            this.$anamespace = config?.namespace?.attribute || "state";
            this.$controller = CloneObject($initial, true);
            this.$methods = this.$controller.methods || {};
            this.$state = Object.assign({}, { ...(this.$controller.state || {}), ...($state || {}) });
            this.$stateMirrors = this.$stateMirrors || {};
            this.$stateHydrates = new SensenState(this.$state);
            this.$state = this.$stateHydrates.state;
            this.$appearance = new SensenAppearance(this.$controller.appearance);
            this.$appearance.mount().bind(this);
            console.warn('Appearance', this.$appearance.$UiD);
            this.$hydrators();
            this.$construct();
        }
        $construct() {
            this.$emitter.listen('begin', ({ emit, type }) => {
                emit.style.display = 'none';
            });
            this.$emitter.listen('done', ({ emit, type }) => {
                emit.style.removeProperty('display');
            });
            if (this.$controller?.construct) {
                this.$controller?.construct({
                    element: this,
                    router: window.$SensenRouter,
                    children: this.children,
                    state: this.$state || {},
                });
            }
            return this;
        }
        $hydrators() {
            this.$stateHydrates = new SensenState(this.$state);
            this.$stateHydrates.$emitter
                .listen('hydrates', ({ emit }) => {
                if (this.$stateMirrors && this.$stateMirrors[emit.slot]) {
                    if (this.$controller?.state) {
                        this.$controller.state[emit.slot] = this.$state[emit.slot];
                        const records = this.$stateMirrors[emit.slot];
                        if (records.length) {
                            this.$emitter.dispatch('hydrates', records);
                            records.map(record => {
                                this.$compilateRecord(record);
                                this.$emitter.dispatch('hydrate', record);
                            });
                        }
                    }
                }
            });
            return this;
        }
        $willMount(args) {
            this.$emitter.dispatch('connected', this);
            return this.$controller?.mount ? this.$controller?.mount({
                element: this,
                router: window.$SensenRouter,
                children: this.children,
                state: this.$state || {},
            }) : undefined;
        }
        $willUnMount(args) {
            this.$emitter.dispatch('disconnected', this);
            return this.$controller?.unmount ? this.$controller?.unmount({
                element: this,
                router: window.$SensenRouter,
                children: this.children,
                state: this.$state || {},
            }) : undefined;
        }
        $willAdopted(args) {
            this.$emitter.dispatch('adopted', this);
            return this.$controller?.adopted ? this.$controller?.adopted({
                element: this,
                router: window.$SensenRouter,
                children: this.children,
                state: this.$state || {},
            }) : undefined;
        }
        $render(state) {
            const _state = (state || this.$state);
            const render = this.$controller?.render({
                element: this,
                router: window.$SensenRouter,
                children: this.children,
                state: _state || {},
            });
            this.$setStates(_state);
            if (typeof render == 'string') {
                this.innerHTML = `${render}`;
            }
            else if (!render) {
                if (this.innerHTML) {
                    this.innerHTML = `${this.innerHTML}`;
                }
            }
            else {
                if (render instanceof HTMLElement) {
                    this.appendChild(render);
                }
            }
            this.$emitter.dispatch('done', this);
            return render;
        }
    };
}
export function Component($) {
    const config = {
        namespace: {
            prefix: 'sense',
            attribute: 'state'
        }
    };
    const index = `sense-${$.name}`;
    window.$SensenComponents[index] = RawComponent($, config);
    SensenElement.$use('sense', $.name, window.$SensenComponents[index]);
    return window.$SensenComponents[index];
}
/**
 * Sensen Element
 */
export class SensenElement extends HTMLElement {
    constructor($state) {
        super();
        this.$state = $state;
        _SensenElement_instances.add(this);
        this.$showing = false;
        this.$inTransition = false;
        // new( $props : Props ) : this
        this.$observations = {};
        // $appearance ?: SensenAppearance
        this.$methods = {};
        // this.$appearance = new SensenAppearance();
        this.$emitter = new SensenEmitter();
        this.$tnamespace = `${this.$tnamespace || 'sense'}-`;
        this.$anamespace = `${this.$anamespace || 'state'}:`;
        this.$stateMirrors = {};
    }
    $willMount(args) { }
    $willUnMount(args) { }
    $willAdopted(args) { }
    $mountManipulation(method, callback) {
        this.mountResponseResolved = undefined;
        this.mountResponseRejected = undefined;
        if (method in this && typeof this[method] == 'function') {
            this.mountResponseResolved = (this[method] || (() => { })).apply(this, [null]);
            if (this.mountResponseResolved instanceof Promise) {
                this.mountResponseResolved
                    .then(r => this.mountResponseResolved = r)
                    .catch(er => {
                    this.mountResponseRejected = er;
                    console.error(`Sensen Component mount failed\n`, er);
                })
                    .finally(() => callback());
            }
            else {
                callback();
            }
        }
        else {
            callback();
        }
        return this;
    }
    connectedCallback() {
        // console.warn('Props', `${ JSON.stringify(this.$props) }`)
        // console.warn('Props->', `${ JSON.stringify(this.getAttribute('prop:world')) }`)
        // this.$router = this.$application?.$router || undefined;
        this.$mountManipulation('$willMount', () => { __classPrivateFieldGet(this, _SensenElement_instances, "m", _SensenElement_connectedProtocol).call(this); });
    }
    adoptedCallback() {
        this.$mountManipulation('$willAdopted', () => { });
    }
    disconnectedCallback() {
        this.$mountManipulation('$willUnMount', () => { });
        // this.$showing = false
    }
    $setSafeProps(value) {
        switch (typeof value) {
            case 'object':
                return JSON.stringify(value);
                break;
            default:
                return `${value}`;
                break;
        }
    }
    $destroy(moment = true) {
        return new Promise((resolved) => {
            const callback = () => {
                this.style.display = 'none';
                this.innerHTML = '';
                resolved(this);
                this.$emitter.dispatch('destroy', this);
                this.$inTransition = false;
                // this.$showing = false
            };
            if (!this.$inTransition && this.$controller?.transition && 'ondestroy' in this.$controller.transition) {
                this.$inTransition = true;
                if (this.$controller.transition.ondestroy &&
                    ('exit' in this.$controller.transition.ondestroy || 'exitReverse' in this.$controller.transition.ondestroy)) {
                    const $display = getComputedStyle(this).display || 'inline';
                    if ($display.match(/inline/)) {
                        this.style.display = 'block';
                    }
                    if (moment === true && typeof this.$controller.transition.ondestroy.exit == 'function') {
                        this.$controller.transition.ondestroy.exit(this)
                            .then(done => callback());
                    }
                    if (moment === false && typeof this.$controller.transition.ondestroy.exitReverse == 'function') {
                        this.$controller.transition.ondestroy.exitReverse(this)
                            .then(done => callback());
                    }
                }
                else {
                    callback();
                }
            }
            else {
                this.$inTransition = true;
                callback();
            }
        });
    }
    $build(moment = true, host) {
        return new Promise((resolved) => {
            const hosted = (host instanceof HTMLElement) ? host.appendChild(this) : false;
            const callback = () => {
                this.style.removeProperty('display');
                resolved(this);
                this.$emitter.dispatch('build', this);
                this.$inTransition = false;
                // this.$showing = true
            };
            if (!this.$inTransition && this.$controller?.transition && 'onbuild' in this.$controller.transition) {
                this.$inTransition = true;
                if (this.$controller.transition.onbuild &&
                    ('entry' in this.$controller.transition.onbuild || 'entryReverse' in this.$controller.transition.onbuild)) {
                    const $display = getComputedStyle(this).display || 'inline';
                    if ($display.match(/inline/)) {
                        this.style.display = 'block';
                    }
                    if (moment === true && typeof this.$controller.transition.onbuild.entry == 'function') {
                        this.$controller.transition.onbuild.entry(this)
                            .then(done => callback());
                    }
                    if (moment === false && typeof this.$controller.transition.onbuild.entryReverse == 'function') {
                        this.$controller.transition.onbuild.entryReverse(this)
                            .then(done => callback());
                    }
                }
                else {
                    callback();
                }
            }
            else {
                this.$inTransition = true;
                callback();
            }
        });
    }
    $initialize(state) {
        return this;
    }
    $render(state) {
        throw (`Sensen Element : Any "$render" method detected`);
    }
    $listeners() {
        if (this instanceof KuchiyoceElement) {
            this.$emitter.listen('contentChanges', ({ emit }) => {
                if (emit.target instanceof SensenElement &&
                    this instanceof KuchiyoceElement) {
                    // emit.target.$syncProps()
                    emit.target.$compilate();
                    this.$bewitchment(emit.target);
                }
            });
        }
        if (!(this instanceof KuchiyoceElement)) {
            this.$emitter.listen('contentChanges', ({ emit }) => {
                if (!(emit.target instanceof KuchiyoceElement)) {
                    if (emit.target instanceof SensenElement) {
                        // emit.target.$syncProps()
                        emit.target.$compilate();
                    }
                }
            });
        }
        return this;
    }
    $compilateRecord(record) {
        if (record.type == 'attribute') {
            if (record.node instanceof SensenElement) {
                // record.node.$syncProps();
            }
            SensenDataRender((record.attribute ? record.attribute.value || ''
                : (record.mockup ? record.mockup.nodeValue || '' : '')), (record.node instanceof SensenElement && record.node.$parentComponent instanceof SensenElement)
                ? record.node.$parentComponent
                : this, (record.node instanceof SensenElement && record.node.$parentComponent instanceof SensenElement)
                ? (record.node.$parentComponent.$controller || {})
                : (this.$controller || {}), record).then(compilate => {
                if (record.node instanceof HTMLElement) {
                    record.node.setAttribute(`${record.attribute?.name}`, `${compilate}`);
                }
            });
        }
        else if (record.type == 'echo' || record.type == 'snapcode') {
            // console.warn('$Props', `${ this.$props.world }`, record.node, this.$controller?.props?.world )
            SensenNodeRender(record.mockup || record.node, this, this.$controller || {}, record).then(compilate => {
                // console.log("Compilate Content", compilate)
                if (record.node instanceof Text) {
                    record.node.textContent = `${compilate}`;
                }
                else if (record.node instanceof HTMLElement) {
                    record.node.innerHTML = `${compilate}`;
                }
            });
        }
        else if (record.type == 'directive') {
            if (!('directive' in record)) {
                throw (`Corrupted directive : not found`);
            }
            if (typeof record.directive?.main != 'function') {
                throw (`Corrupted directive : < ${record.directive?.name} >`);
            }
            record.directive.main({ component: this, record });
        }
        return this;
    }
    $compilate() {
        const expressions = FindGlobalExpressions(this, (record) => {
            /** * Find State var */
            FindStateData(this, record);
            this.$compilateRecord(record);
        });
        if (expressions.length) {
            expressions.map(child => {
            });
        }
        this.$setStates();
        return this;
    }
    $observers() {
        if (this.$observations instanceof MutationObserver) {
            this.$observations.disconnect();
        }
        this.$observations = new MutationObserver((records) => {
            if (records) {
                this.$emitter.dispatch('changes', [records]);
                if (records.length) {
                    records.map(record => {
                        switch (record.type) {
                            case 'attributes':
                                if (record.attributeName) {
                                    const check = record.attributeName.match(new RegExp(`${this.$anamespace}:`, 'g'));
                                    const value = this.getAttribute(record.attributeName);
                                    if (check && this.$anamespace) {
                                        const slot = record.attributeName.toLowerCase().substring(this.$anamespace.length + 1);
                                        if (slot) {
                                            this.$state[slot] = (this.$setSafeProps(value));
                                        }
                                    }
                                    this.$emitter.dispatch('propChange', {
                                        old: record.oldValue,
                                        value: this.getAttribute(record.attributeName),
                                        name: record.attributeName,
                                    });
                                }
                                break;
                            case 'characterData':
                            case 'childList':
                                if (record.target instanceof SensenElement) {
                                    record.target.$application = this.$application;
                                }
                                record.addedNodes.forEach(child => {
                                    if (child instanceof SensenElement) {
                                        child.$application = this.$application;
                                        child.$parentComponent = this;
                                    }
                                    this.$emitter.dispatch('addedChild', child);
                                });
                                record.removedNodes.forEach(child => {
                                    this.$emitter.dispatch('removedChild', child);
                                });
                                this.$emitter.dispatch('contentChanges', record);
                                break;
                        }
                    });
                    this.$emitter.dispatch('changesDone', records);
                }
            }
        });
        this.$observations.observe(this, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            // attributeFilter: Object.entries(this.$state || {})
            //     .map($=>`${ this.$anamespace }${ $[0] }`)
        });
        return this;
    }
    $setStates(state) {
        const $state = (state || {});
        return new Promise((resolved) => {
            const promises = [];
            const defaultState = { ...this.$controller?.state, /* ...(state||{})  */ };
            Object.entries(defaultState).map($ => promises.push(new Promise((next) => {
                const rawname = $[0];
                const name = `state:${rawname}`;
                const value = ($state[rawname] || this.getAttribute(`${name}`));
                if (value) {
                    this.$state[rawname] = value;
                    this.setAttribute(name, this.$setSafeProps(value));
                }
                next(value);
            })));
            Promise.allSettled(promises)
                .then(results => {
                resolved(this.$state);
            });
        });
    }
    static $use($namspace, $name, $klass) {
        const _name = `${$namspace}-${$name}`;
        if (!customElements.get(_name) && $klass) {
            customElements.define(_name, $klass);
        }
        return this;
    }
}
_SensenElement_instances = new WeakSet(), _SensenElement_connectedProtocol = function _SensenElement_connectedProtocol() {
    this
        .$initialize()
        .$observers()
        .$listeners()
        .$render();
    this.$emitter.dispatch('build', this);
    // this.$showing = true
    return this;
};
/**
 * Sensen Kuchiyoce Element
 */
export class KuchiyoceElement extends SensenElement {
    constructor($params) {
        super($params.state || {});
        this.$params = $params;
        this.$tnamespace = 'sensen';
        this.$anamespace = 'prop';
        if (!this.parentNode) {
            document.body.insertBefore(this, document.body.firstChild);
        }
    }
    $bewitchment(element) {
        if (element) {
            element.$application = this;
        }
        else {
            const children = this.querySelectorAll('*');
            if (children.length) {
                children.forEach(child => {
                    if (child instanceof SensenElement) {
                        child.$application = this;
                    }
                });
            }
        }
        return this;
    }
    $render(state) {
        const render = this.$params.main(state || this.$params.state || { children: '' }, this);
        if (typeof render == 'string') {
            this.innerHTML = render;
        }
        if (render instanceof SensenRouter) {
            this.$router = render;
        }
        else {
            if (render instanceof HTMLElement) {
                this.appendChild(render);
            }
        }
        this.$bewitchment();
        return null;
    }
}
export class Jutsu {
    static Kuchiyoce(name, params) {
        // params.props = params.props || {} as T
        KuchiyoceElement.$use('sensen', name, KuchiyoceElement);
        return new KuchiyoceElement(params);
    }
}
/**
 * Create Component Method Event
 */
export function CreateComponentMethodEvent(component, event) {
    const _ = {
        event,
        element: component,
        router: window.$SensenRouter,
        children: component.children,
        state: component.$state,
    };
    return _;
}
CommonDirectives.Define({
    name: 'action',
    type: '-attribute',
    expression: '@',
    main: ({ component, record }) => {
        if (component instanceof SensenElement && record) {
            /**
             * HTMLElement Only
             */
            if (record.node instanceof HTMLElement && component instanceof SensenElement) {
                const alreadyKey = `directiveState${record.directive?.expression}`;
                const args = Array.isArray(record.arguments) ? record.arguments : [];
                /**
                 * Evité les abus de définition
                 */
                if (record.node[alreadyKey]) {
                    return;
                }
                /**
                 * Definition de l'évènement
                 */
                record.node.addEventListener(`${record.name}`, (ev) => {
                    record.matches?.map(match => {
                        const attrib = (('attributes' in record.node)
                            ? record.node.getAttribute(match?.input || '')
                            : '')?.trim();
                        CommonDirectives.parseArguments({
                            args,
                            component,
                            record,
                            event: ev,
                        });
                        // if(args.indexOf('prevent') > -1){ ev.preventDefault() }
                        // if(args.indexOf('stop') > -1){ ev.stopPropagation() }
                        /**
                         * Check Component methods
                         */
                        const isMethod = attrib?.indexOf(`this.methods.`) == 0;
                        // const isRouter = attrib?.indexOf(`$router.`) == 0;
                        const _event = CreateComponentMethodEvent(component, ev);
                        if (isMethod && component.$methods) {
                            const method = component.$methods[attrib.substring((`this.methods.`).length)];
                            /** * Check is transaction function */
                            if (typeof method == 'function') {
                                method.apply(component.$state, [_event]);
                            }
                        }
                        else {
                            SensenRender(`<${SyntaxDelimiter} ${attrib} ${SyntaxDelimiter}>`, component, component);
                        }
                        // else{
                        //     if(typeof attrib == 'string' && attrib in window){
                        //         const fn = (window[attrib as keyof Window] || (()=>{})) as Function
                        //         if(typeof fn == 'function'){
                        //             fn.apply(window, [_event])
                        //         }
                        //     }
                        // }
                    });
                }, args.indexOf('capture') > -1 ? true : false);
                // @ts-ignore
                record.node[alreadyKey] = true;
            }
        }
    },
});
