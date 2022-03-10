import { SensenElement } from "./index";
import { render } from "ejs";
import { StabilizeEchoExpression, StabilizeSnapCodeExpression } from "./expression";



export const SyntaxEcho = new RegExp('{{(.*?)}}', 'g')

export const SyntaxSnapCode = new RegExp('{%(.*?)%}', 'g')

export const SyntaxDelimiter = `%sn`

export const SyntaxEchoReverse = new RegExp(`\<${ SyntaxDelimiter }=(.*?)${ SyntaxDelimiter }\>`, 'g')






export async function SensenRawRender(data : any, props : object, context : object){

    data = `${ data }`

    return render(`${

        StabilizeSnapCodeExpression(

            StabilizeEchoExpression(

                `${  data }`

            )

        )
         
     }`, props ,{
 
        delimiter: `${ SyntaxDelimiter }`,

        context,

        async: true
         
     })
    
}




export function SensenDataRender<State extends SensenElementState>(
    
    data: string, 
    
    component: SensenElement<State>,

    context: ComponentAttributes<State>,

    record: ExpressionRecord
    
){

    let content = StabilizeSnapCodeExpression(

        StabilizeEchoExpression(
    
            data
            
        )
    
    );

    record.matches?.map(match=>{ 
        
        content = content?.replace(new RegExp(`${ match[0] }`, 'g'), `<${ SyntaxDelimiter }${ match[1] }${ SyntaxDelimiter }>`) || ''

    })


    // console.log('Render WIth', component.$props, context.props)

    return render(`${

        content
        
    }`, component.$state ,{

        delimiter: `${ SyntaxDelimiter }`,

        context: component,

        async: true
        
    })

    
}






export function SensenNodeRender<State extends SensenElementState>(
    
    node: Node | HTMLElement, 
    
    component: SensenElement<State>,

    context: ComponentAttributes<State>,

    record: ExpressionRecord
    
){

    let content = StabilizeSnapCodeExpression(

        StabilizeEchoExpression(
    
            (node instanceof HTMLElement) ? node.innerHTML : node.textContent
            
        )
    
    );

    record.matches?.map(match=>{ 
        
        content = content?.replace(new RegExp(`${ match[0] }`, 'g'), `<${ SyntaxDelimiter }${ match[1] }${ SyntaxDelimiter }>`) || ''

    })


    // console.log("To compilate", content, `//${ component.$props.world }`, `//${ context.props?.world }`)


    return render(`${

        content
        
    }`, {...component.$state} ,{

        delimiter: `${ SyntaxDelimiter }`,

        context: {...component, ...context},

        async: true
        
    })

    
}






export function SensenRender<State extends SensenElementState>(
    
    data: string, 
    
    component: SensenElement<State>,

    context: object,
    
){


    let content = 

    StabilizeSnapCodeExpression(

        StabilizeEchoExpression(
    
            data
            
        )
    
    )

    return render(`${

        content
        
    }`, {...component.$state, ...context} ,{

        delimiter: `${ SyntaxDelimiter }`,

        context: {...component, ...context},

        async: true
        
    })

    
}