import { SensenElement } from "./index";
import { isClass } from "./utilities";






export class SensenRouter implements SensenRouter{


    routes: SensenRouterRoutes = {} as SensenRouterRoutes;

    currentComponent?: InstanceType<typeof SensenElement>;

    currentRoute?: SensenRouterRoute;



    constructor(
        
        public options : SensenRouterOptions
        
    ){

        this.initialize()

    }
    
    

    add(route : SensenRouterRoute) : this{

        const key = route.uri as keyof SensenRouterScheme
        
        this.routes[ key ] = route

        return this
        
    }



    initialize() : this{


        if(!(this.options.canvas instanceof SensenElement)){

            throw (`SensenRouter : The canvas is not a SensenElement`)
            
        }


        window.addEventListener('hashchange', ()=>{

            const uri = (location.hash ? location.hash.substring(1) : this.options.default) as keyof SensenRouterScheme
            
            const route = this.routes[ uri ] || undefined

            if(route){

                const $canvas = route.canvas || this.options.canvas
                
                this.navigate( 
                    
                    route.method, 
                    
                    route.uri, 
                    
                    {}, 
                    
                    $canvas instanceof SensenElement ? $canvas : undefined  
                    
                )
            
            }

            else{

                history.go(-1)

                history.replaceState({}, document.title, location.href )

                console.error(route)

                throw ('SensenRouter : Route not found')
                
            }
            
            // this.navigate( route.method, route.uri, {} )

        })
        

        return this
        
    }

    clean() : this{

        return this
        
    }

    concateURI(slug : keyof SensenRouterScheme) : SensenRouterURI{

        const ex = (`${ slug }`).split('?')

        return {

            name: ex[0] as keyof SensenRouterScheme,

            search: ex[1]||''

        }
        
    }


    isDeployed(instance : InstanceType<typeof SensenElement>) : boolean{

        if(instance instanceof SensenElement && instance.$application instanceof SensenElement){

            const query = `${ instance.$application?.tagName } > ${ instance.tagName }`;

            return instance.$application?.querySelector( query ) ? true : false;
    
        }

        return false;
        
    }
    


    stabilizeUI(){

        const $canvas = this.options.canvas

        if($canvas instanceof HTMLElement){

            if($canvas.children.length){
    
                Object.values($canvas.children).forEach(child=>{

                    if(child instanceof HTMLElement){

                        child.style.display = 'block';
                        
                    }
                    
                })
                
            }
    
        }
        
        return this;

    }
    
    

    navigate(

        method: SensenRouterMethod,
        
        uri : keyof SensenRouterScheme, 
        
        state : SensenElementState,

        canvas?: InstanceType<typeof SensenElement>
        
    ) : Promise<
        
        SensenRouterRoute
        
    >{

        const $uri = this.concateURI(uri);

        const $canvas = canvas || this.options.canvas || undefined;

        const $method = method || 'get';


        return new Promise<
            
            SensenRouterRoute
            
        >((resolved, rejected) => {

            const route = this.routes[ $uri.name as keyof SensenRouterScheme ] || undefined


            if(route && this.currentRoute && route.uri == this.currentRoute.uri){

                if(route.component instanceof SensenElement){

                    route.component.$render(state);

                }

                resolved(route)

            }
            
            
            else if(route ){


                if(route.component instanceof SensenElement && $canvas instanceof SensenElement){

                    this.switch(
    
                        $canvas,
                            
                        route.component,
    
                        this.currentComponent,

                        state
    
                    ).then(current=>{
    
                        this.switchDone({ uri : $uri.name, route, current, canvas: $canvas });
                        
                    })
    
    
                }
    
                else if(route.component && isClass(route.component)){
    
                    // @ts-ignore
                    const $instance = (new route.component(state))
                    
                    if($instance instanceof SensenElement && $canvas instanceof SensenElement){

                        route.component = $instance
    
                        this.switch(
    
                            $canvas,
                            
                            $instance,
    
                            this.currentComponent,

                            state
    
                        ).then(current=>{

                            this.switchDone({ uri : $uri.name, route, current, canvas: $canvas });
                            
                        })
                        
                    }
    
                    else{
    
                        throw (`SensenRouter : Route component is not a SensenElement Class instance"`)
                     
                    }
    
                }
    
                else{
                   
                    throw (`SensenRouter : Route component not found"`)
                     
                }
                
            }

            else{ 

                console.error('Route', route)
                
                throw (`SensenRouter : Route not found (${ uri }) `); 
            
            }

            

        });
        
    }



    switchDone({ uri, route, current, canvas } : SensenRouterSwitchRequest){

        if(current instanceof SensenElement){

            const _uri = `#${ uri }`

            this.currentComponent = current;

            this.currentRoute = route;

            route.canvas = canvas;

            if(this.getCurrentURI() && this.getCurrentURI() != _uri){ return this; }

            else{ location.href = `${ _uri }`; }

            
        }

        return this;

    }
    
    

    switch(

        canvas: InstanceType<typeof SensenElement>,
        
        entry: InstanceType<typeof SensenElement>, 
        
        exit?: InstanceType<typeof SensenElement>,

        state?: SensenElementState

        
    ){

        return new Promise<typeof entry>((resolved, rejected)=>{

            if(canvas instanceof SensenElement){

                if(entry instanceof SensenElement){

                    const deployed = this.isDeployed(entry);

                    const firstTime = !entry.$showing

                    entry.style.position = 'absolute';

                    entry.style.top = '0';

                    entry.style.left = '0';



                    if(exit instanceof SensenElement){

                        exit.style.position = 'absolute';

                        exit.style.top = '0';

                        exit.style.left = '0';
    
                        exit.$destroy(firstTime ? false : true ).then(element=>{

                            if(!firstTime){ exit.$showing = false }

                        })

                    }
            
                    if(deployed){

                        entry.style.removeProperty('display');

                        entry.$render(state);
                        
                    }
                    
                    if(!deployed){
                        
                        canvas.appendChild( entry )

                    }

                    entry.$showing = true

                    entry.$build(firstTime ? true : false)

                    .then(element=>{

                        resolved(entry)

                    })
    
            
                }
    
                else{ 

                    rejected(entry)
                    
                    throw (`SensenRouter : The entry component is not a SensenElement`) 
                    
                }
                
            }
            
            else{ 

                rejected(entry)
                
                throw (`SensenRouter : The canvas is not a SensenElement`) 
            
            }
            
        })

    }



    getCurrentURI() : string | undefined {

        return location.hash ? location.hash.substring(1) : undefined
        
    }
    


    run(state?: SensenElementState) : this{

        const index = this.getCurrentURI() || this.options.default || Object.keys( this.routes )[0] || undefined


        if(index){

            const route = this.routes[ index as keyof SensenRouterScheme ] || undefined

            if(route){
                
                this.navigate( route.method, route.uri, {} )

            }

            else{

                throw (`SensenRouter : Default route nod found"`)
                
            }
            
        }

        else{

            throw (`SensenRouter : No default route in "option"`)
            
        }
        

        return this
        
    }




    get(
        
        slug : keyof SensenRouterScheme, 
        
        state : SensenElementState,

        canvas?: HTMLElement
        
    ) : Promise<
        
        SensenRouterRoute
        
    >{

        return this.navigate.apply(this, [
            
            'get', slug, state, canvas instanceof SensenElement ? canvas : undefined

        ])
        
    }


    post(
        
        slug : keyof SensenRouterScheme, 
        
        state : SensenElementState,

        canvas?: HTMLElement
        
    ) : Promise<
        
        SensenRouterRoute
        
    >{

        return this.navigate.apply(this, [
            
            'post', slug, state, canvas instanceof SensenElement ? canvas : undefined

        ])
        
    }

    
    put(
        
        slug : keyof SensenRouterScheme, 
        
        state : SensenElementState,

        canvas?: HTMLElement
        
    ) : Promise<
        
        SensenRouterRoute
        
    >{

        return this.navigate.apply(this, [
            
            'put', slug, state, canvas instanceof SensenElement ? canvas : undefined

        ])
        
    }


    
}




// CommonDirectives.Define({

//     name:'action',

//     type:'-attribute',
    
//     expression:'@',
    
//     main: (component: SensenElement<SensenElementProps, SensenElementState>, record: ExpressionRecord)=>{
    
//         /**
//          * HTMLElement Only
//          */
//         if(record.node instanceof HTMLElement && component instanceof SensenElement){
            
//             const alreadyKey = `directiveState${ record.directive?.expression }` as keyof HTMLElement;

//             const args = Array.isArray(record.arguments) ? record.arguments : [];


//             /**
//              * Evité les abus de définition
//              */
//             if(record.node[ alreadyKey ]){ return ; }
            
//             /**
//              * Definition de l'évènement 
//              */
//             record.node.addEventListener(`${ record.name }`, (ev: Event)=>{
                
//                 record.matches?.map(match=>{

//                     const attrib = (
                        
//                         ('attributes' in record.node) 
                        
//                         ? record.node.getAttribute(match?.input||'')
        
//                         : ''
        
//                     )?.trim();
    

//                     if(args.indexOf('prevent') > -1){ ev.preventDefault() }
        
//                     if(args.indexOf('stop') > -1){ ev.stopPropagation() }
        
//                     // const attrib = value as keyof typeof component.state;
        
        
//                     /**
//                      * Check Component methods
//                      */
//                     const isMethod = attrib?.indexOf(`this.methods.`) == 0;
                    
//                     const _event = CreateComponentMethodEvent<

//                         typeof component.$props,

//                         typeof component.$state
                    
//                     >(component, ev)
        
        
        
//                     if(isMethod && component.$methods){
        
//                         const method = component.$methods[ 
                            
//                             attrib.substring((`this.methods.`).length) 
                        
//                         ];
                        
//                         /** * Check is transaction function */
//                         if(typeof method == 'function'){
                            
//                             method.apply(component.$state, [_event])
                            
//                         }
                        
//                     }
        
//                     else{
        
//                         if(typeof attrib == 'string' && attrib in window){
        

//                             const fn = (window[attrib as keyof Window] || (()=>{})) as Function
        
//                             if(typeof fn == 'function'){
                                
//                                 fn.apply(window, [_event])
        
//                             }
                            
//                         }
                        
//                     }

//                 })
                
//             }, args.indexOf('capture') > -1 ? true : false)
    


//             // @ts-ignore
//             record.node[ alreadyKey ] = true;


//         }
        
    
//     },
    

// })
