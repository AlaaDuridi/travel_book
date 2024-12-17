import { StoryFn, Meta } from '@storybook/react';
import CheckoutBadge from './CheckoutBadge';

// Default export for Storybook
export default {
  title: 'Components/CheckoutBadge',
  component: CheckoutBadge,
  argTypes: {
    numberOfBookedRooms: {
      control: { type: 'number', min: 0 },
      defaultValue: 4,
      description: 'Number of booked rooms displayed in the badge.',
    },
  },
} as Meta<typeof CheckoutBadge>;

// Template for the story
const Template: StoryFn<typeof CheckoutBadge> = (args) => <CheckoutBadge {...args} />;

// Stories
export const Default = Template.bind({});
Default.args = {
  numberOfBookedRooms: 4,
};

export const Empty = Template.bind({});
Empty.args = {
  numberOfBookedRooms: 0,
};

export const LargeNumber = Template.bind({});
LargeNumber.args = {
  numberOfBookedRooms: 99,
};
