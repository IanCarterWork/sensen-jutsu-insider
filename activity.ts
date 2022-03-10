import { RawComponent, SensenElement } from "./index";



export function Activity<State extends SensenElementState >($ : ComponentAttributes<State>){

    const config : RawComponentConfig = {

        namespace: {
            
            prefix: 'activity',

            attribute: 'state'
            
        }
        
    }

    const index = `activity-${ $.name }`

    window.$SensenComponents[ index ] = RawComponent<State>($, config)

    SensenElement.$use('activity', $.name, window.$SensenComponents[ index ]);
    
    return window.$SensenComponents[ index ];
    
}
