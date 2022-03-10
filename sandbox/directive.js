export class Directives {
    static Define(state) {
        this.Availables[state.name] = state;
        return this;
    }
    static Merge(...directives) {
        directives.map(directive => {
            if (directive.name in this.Availables) {
                throw (`WARNING ${directive.name} : You want to change the behavior of an existing attribute directive`);
            }
            this.Availables[directive.name] = directive;
        });
        return this;
    }
    static Retrive(key) {
        return this.Availables[key] || null;
    }
    static Retrives(directive) {
        return this.Merge(directive || {}).Availables;
    }
    static parseArguments({ args, component, record, event, }) {
        if (!args) {
            return this;
        }
        if (!args.length) {
            return this;
        }
        /**
         * Find Directives
         */
        Object.values(this.Availables || {})
            .filter(directive => directive.type == '-attribute.argument')
            .map(directive => {
            args.map(arg => {
                if (arg &&
                    directive.expression &&
                    arg.match(new RegExp(directive.expression, 'g'))) {
                    directive.main({ component, record, event, args });
                }
            });
        });
        return this;
    }
}
Directives.Availables = {};
window.$GlobalDirectives = window.$GlobalDirectives || Directives;
export const CommonDirectives = window.$GlobalDirectives;
/**
 * PreventDefault Argument
 */
CommonDirectives.Define({
    name: 'action.arguments',
    type: '-attribute.argument',
    expression: 'prevent',
    main: ({ component, record, args, event }) => {
        event?.preventDefault();
    },
});
/**
 * StopImmediatePropagation Argument
 */
CommonDirectives.Define({
    name: 'action.arguments',
    type: '-attribute.argument',
    expression: 'stopImmediate',
    main: ({ component, record, args, event }) => {
        event?.stopImmediatePropagation();
    },
});
/**
 * StopPropagation Argument
 */
CommonDirectives.Define({
    name: 'action.arguments',
    type: '-attribute.argument',
    expression: 'stop',
    main: ({ component, record, args, event }) => {
        event?.stopPropagation();
    },
});
