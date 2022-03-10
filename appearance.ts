import { SensenEmitter } from "./emitter";
import { SensenMetricRandom } from "./metric-random";
import { ArrayRange } from "./utilities";
import SensenURLScheme from "./pathScheme";










export class SensenAppearance implements SensenAppearance{


    $dom: HTMLStyleElement = {} as HTMLStyleElement

    $UiD: string = '';

    $emitter: SensenEmitter = {} as SensenEmitter
    
    props: TAppearanceProps = {} as TAppearanceProps
    
    emit: TAppearanceEmitter = {} as TAppearanceEmitter


    $refs : { [K:string] : Text } = {}
    
    
    
    constructor(props?: TAppearanceProps){


        this.$dom = document.createElement('style');

        this.$UiD = this.$generateUiD()

        this.$emitter = new SensenEmitter();

        this.props = props || {} as TAppearanceProps



        /** * Emit Event */
        this.$emitter?.dispatch('construct', this);

        this.$emitting()
        
    }





    static absorbent(txt: string, domain?: string){

        txt = txt.toString()
    
        const output : TAppearanceProps  = {} as TAppearanceProps;
    
        const rexSelector = /(.*)([^{])\s*\{\s*([^}]*?)\s*}/g
    
        const matchSelectors = [ ...txt.matchAll(rexSelector) ]
    
    
        if(matchSelectors.length){
    
            matchSelectors.map(match=>{
    
                const selector = match[1];
    
                const content = ArrayRange(match, 2).join('').trim();
    
                const rex = /(.*):(.*)[;]/g
    
                const matches = [...content.matchAll(rex)]
    
                const lines : TObjectEmbed<TAppearanceDeclarations> = {}
                

    
                if(matches.length){
    
                    matches.map(prop=>{
    
                        const key : keyof TObjectEmbed<TAppearanceDeclarations> = (prop[1]||'').trim() as keyof TObjectEmbed<TAppearanceDeclarations>

                        Object.entries(SensenURLScheme(domain||'')).map(scheme=>{

                            prop[2] = (prop[2]||"").replace(
                                
                                new RegExp(`${scheme[0]}`, 'g'), 
                                
                                scheme[1]
                                
                            );
                            
                        })
    
                        // @ts-ignore
                        lines[ key ] = prop[2] as typeof lines[ keyof typeof lines]
                        
                    })

                }
                
                output[ selector ] = lines
    
            })
            
        }
        
        
        return output;
    
    }
    
    


    $generateUiD(){

        return `${ SensenMetricRandom.CreateAplpha(12).join('') }${ SensenMetricRandom.Create(20).join('') }`;

    }


    

    $initialize(){

        this.$dom.setAttribute('rel', 'StyleSheet')

        this.$dom.setAttribute('type', 'text/css')

        this.$dom.setAttribute('sensen-appearance', `${ this.$UiD }`)

        document.head.appendChild(this.$dom)


        /** * Emit Event */
        this.$emitter?.dispatch('initialized', this);


        return this;
        
    }
    



    selector(selector: string, value: TObjectEmbed<TAppearanceDeclarations>){

        this.props[ selector ] = {...value};

        /** * Emit Event */
        this.$emitter?.dispatch('selectorAdded', { selector, value } as TAppearanceEntry);

        return this;
        
    }



    selectors(appearance: TAppearanceProps){

        const entries = Object.entries(appearance||{})

        if(entries.length){

            entries.map($=>this.selector($[0], $[1]))
            
        }
        
        return this;
        
    }



    $emitting(){



        /**
         * Custom Emitter Listener : Begin
         */

         if(this.emit){

            Object.entries(this.emit).map(e=>{

                if(typeof e[1] == 'function'){

                    const self = this;

                    this.$emitter?.listen(e[0], function(){ 
                        
                        // @ts-ignore
                        e[1].apply(this, [arguments[0]]) 
                    
                    })
                    
                }
                
            })
            
        }

        /**
         * Custom Emitter Listener : End
         */



        return this;
        
    }




    render(slot: string){

        const e = document.createTextNode(slot);

        e.textContent = slot

        this.$dom.appendChild(e)
        
        return e;
        
    }
    



    mount(){

        this.$initialize();

        /**
         * Building
         */

        if(this.props){

            const slot = OIAppearance(this.props)

            slot.selectors.forEach((selector, k)=>{

                this.$refs[selector] = this.render(`.${this.$UiD}${
                
                    (selector).trim().toLocaleLowerCase() == '$self'
                
                    ? `` : ` ${ selector }`
                
                }{${ slot.rows[k] }}`)
                
            })

        }
        
        /** * Emit Event */
        this.$emitter?.dispatch('mounted', this);

        return this;
        
    }




    bind(element : HTMLElement) : this{

        element.classList.add(`${ this.$UiD }`)
        
        // element.setAttribute(`sensen-appareance`, `${ this.$UiD }`)
        
        return this;
        
    }
    
    
    
}







export function OIAppearanceProp(prop : string) : string[]{

    const mv = prop.indexOf('-vertical')

    const mh = prop.indexOf('-horizontal')

    if(mv > -1){ const p = prop.substr(0, mv); return [`${p}-top`, `${p}-bottom`]; }

    else if(mh > -1){ const p = prop.substr(0, mh); return [`${p}-left`, `${p}-right`]; }

    return [prop];
    
}




export function OIAppearanceValue(value : any) : string{

    switch(typeof value){

        case 'number': 
            return (`${value}px`)

        case 'object':

            if(Array.isArray(value)){ return value.map(i=>`${i}px`).join(' '); }

            else{ return Object.keys(value).map(k=>`${k}{ ${value[k]} }`).join(' ') }

        case 'string':
            return value
        
    }
    

    return ''
    
}



export function OIAppearance(entries : TAppearanceProps){

    const rows: string[] = [];

    const selectors: string[] = [];

    const majRex = new RegExp("([A-Z])", "g")

    Object.entries( entries ).forEach(entry =>{

        Object.values( entry[0].trim().split(',') ).forEach(selector=>{

            selectors[ selectors.length ] = selector

            const rw: string[] = []

            // entry[1].reverse().map(value=>{
                
                Object.entries(entry[1]).map($=>{

                    Object.values($[0].trim().split(',')).map(prop=>{

                        OIAppearanceProp((`${ prop }`).replace(majRex, '-$&').toLowerCase()).forEach(p=>{

                            rw[ rw.length ] = `${ p }:${ OIAppearanceValue($[1]||'') }`

                        })

                    })

                })

            // })

            rows[ rows.length ] = rw.join(';')

        })

    })
    
    return {selectors, rows}
    
}














