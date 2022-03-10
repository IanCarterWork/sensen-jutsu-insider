import { FxScalingIn, FxSlideHorizontal } from "./animation/preset";
import { Component, Jutsu } from "./index";
import { SensenRouter } from "./router";
const HelloComponent = Component({
    name: 'hello',
    state: {
        my: 'SubTitle',
        counter: 0,
        world: 'Hello Title',
    },
    methods: {
        addCounter({ state }) {
            console.log('AddCounter', state.counter);
            state.counter++;
            state.my = `count to ${state.counter}`;
            state.world = null;
        },
        minusCounter({ state }) {
            console.log('MinusCounter', state.counter);
            state.counter--;
        },
    },
    transition: {
        onbuild: FxSlideHorizontal,
        ondestroy: FxSlideHorizontal,
    },
    construct({ element }) {
        // console.warn('Element Construct', element)
        // element.$emitter?.listen<SensenElement<HelloState, HelloState>>('begin', ({ emit, type })=>{
        //     console.warn(type, '=>', emit )
        // })
        // element.$emitter?.listen<SensenElement<HelloState, HelloState>>('done', ({ emit, type })=>{
        //     console.warn(type, '=>', emit )
        // })
    },
    mount({ element }) {
        // console.warn('Mount Component', this.state)
        // return new Promise<string>((done, fail)=>{
        //     setTimeout(()=>{
        //         done("data.done")
        //     }, 3000)
        // })
    },
    unmount() {
        console.log('UnMount Now', this);
    },
    render({ element, children, state }) {
        // let timer = setInterval(()=>{
        //     console.log('Counter', state?.counter, element )          
        //     state.counter = (state?.counter||0) + 1;
        // }, 1000)
        // setTimeout(()=>{
        //     clearInterval(timer)
        // }, 6000)
        // console.warn('Get Children', children)
        // console.warn('Render excuting', state, component)
        return `

            <h1>{{ this.$state.world ? this.$state.world : 'no' }}</h1>
            <h1>{{ this.$state.my }}</h1>
            <h3>{{ this.$state.counter }}</h3>

            <button type="button" @click.prevent="this.methods.addCounter">Incrementer</button>
            <button type="button" @click.stop="this.methods.minusCounter">Decrementer</button>


            <br>
            <br>
            <br>

            <a href="javascript:void(0)" @click="this.$application.$router.get('home',{world:'Pink me'})">Home</a>
            
            <a href="javascript:void(0)" @click="this.$application.$router.get('about',{})">About</a>
            
        `;
        return null;
    }
});
const WorldComponent = Component({
    name: 'world',
    state: {
        counter: 0,
        world: 'World Title'
    },
    appearance: {
        $self: {
            backgroundColor: 'red'
        }
    },
    transition: {
        onbuild: FxScalingIn,
        ondestroy: FxScalingIn,
    },
    render: ({ state }) => {
        // console.log('WorldComponent', state)
        return `

            <h1>{{ this.$state.world }}</h1>

            <h1>{{ this.$state.counter }}</h1>

            <hr>

            <sense-hello state:world="{%= this.$state.world %}"> </sense-hello>
        
        `;
        return null;
    }
});
Jutsu.Kuchiyoce('sandbox', {
    state: {
        appName: 'Hell Guys'
    },
    main(state, canvas) {
        // console.warn('Kuchioyce State', state, this)
        return (new SensenRouter({
            default: 'home',
            canvas
        }))
            .add({
            uri: 'home',
            method: 'get',
            component: HelloComponent
        })
            .add({
            uri: 'about',
            method: 'get',
            component: WorldComponent
        })
            .run(state);
        /*
                return `
        
                    <h1>Sensen Jutsu Revolte</h1>
        
                    <sense-hello prop:world="IanCarter is Great">
        
                        <p class="title" title="{{ this.state.world }}" >Lorem ipsum</p>
                        
                        <h1>{{ this.state.world }}</h1>
                        <h3>{{ this.state.my }}</h3>
                        <h3>{{ this.state.counter }}</h3>
                        <p class="foreach">
                        {% if(this.state.world){ %}
                            <span>{%= this.state.world %}</span>
                        {% } %}
                        </p>
                        <div>
                            {% if(this.state.my){ %}
                                <p>{%= this.state.my %}</p>
                            {% } %}
                        </div>
                        <h3>{{ this.state.counter }}</h3>
        
                        <button type="button" @click="this.methods.addCounter">Incrementer</button>
                        <button type="button" @click="this.methods.minusCounter">Decrementer</button>
        
                    </sense-hello>
        
                `
         */
    }
});
