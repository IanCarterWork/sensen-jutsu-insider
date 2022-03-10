

/**
 * Window : GlobalThis
 */

declare interface Window {

    $SensenComponents : ISensenComponents

    $SensenRouter : ISensenRouter

    $GlobalDirectives: IGlobalDirectives;

}






/**
 * Sensen State
 */

declare type SensenElementState = {

    [K : string] : any
    
}




/**
 * Sensen Props
 */


// declare type SensenElementProps = {

//     [K : string] : number | string | boolean | null;
    
// }

// declare type SensenComponentProps = SensenElementProps & {children ?: HTMLCollection;} & {

    
// }
    

declare interface KuchiyoceParameter{

    state? : SensenElementState;

    main: (state: SensenElementState, canvas : ISensenElement<SensenElementState>) => any;
    
}






/**
 * Sensen Router
 */

declare interface SensenRouterScheme{

    home: {},

    about: {},

}

declare interface SensenRouterOptions{

    default: string;

    canvas: HTMLElement;
    
}

declare type SensenRouterMethod = 'get' | 'post' | 'put';

declare interface SensenRouterRoute{

    uri: keyof SensenRouterScheme;

    method: SensenRouterMethod;

    component: object;

    canvas?: HTMLElement
    
}

declare interface SensenRouterURI{

    name : keyof SensenRouterScheme;

    search : string;

}

declare type SensenRouterRoutes = {

    [X in keyof SensenRouterScheme] : SensenRouterRoute

}


declare interface SensenRouterSwitchRequest {

    route: SensenRouterRoute;

    current: object;

    canvas: HTMLElement;

    uri: keyof SensenRouterScheme
    
}


declare interface ISensenRouter{

    options: SensenRouterOptions;

    routes: SensenRouterRoutes;

    current?: ISensenElement<SensenElementState>;

    canvas?: HTMLElement;


    add(route : SensenRouterRoute) : this;

    initialize() : this;

    clean() : this;

    isDeployed(instance : object) : boolean

    stabilizeUI() : this;

    switch(
        
        canvas : HTMLElement, 
        
        entry: HTMLElement, 
        
        exit?: HTMLElement, 
        
        state? : SensenElementState
        
    ) : Promise<HTMLElement>

    getCurrentURI() : string | undefined;
    
    run(state?: SensenElementState) : this;

    concateURI(slug : keyof SensenRouterScheme) : SensenRouterURI;

    navigate(
        
        method: SensenRouterMethod,
        
        slug : keyof SensenRouterScheme, 
        
        state : SensenElementState,

        canvas? : HTMLElement
        
    ) : Promise<
    
        SensenRouterRoute
        
    >;


    /**
     * Add news Activity component screen in app 
     * The PROPS is show in URL as URL parameters 
     */
    get(
        
        slug : keyof SensenRouterScheme, 
        
        state : SensenElementState
        
    ) : Promise<
    
        SensenRouterRoute
        
    >;


    /**
     * Add news Activity component screen in app
     * The PROPS is not show
     */
    post(
        
        slug : keyof SensenRouterScheme, 
        
        state : SensenElementState
        
    ) : Promise<
    
        SensenRouterRoute
        
    >;


    /**
     * Replace current Activity component by new invoked
     * The replacement accept the previous "get" or "post" method behaviors
     */
    put(
        
        slug : keyof SensenRouterScheme, 
        
        state : SensenElementState
        
    ) : Promise<
    
        SensenRouterRoute
        
    >;

}





/**
 * Sensen Elements
 */

declare interface ISensenComponents{

    [x : string] : CustomElementConstructor
    
}


declare interface SensenElementMethods<

    // Props extends SensenElementProps, 
    
    State extends SensenElementState
    
> {

    [M : string] : (dependencies: ComponentRenderDependencies<State>) => void;
    
}


declare type SensenElementMountMethods = '$willMount' | '$willUnMount' | '$willAdopted'


declare interface ISensenElement<State extends SensenElementState> extends HTMLElement{

    $isReady?:boolean;

    $state : State;

    $tnamespace ?: string;

    $anamespace ?: string;


    $templateURL ?: string;

    $templateSheet ?: string;


    $observations ?: MutationObserver;

    $emitter ?: ISensenEmitter;

    $methods ?: SensenElementMethods<State>


    $application ?: object;

    $parentComponent ?: object;
    
    $controller ?: ComponentAttributes<State>;

    $stateHydrates ?: object
        
    $stateMirrors ?: SensenStateMirrors
    

    mountResponseResolved ?: any

    mountResponseRejected ?: any
    

    $inTransition?:boolean

    
    
    $initialize?(state ?: State) : this;

    $render(state ?: State) : void;
    
    $setSafeProps?(value : any) : string;

    $upgradeState?(state ?: State) : Promise<State>;

    $observers?() : this;

    $listeners?() : this;

    $compilate?() : this;


    $build?(moment?: boolean, host?: HTMLElement) : Promise<this>;
    
    $destroy?(moment?: boolean) : Promise<this>;

    connectedProtocol?() : this;


    connectedCallBack?() : void;

    disconnectedCallBack?() : void;

    adoptedCallback?() : void;



    $construct?() : this

    $hydrators?() : this

    $willMount?(args : any) : void | Promise<any>

    $willUnMount?(args : any) : void | Promise<any>

    $willAdopted?(args : any) : void | Promise<any>



    $compilateRecord?(record : ExpressionRecord) : this

    $mountManipulation(method: SensenElementMountMethods, callback: Function) : this


}


declare type ISensenElementPropEntry = {

    old: string;

    value: string;

    name: string;
    
}





/**
 * Component
 */

declare interface IComponent<Props> {

}


declare interface RawComponentConfig{

    namespace?:{

        prefix? : string;

        attribute ?: string
        
    }
    
}


// declare type ComponentMethodEvent{

//     component : object;

//     event : Event
    
// }

declare interface ComponentRenderDependencies<
    
    State extends SensenElementState, 
    
    // Props extends SensenElementProps

>{

    // props : Props;

    state : State;
    
    element: ISensenElement<State>;

    router?: ISensenRouter;

    children: HTMLCollection;

    event?: Event

}


declare type ComponentAttributes<
    
    State extends SensenElementState, 

> = {

    name: string;

    state?: State;

    methods?: SensenElementMethods<State>;

    transition?: {
        
        onbuild?: SensenAnimationTransition,
        
        ondestroy?: SensenAnimationTransition,
        
    }

    construct?: (dependencies: ComponentRenderDependencies<State>) => void | Promise<any>;

    mount?: (dependencies: ComponentRenderDependencies<State>) => void | Promise<any>;

    unmount?: (dependencies: ComponentRenderDependencies<State>) => void | Promise<any>;

    adopted?: (dependencies: ComponentRenderDependencies<State>) => void | Promise<any>;

    render: (dependencies: ComponentRenderDependencies<State>) => object | Function | string | null | undefined;
    
}





/**
 * Sensen Emitter
 */

declare type SensenEmitterType = string

declare type SensenEmitterArguments<T> = {
     
     emit: T;
     
     type : string;
     
 }
 
declare type SensenEmitterCallback<T> = ((arg: SensenEmitterArguments<T>) => Promise< T | SensenEmitterArguments<T> > | boolean | void)
 
declare type SensenEmitterError = {
     code: number;
     message: string;
 }
 
declare type SensenEmitterErrorCallback = ((arg: SensenEmitterError) => void)
 
declare type SensenEmitterEntries = {
 
     [K: SensenEmitterType] : SensenEmitterCallback<any>[] 
 
 }
 
declare type EmitterDispatcherProps<T> = {
         
     instance : ISensenEmitter, 
     
     type : SensenEmitterType, 
     
     args: any,
     
     callback: SensenEmitterCallback<T>,
     
     resolve? : SensenEmitterCallback<T>,
     
     reject? : (err : SensenEmitterErrorCallback ) => void,
 
 }


declare interface ISensenEmitter{

    entries: SensenEmitterEntries

    listener: SensenEmitterType[]

    dispatcher: SensenEmitterType[]

    returned?: any


    listen: <T>(type : SensenEmitterType, callback : SensenEmitterCallback<T>) => this;

    dispatch : <T>(

        type : SensenEmitterType,
        
        args : {}, 
        
        resolve? : SensenEmitterCallback<T>,
        
        reject? : (err : SensenEmitterErrorCallback ) => void

    ) => this;

    resolveDispatcher?: <T>(args :  EmitterDispatcherProps<T>) => (boolean | Promise<void> | ISensenEmitter);
    
}





/**
 * Sensen Compilation
 */
    
declare type ExpressionRecord = {
    
    node: Node | HTMLElement;
    
    type: 'echo' | 'snapcode' | 'attribute' | 'directive';
    
    name?: string;
    
    
    mockup?: Node | HTMLElement;
    
    // match?: RegExpMatchArray | null;
    
    arguments?: string[] | null;
    
    matches?: RegExpMatchArray[]

    attribute?: Attr
    
    directive?: TDirective;

}
    

declare type ParseSnapCodeBlock = {
    
    node: Node | HTMLElement,

    matches: RegExpMatchArray[]

}






/**
 * Sensen State
 */

declare interface SensenStateProps{

    [X : string] : any;

}


declare interface SensenStateHydrates{

    slot: string;

    value: any;
    
}

declare type SensenStateMirror = ExpressionRecord[]

declare interface SensenStateMirrors{

    [ K: string ] : SensenStateMirror
    
}







/**
 * Sensen Directives
 */

declare type DirectiveType = '-attribute' | '-attribute.argument' | '-function' | '-dom';

declare type DirectiveCallBackInput = {

    component: any, 
    
    record: ExpressionRecord, 
    
    event ?: Event,

    args ?: string[],
    
}

declare type DirectiveCallback = (input : DirectiveCallBackInput) => void;

declare interface IDirectives {

    name: string;

    type: DirectiveType,
    
    expression: string | null;

    main: DirectiveCallback;
    
}


declare type IDirectivesAvailable = {

    [K: string]: IDirectives

}



declare interface IGlobalDirectives{

    Availables: TDirectives

    Define(statement : TDirective) : this;

    Merge(...directives: TDirective[]) : this;

    Retrive: (key: string) => TDirective;

    Retrives(directive?: TDirective): TDirectives;

    parseArguments(input : DirectiveCallBackInput) : this
    
}




declare type TDirective = IDirectives & {
    
    name: string;

    type: DirectiveType,
    
    expression: string | null;

    main : DirectiveCallback;

}


declare type TDirectives = {
    [K: string]: TDirective
}


declare interface HTMLElement{

    directiveStateNone: boolean;

}


declare interface  Node{

    directiveStateNone: boolean;

}









/**
 * Sensen Animations
 */

declare interface ISensenAnimationEngine{

    options: SensenAnimationOptions;

    defaultFrame: number;

    timer?:  NodeJS.Timeout;


    Start() : this;


}


declare type SensenAnimationOptions = {

    from: number[],
   
    to: number[],
   
    duration: number,
   
    frame?: number,
   
    hit: (interpolarity: number[], engine: ISensenAnimationEngine, percent: number) => void
   
    done?: (engine: ISensenAnimationEngine) => void
    
}




declare interface SensenAnimationTransition{

    entry: (W?: HTMLElement) => Promise<HTMLElement | undefined>;

    entryReverse: (W?: HTMLElement) => Promise<HTMLElement | undefined>;

    exit: (W?: HTMLElement) => Promise<HTMLElement | undefined>;

    exitReverse: (W?: HTMLElement) => Promise<HTMLElement | undefined>;
    
}