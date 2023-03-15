// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#03A9F4',
        'primary-darken-3': '#0277BD',
        'primary-lighten-3':'#81D4FA',
        error: '#FF8A80',
        info: '#82B1FF',
        success: '#B9F6CA',
        warning: '#FFFF8D',
    }
}

export default createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        }
    }
    })
