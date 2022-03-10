
/**
 * Sensen Event Emitter Response
 */
export function EmitterResponse<T>(type: string, emit: any) : SensenEmitterArguments<T>{

    return { type, emit }
    
}



/**
 * Sensen Event Emitter
 */
 export class SensenEmitter implements ISensenEmitter{


    entries: SensenEmitterEntries

    listener: SensenEmitterType[]

    dispatcher: SensenEmitterType[]

    returned?: any
     


    constructor(){

        this.entries = {};

        this.listener = [];

        this.dispatcher = [];
            
    }





    /**
     * Listener
     */
    listen<T>(type : SensenEmitterType, callback : SensenEmitterCallback<T>){

        if(this.listener.indexOf(type) == -1){

            this.listener[this.listener.length] = type;

        }
        
        if(typeof type == 'string' && typeof callback == 'function'){

            this.entries[type] = this.entries[type]||[];

            this.entries[type].push(callback);

        }

        return this;
        
    }





    /**
     * Dispatcher
     */
    dispatch<T>(
        
        type : SensenEmitterType,
        
        args : {}, 
        
        resolve? : SensenEmitterCallback<T>,
        
        reject? : (err : SensenEmitterErrorCallback ) => void

    ){
        

        if(this.dispatcher.indexOf(type) == -1){

            this.dispatcher[this.dispatcher.length] = type;
            
        }
        
        
        if(typeof type == 'string'){
            
            if(type in this.entries){

                if(this.entries[type] instanceof Array){

                    this.entries[type].map((entry)=>{

                        if(entry instanceof Function){

                            this.returned = SensenEmitter.resolveDispatcher<T>({
                                
                                instance : this, 
                                
                                type, 
                                
                                callback: entry, 
                                
                                args, 
                                
                                resolve, 
                                
                                reject,

                            })

                        }

                    });
                    
                }
                
            }
            
        }
        
        return this;

    }





    static resolveDispatcher<T>({
        
        instance, 
        
        type, 
        
        args,
        
        callback,
        
        resolve,
        
        reject,

    } : EmitterDispatcherProps<T>){

        const $args : SensenEmitterArguments<T> = {

            emit: args,
            
            type,

        }

        const applied = callback.apply(instance, [$args]);

    
        /**
         * Promise
         */
        if(applied instanceof Promise){

            return applied.then(response=>{

                if(typeof resolve == 'function'){ 
                    
                    resolve( EmitterResponse<T>(type, response) ) 

                }

            }).catch(err=>{

                if(typeof reject == 'function'){ reject(err) }

            });

            
        }

        else if(typeof applied == 'boolean'){

            return applied;
            
        }

        else{

            return this;
            
        }
                         
    }
    
    
    

    
}
