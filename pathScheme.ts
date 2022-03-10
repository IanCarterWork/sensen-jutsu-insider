

function SensenURLScheme(base: string = '/'){

    return {

        '@Components' : `${ base || '/' }sensen/components`,
        
        '@Activities' : `${ base || '/' }sensen/activities`,
        
        '@Palette' : `${ base || '/' }sensen/palette`,
        
        '@Tone' : `${ base || '/' }sensen/tone`,
        
        '@Themes' : `${ base || '/' }sensen/themes`,
        
        '@Plugins' : `${ base || '/' }sensen/plugins`,

            '@PluginsJS' : `${ base || '/' }sensen/plugins/js`,

            '@PluginsCSS' : `${ base || '/' }sensen/plugins/css`,

        '@Assets' : `${ base || '/' }assets`,

            '@AssetsCSS' : `${ base || '/' }assets/css`,
    
            '@AssetsJS' : `${ base || '/' }assets/js`,
    
            '@AssetsFonts' : `${ base || '/' }assets/fonts`,
    
            '@AssetsImages' : `${ base || '/' }assets/images`,

        '@App' : `${ base || '/' }`,
        
    }
    
} 


export default SensenURLScheme