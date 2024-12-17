import { StoryFn, Meta } from '@storybook/react';
import ThemeToggleMenu from './ThemeToggleMenu';
import { CustomThemeProvider } from '../../contexts/ThemeContext.tsx';

export default {
  title: 'Components/ThemeToggleMenu',
  component: ThemeToggleMenu,
  decorators: [
    (Story) => (
      <CustomThemeProvider>
        <Story />
      </CustomThemeProvider>
    ),
  ],
} as Meta<typeof ThemeToggleMenu>;

const Template: StoryFn<typeof ThemeToggleMenu> = () => <ThemeToggleMenu />;

export const Default = Template.bind({});
Default.storyName = 'Theme Toggle Menu';
