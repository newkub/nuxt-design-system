// .storybook/preview.ts
import type { Preview } from '@storybook/vue3';
import 'uno.css';
import '../assets/main.css'; // Import your global styles

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;