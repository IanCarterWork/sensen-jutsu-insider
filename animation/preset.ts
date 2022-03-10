import { SensenAnimationEngine } from "./index";







export const FxPresenter : SensenAnimationTransition = {

    async entry(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0], to:[100],
                    
                    duration: 360,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){
                            
                            widget.style.opacity = `${ interpolarity[0] / 100}`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },



    async entryReverse(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0], to:[100],
                    
                    duration: 200,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.opacity = `${ interpolarity[0] / 10}`

                        }
                    

                    },

                    done: ()=>done(widget)
                    
                })

    

                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },



    async exit(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[100], to:[0],
                    
                    duration: 200,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.opacity = `${ interpolarity[0] / 10}`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },



    async exitReverse(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[100], to:[0],
                    
                    duration: 200,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.opacity = `${ interpolarity[0] / 10}`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },

    
}





export const FxSlideHorizontal : SensenAnimationTransition = {

    async entry(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[110], to:[0],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{
                    
                        if(widget){

                            widget.style.transform = `translateX(${ interpolarity[0]}%)`

                        }
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },



    async entryReverse(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[-110], to:[0],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.transform = `translateX(${ interpolarity[0]}%)`

                        }
                    

                    },

                    done: ()=>done(widget)
                    
                })

    

                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exit(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0], to:[110],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.transform = `translateX(${ interpolarity[0]}%)`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exitReverse(widget?: HTMLElement): Promise<HTMLElement | undefined> {

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0], to:[-110],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.transform = `translateX(${ interpolarity[0]}%)`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },

    
}





export const FxSlideVertical : SensenAnimationTransition = {

    async entry(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[110], to:[0],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{
                    
                        if(widget){

                            widget.style.transform = `translateY(${ interpolarity[0]}%)`

                        }
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },



    async entryReverse(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[-110], to:[0],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.transform = `translateY(${ interpolarity[0]}%)`

                        }
                    

                    },

                    done: ()=>done(widget)
                    
                })

    

                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exit(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0], to:[110],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.transform = `translateY(${ interpolarity[0]}%)`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exitReverse(widget?: HTMLElement): Promise<HTMLElement | undefined> {

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0], to:[-110],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            widget.style.transform = `translateY(${ interpolarity[0]}%)`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },

    
}







export const FxScalingIn : SensenAnimationTransition = {

    async entry(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0, 0], to:[100, 100],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{
                    
                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`

                        }
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },



    async entryReverse(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[100, 0], to:[0, 100],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`

                        }
                    

                    },

                    done: ()=>done(widget)
                    
                })

    

                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exit(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[100, 100], to:[0, 0],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exitReverse(widget?: HTMLElement): Promise<HTMLElement | undefined> {

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[0, 100], to:[100, 0],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },

    
}






export const FxScalingOut : SensenAnimationTransition = {

    async entry(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[200, 0], to:[100, 100],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{
                    
                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`

                        }
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },



    async entryReverse(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[100, 0], to:[200, 100],
                    
                    duration: 256,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`


                        }
                    

                    },

                    done: ()=>done(widget)
                    
                })

    

                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exit(widget?: HTMLElement){

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[100, 100], to:[200, 0],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`


                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },


    async exitReverse(widget?: HTMLElement): Promise<HTMLElement | undefined> {

        return new Promise<HTMLElement | undefined>((done, fail) =>{

            try{

                const fx = new SensenAnimationEngine({
                    
                    from:[200, 100], to:[100, 0],
                    
                    duration: 400,
                    
                    hit: (interpolarity: number[])=>{

                        if(widget){

                            const scale = interpolarity[0] / 100
                            const opacity = interpolarity[1] / 100

                            widget.style.transform = `scale(${ scale })`
                            widget.style.opacity = `${ opacity > 1 ? 1 : opacity }`

                        }
                    
                    
                    },
                    
                    done: ()=>done(widget)

                })
    
                fx.Start();
    
            }

            catch(e){ fail(e); }

        })

    },

    
}

