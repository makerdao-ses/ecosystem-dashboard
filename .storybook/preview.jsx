import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12
import { ThemeProvider } from '../src/core/context/ThemeContext';
import { WithNextRouter } from 'storybook-addon-next-router/dist/decorators';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        }
    },
    nextRouter: {
        Provider: RouterContext.Provider,
    },
}

const WithThemeProvider = (Story) => {
    return (
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    )
}

export const decorators = [WithThemeProvider, WithNextRouter]