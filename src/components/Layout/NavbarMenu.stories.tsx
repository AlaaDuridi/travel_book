import { StoryFn, Meta } from '@storybook/react';
import NavbarMenu from './NavbarMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import { INavbarLinkProps } from './Layout.types.ts';

// Default export for Storybook
export default {
  title: 'Components/NavbarMenu',
  component: NavbarMenu,
} as Meta<typeof NavbarMenu>;

// Template for the NavbarMenu
const Template: StoryFn<typeof NavbarMenu> = (args) => (
  <Router>
    <NavbarMenu {...args} />
  </Router>
);

// Mock Links
const topLinks: INavbarLinkProps[] = [
  { href: '/home', children: <>Home</> },
  { href: '/about', children: <>About</> },
];
const bottomLinks = [
  { href: '/login', children: <>Login</> },
  { href: '/signup', children: <>Signup</> },
];

// Stories
export const Default = Template.bind({});
Default.args = {
  topLinks,
  bottomLinks,
};

export const OnlyLeftLinks = Template.bind({});
OnlyLeftLinks.args = {
  topLinks,
  bottomLinks: [],
};

export const OnlyRightLinks = Template.bind({});
OnlyRightLinks.args = {
  topLinks: [],
  bottomLinks,
};
