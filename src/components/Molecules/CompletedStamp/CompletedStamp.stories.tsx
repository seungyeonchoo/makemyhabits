import { Meta, StoryFn } from '@storybook/react';
import CompletedStamp from '.';

export default {
  title: 'MOLECULES/Completed Stamp',
  component: CompletedStamp,
  tags: ['autodocs'],
} as Meta<typeof CompletedStamp>;

const Template: StoryFn<typeof CompletedStamp> = () => <CompletedStamp />;

export const Default = Template.bind({});
