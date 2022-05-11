import {ThemeProvider} from '@mui/material/styles';
import {ThemeProvider as Emotion10ThemeProvider} from 'emotion-theming';
import mainTheme from "../src/core/styling/main-theme";


const withThemeProvider = (Story, context) => {
    return (
        <Emotion10ThemeProvider theme={mainTheme}>
            <ThemeProvider theme={mainTheme}>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700&display=swap"
                    rel="stylesheet"/>
                <Story {...context} />
            </ThemeProvider>
        </Emotion10ThemeProvider>
    );
};

export const decorators = [withThemeProvider];