import { CommonDirectives } from "./directive";
import { SensenElement } from "./index";
import { SyntaxDelimiter, SyntaxEcho, SyntaxSnapCode } from "./render";
import { ArrayRange } from "./utilities";






/**
 * Test node compilation
 */

 export function isCompilableContent(content : any){
    
    content = `${ content }`
    
    /**
     * Check SnapCode Expression
     */
    if(content?.match(SyntaxSnapCode)){

        return true;
        
    }

    /**
     * Check Echo Expression
     */
    else if(content?.match(SyntaxEcho)){

        return true;
        
    }

    return false;

}



/**
 * Test node compilation
 */

 export function isCompilable(node : Node | Element){

    const content = node.textContent;

    
    /**
     * Check SnapCode Expression
     */
    if(content?.match(SyntaxSnapCode)){

        return true;
        
    }

    /**
     * Check Echo Expression
     */
    else if(content?.match(SyntaxEcho)){

        return true;
        
    }

    /**
     * Check Directive Expression
     */
//     else{

//         const availables = CommonDirectives.Availables as TDirectives

//         let found = false;


//         if(availables){


//             // if(!(node instanceof HTMLElement)){

//             //     Object.values(availables).map(directive=>{

//             //         if(!found && directive.expression && content?.match(directive.expression)){
    
//             //             found = true;
                        
//             //         }
                    
//             //     })
                
//             // }
// /* 
//             else{

//                 const children = node.querySelectorAll('*');

//                 if(children.length){

//                     children.forEach(child=>{

//                         if(found){ return;}

//                         Object.values(child.attributes).map(attribute=>{

//                             if(found){ return;}
         
//                             Object.values(availables)

//                             .filter(directive=>directive.type == '-attribute')
                            
//                             .map(directive=>{
            
//                                 if(

//                                     !found && 
                                    
//                                     directive.expression && 
                                    
//                                     attribute.name.match(directive.expression)
                                    
//                                 ){
                
//                                     found = true;
                                    
//                                 }
                                
//                             })
                            
//                         })
                        
//                     })
                    
//                 }
                
                
//             }
//              */

//         }
        

//         return found;
        
//     }
    
    

    return false;
    
}





export function StabilizeEchoExpression(content: string | null, stop?: boolean){

    const echos = [...(content||'').matchAll(SyntaxEcho)]
     
    if(echos.length){
        
        echos.map(m=>{
            
            content = (content||'').replace(
          
                new RegExp( (m[0]).replace(/[^\w\s]/gi, '\\$&') , 'g' ), 
          
                `<${ SyntaxDelimiter }=${ m[1] } ${ SyntaxDelimiter }>` 

            )
                
        })
            
    }

    else{ if(stop){ return null; } }

    return content;

}

export function StabilizeSnapCodeExpression(content: string | null, stop?: boolean){

    const echos = [...(content||'').matchAll( SyntaxSnapCode )]
     
    if(echos.length){
        
        echos.map(m=>{
            
            content = (content||'').replace(
                
                new RegExp( (m[0]).replace(/[^\w\s]/gi, '\\$&') , 'g' ), 
                
                `<${ SyntaxDelimiter }${ m[1] } ${ SyntaxDelimiter }>` 

            )
                
        })
            
    }

    else{ if(stop){ return null; } }

    return content;

}







export function FindAttributesExpression(

    element: HTMLElement,

    callback: (record : ExpressionRecord) => void,
    
){

    let found : ChildNode[] = [];


    if(element.attributes.length){

        Object.values(element.attributes).map(att=>{

            /**
             * Find Directive
             */
            
                Object.values(CommonDirectives.Availables||{})

                .filter(directive=>directive.type == '-attribute')
        
                .map(directive=>{ 

                    const matches = [...att.name.matchAll(new RegExp(`^${ directive.expression }`, 'gi'))]

                    if(matches.length){

                        const split = att.name?.substring((directive.expression||'')?.length).split('.')

                        callback({
                            node: element,
                            name: split[0],
                            directive,
                            matches,
                            attribute: att,
                            type: 'directive',
                            mockup: att.cloneNode(true),
                            arguments: ArrayRange<string>(split, 1)
                        })
                        
                    }
                    
                })
 
            if(
                att.value?.match(SyntaxSnapCode) ||

                att.value?.match(SyntaxEcho) 

            ){

                callback({
                    type: 'attribute',
                    node: element,
                    attribute: att,
                    mockup: att.cloneNode(true),
                    matches: [
                        ...att.value?.matchAll(SyntaxSnapCode),
                        ...att.value?.matchAll(SyntaxEcho),
                    ]
                })
                
                found[ found.length ] = element;

            }
            
        })

    }

    return found;
    
}





export function FindGlobalExpressions(

    element: HTMLElement,

    callback: (record : ExpressionRecord) => void,
    
){

    const children = element.childNodes;

    let found : ChildNode[] = [...FindAttributesExpression(element, callback)]

    

    if(children.length){

        for (let x = 0; x < children.length; x++) {

            const child = children[x];
            

            if(child instanceof SensenElement){

                // console.log('Find Application', child, child.$application )
                
            }

            else{

                /**
                 * Recherche une balise
                 */


                if(child instanceof Text){

                    if(child.textContent?.match(SyntaxSnapCode)){

                        callback({
                            type:'snapcode',
                            node: child,
                            mockup: child.cloneNode(true),
                            matches: [...child.textContent?.matchAll(SyntaxSnapCode)]
                        })
                        
                        found[ found.length ] = child;

                        continue;
                        
                        
                    }
                    
                    else if(child.textContent?.match(SyntaxEcho)){

                        callback({
                            type:'echo',
                            node: child,
                            mockup: child.cloneNode(true),
                            matches: [...child.textContent?.matchAll(SyntaxEcho)]
                        })

                        found[ found.length ] = child;

                        continue;
                        
                    }

                    
                }
                
                else if(child instanceof HTMLElement){

                    if(child.innerHTML?.match(SyntaxSnapCode)){

                        callback({
                            type:'snapcode',
                            node: child,
                            mockup: child.cloneNode(true),
                            matches: [...child.innerHTML?.matchAll(SyntaxSnapCode)]
                        })
                        
                        found[ found.length ] = child;
                        
                        continue;

                    }

                    else{

                        found = [...found, ...FindGlobalExpressions(child, callback)]
                        
                    }
                    
                }
                

            }

        }

        
    }
    

    return found
    
    
}








export function FindStateData<

    State extends SensenElementState,
    
>(

    component: SensenElement<State>,

    record: ExpressionRecord
    
){


    if( component.$controller ){


        let inner: string | null = ''
    
    
        if(record.type == 'echo' || record.type == 'snapcode'){
    
            inner = (record.mockup instanceof Text)
    
                ? record.mockup.textContent
    
                : (
    
                    record.node instanceof HTMLElement 
    
                    ? record.node.innerHTML
    
                    : ''
                    
                )
            
        }
    
    
        // console.log("To detect", component.$controller?.state)
    
        const matches = [
            
            // ...(inner||'').matchAll(
                
            //     new RegExp(`(${ 
                    
            //         Object.keys( component.$controller?.state || {} ).join('|') 
                
            //     })`, 'g')
                
            // ),
    
            ...(inner||'').matchAll(
                
                new RegExp(`this\\.\\$state\\.(.[a-zA-Z0-9_$-]+)`, 'g')
                

                // new RegExp(`this\\.\\$state\\.(${ 
                    
                //     Object.keys( component.$controller?.state || {} ).join('|') 
                
                // })`, 'gm')
    
                
            ),
    
        ];
    
    
        if(matches.length){
    
            matches.map(match=>{
                
                const slot = (`${ match[1] }`).trim()
    
                if(component.$stateMirrors && slot){
    
                    component.$stateMirrors[ slot ] = component.$stateMirrors[ slot ] || []
    
                    component.$stateMirrors[ slot ].push( record )
    
                }
    
    
            });
    
    
            
            // console.warn('Find State ', component.$stateMirrors )
    
        }
    
    
        
        
    }

    

    
}


