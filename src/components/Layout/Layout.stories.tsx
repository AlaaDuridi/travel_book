import { Meta, StoryFn } from '@storybook/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { CustomThemeProvider } from '../../contexts/ThemeContext.tsx';

export default {
  title: 'Components/Layout',
  component: Layout,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <CustomThemeProvider>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </CustomThemeProvider>
      </Provider>
    ),
  ],
} as Meta<typeof Layout>;

const Template: StoryFn<typeof Layout> = () => <Layout />;

export const Default = Template.bind({});
Default.storyName = 'Default Layout';
