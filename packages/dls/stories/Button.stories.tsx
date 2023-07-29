import { Button as ChakraButton } from "@chakra-ui/react";
import { getThemingArgTypes } from "@chakra-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";
import theme from "../src/theme";

const meta = {
  title: "Atoms/Forms/Button",
  component: ChakraButton,
  tags: ["autodocs"],
  argTypes: {
    ...getThemingArgTypes(theme, "Button"),
  },
} satisfies Meta<typeof ChakraButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    bg: "blue.500",
  },
};
