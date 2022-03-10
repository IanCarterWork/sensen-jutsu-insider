import { SensenEmitter } from "./emitter";






export class SensenState{


    store : SensenStateProps = {}

    $emitter: SensenEmitter = new SensenEmitter()


    constructor(public state : SensenStateProps){

        this.store = Object.assign({}, {...(this.state||{})} )    

        this.proxies();
        
    }
    


    proxies(){

        if(typeof this.state == 'object'){


            Object.entries( this.state ).map($=>{

                const slot = $[0] as keyof typeof this.state;
                

                if(Array.isArray($[1])){

                    this.setObjectProxy(slot, [...$[1]] as typeof this.state[typeof slot] )
                    
                }

                else if(typeof $[1] == 'object'){

                    this.setObjectProxy(slot, {...$[1]} as typeof this.state[typeof slot] )
                    
                }

                else{

                    this.setDataProxy(slot)
                    
                }
                
            })
            
            
        }


        return this;
        
    }
    
    




    setObjectProxy(
        
        slot: keyof typeof this.state, 
        
        input:  typeof this.state[keyof typeof this.state]
        
    ){

        const $ = this;

        $.state[ slot ] = new Proxy<typeof this.state[keyof typeof this.state]>(input, {

            get: function(target, prop){
                
                return target[prop];
                
            },
            
            set: function(target, prop, value, prox){

                target[prop] = value

                // console.log('setObjectProxy', prop, value)

                $.$emitter.dispatch('objectHydrates', { slot, value });

                $.$emitter.dispatch('hydrates', { slot, value });
                
                return true;
                
            }

        })

        return this;
        
    }






    setDataProxy(slot: keyof typeof this.state){

        const $ = this;

        Object.defineProperty(this.state, slot, {

            get(){ return $.store[ slot ]; },

            set(value){

                $.store[ slot ] = value;

                // console.log('setDataProxy : ', slot, ' = ', value)

                $.$emitter.dispatch('dataHydrates', { slot, value });

                $.$emitter.dispatch('hydrates', { slot, value });
                
                return true;

            },

        })

        return this;
        
    }

    
    
}