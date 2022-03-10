

/**
 * Window : GlobalThis
 */

declare interface Window {

    $SensenComponents : SensenComponents

    $SensenRouter : SensenRouter

    $GlobalDirectives: IGlobalDirectives;

}




/**
 * Utilities
 */
declare type TObjectEmbed<T> = { 
    [K in keyof T]?: T[K] | number
}




/**
 * Metric
 */

declare type MetricTAlphaNum = 'a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9';

declare type MetricTAlphaNumL = 'a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9';
 
declare type MetricTAlphaNumU = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9';
 
declare type MetricTAlphaU = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
 
declare type MetricTAlphaL = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
 
declare type MetricTNum = '0 1 2 3 4 5 6 7 8 9';
 
declare type MetricTHex = 'a b c d e f A B C D E F';
 

 




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

    main: (state: SensenElementState, canvas : SensenElement<SensenElementState>) => any;
    
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


declare interface SensenRouter{

    options: SensenRouterOptions;

    routes: SensenRouterRoutes;

    current?: SensenElement<SensenElementState>;

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

declare interface SensenComponents{

    [x : string] : CustomElementConstructor
    
}


declare interface SensenElementMethods<

    // Props extends SensenElementProps, 
    
    State extends SensenElementState
    
> {

    [M : string] : (dependencies: ComponentRenderDependencies<State>) => void;
    
}


declare type SensenElementMountMethods = '$willMount' | '$willUnMount' | '$willAdopted'


declare interface SensenElement<State extends SensenElementState> extends HTMLElement{

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


    $appearance ?: object
    
    
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


declare type SensenElementPropEntry = {

    old: string;

    value: string;

    name: string;
    
}





/**
 * Component
 */

declare interface RawComponentConfig{

    namespace?:{

        prefix? : string;

        attribute ?: string
        
    }
    
}

declare interface ComponentRenderDependencies< State extends SensenElementState >{

    state : State;
    
    element: SensenElement<State>;

    router?: SensenRouter;

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

    appearance?: TAppearanceProps

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






/**
 * Sensen Appearance
 */




 declare interface TAppearanceDeclarations extends Omit<CSSStyleDeclaration, 'width' | 'height' | 'margin' | 'padding' | 'length' | 'parentRule'>{
    
    width?: 'auto' | 'initial' | 'inherit' | 'unset' | number | string;
    height?: 'auto' | 'initial' | 'inherit' | 'unset' | number | string;
    
    
    paddingVertical?: 'auto' | 'initial' | 'inherit' | 'unset' | number | string;
    paddingHorizontal?: 'auto' | 'initial' | 'inherit' | 'unset' | number | string;
    
    marginVertical?: 'auto' | 'initial' | 'inherit' | 'unset' | number | string;
    marginHorizontal?: 'auto' | 'initial' | 'inherit' | 'unset' | number | string;
    
    padding?: 'auto' | 'initial' | 'inherit' | 'unset' | (string | number)[] | number | string;
    margin?: 'auto' | 'initial' | 'inherit' | 'unset' | (string | number)[] | number | string;

    backdropFilter?: 'auto' | 'initial' | 'inherit' | 'unset' | string;

    scrollbarWidth?: 'auto' | 'initial' | 'inherit' | 'unset' | string;

}




declare type TAppearanceEntry = {
    selector: string, 
    value: TObjectEmbed<TAppearanceDeclarations>,
    // rank: number
}




declare type TAppearanceProps = {

    [selector: string] : TObjectEmbed<TAppearanceDeclarations>
    
}



declare type TAppearanceEmitter = {

    construct: (component: SensenAppearance) => void;

    initialized: (component: SensenAppearance) => void;

    mounted: (component: SensenAppearance) => void;

    selectorAdded: (entry: TAppearanceEntry) => void;
    
}



declare interface SensenAppearance{

    $dom: HTMLStyleElement;

    $UiD: string;

    $emitter: ISensenEmitter;
    
    props: TAppearanceProps;
    
    emit: TAppearanceEmitter;


    $refs : { [K:string] : Text }
    

    absorbent(txt: string, domain?: string) : TAppearanceProps;

    $generateUiD() : string;

    $initialize() : this;

    selector(selector: string, value: TObjectEmbed<TAppearanceDeclarations>) : this;

    selectors(appearance: TAppearanceProps) : this;

    $emitting() : this;

    mount() : this;

    bind(element : HTMLElement) : this;

    render(slot: string) : Text;
    
}