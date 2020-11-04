import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { ButtonProps } from 'src/components/Button';

export default {
  title: 'Form/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps & {text: string}> = ({text, ...args}) => <Button {...args}>{text}</Button>;

export const Default = Template.bind({});
Default.args = {
  text: "Text"
};

export const Small = Template.bind({});
Small.args = {
  text: "Text",
  size: "small"
};

export const Large = Template.bind({});
Large.args = {
  text: "Text",
  size: "large"
};

export const Bold = Template.bind({});
Bold.args = {
  text: "Text",
  bold: true
};

export const Italic = Template.bind({});
Italic.args = {
  text: "Text",
  italic: true
};
