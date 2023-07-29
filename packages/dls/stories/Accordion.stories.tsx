import { Accordion as ChakraAccordion } from "@chakra-ui/react";
import { getThemingArgTypes } from "@chakra-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";
import theme from "../src/theme";

const meta = {
  title: "Atoms/Disclosure/Accordion",
  component: ChakraAccordion,
  tags: ["autodocs"],
  argTypes: {
    ...getThemingArgTypes(theme, "Accordion"),
  },
} satisfies Meta<typeof ChakraAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
