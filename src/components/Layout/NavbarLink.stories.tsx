import { StoryFn, Meta } from '@storybook/react';
import NavbarLink from './NavbarLink';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';

export default {
  title: 'Components/NavbarLink',
  component: NavbarLink,
  argTypes: {
    href: { control: 'text' },
    scrollTo: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof NavbarLink>;

const Template: StoryFn<typeof NavbarLink> = (args) => (
  <Router>
    <Box sx={{ p: 4, backgroundColor: '#f0f4f8' }}>
      {' '}
      {/* Wrapper for styling */}
      <NavbarLink {...args} />
    </Box>
  </Router>
);

// Stories
export const Default = Template.bind({});
Default.args = {
  href: '/home',
  children: <>Home</>,
};

export const WithCustomStyle = Template.bind({});
WithCustomStyle.args = {
  href: '/custom',
  children: <>Custom Link</>,
  sx: { color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' },
};

export const ScrollToSection = Template.bind({});
ScrollToSection.args = {
  scrollTo: 'about-section',
  children: <>About</>,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  href: '/profile',
  children: (
    <>
      Profile <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>🔥</span>
    </>
  ),
};
