import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Telegraf';
        src: url('/assets/fonts/TelegrafRegular.otf') format('opentype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Telegraf';
        src: url('/assets/fonts/TelegrafUltraLight200.otf') format('opentype');
        font-weight: 200;
        font-style: normal;
    }

    @font-face {
        font-family: 'Telegraf';
        src: url('/assets/fonts/TelegrafUltraBold800.otf') format('opentype');
        font-weight: 800;
        font-style: normal;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Telegraf', sans-serif;
        background-color: #fff;
    }
`;
