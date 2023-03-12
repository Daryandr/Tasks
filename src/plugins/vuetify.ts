// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#E0F7FA',
        surface: '#FFFFFF',
        primary: '#00BCD4',
        'primary-darken-1': '#00ACC1',
        'primary-lighten-1': '#26C6DA',
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
