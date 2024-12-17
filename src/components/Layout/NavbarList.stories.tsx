import { StoryFn, Meta } from '@storybook/react';
import NavbarList from './NavbarList'; // Adjust path if necessary
import { BrowserRouter as Router } from 'react-router-dom';
import { INavbarListProps } from './Layout.types';

export default {
  title: 'Components/NavbarList',
  component: NavbarList,
  argTypes: {
    sx: { control: 'object' },
  },
} as Meta<typeof NavbarList>;

// Mock links data
const mockLinks: INavbarListProps['links'] = [
  { href: '/home', children: <>Home</> },
  { href: '/about', children: <>About</> },
  { href: '/services', children: <>Services</> },
  { href: '/contact', children: <>Contact</> },
];

const Template: StoryFn<typeof NavbarList> = (args) => (
  <Router>
    <NavbarList {...args} />
  </Router>
);

// Default Story
export const Default = Template.bind({});
Default.args = {
  links: mockLinks,
  sx: {},
};

// Centered Links
export const FirstAligned = Template.bind({});
FirstAligned.args = {
  links: mockLinks,
  sx: { justifyContent: 'flex-start', alignItems: 'center' },
};
export const CenterAligned = Template.bind({});
CenterAligned.args = {
  links: mockLinks,
  sx: { justifyContent: 'center', alignItems: 'center' },
};

// Space Between Links
export const SpaceBetween = Template.bind({});
SpaceBetween.args = {
  links: mockLinks,
  sx: { justifyContent: 'space-between', alignItems: 'center' },
};

// End-Aligned Links
export const EndAligned = Template.bind({});
EndAligned.args = {
  links: mockLinks,
  sx: { justifyContent: 'flex-end', alignItems: 'center' },
};
