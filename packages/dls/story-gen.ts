import { join } from "path";
import { writeFileSync } from "fs";

type Component = {
  name: string;
  category: string;
  args: { [key: string]: string };
};

const components: Component[] = [
  { name: "Accordion", category: "Disclosure", args: {} },
  { name: "Button", category: "Forms", args: { bg: "blue.500" } },
];

components.forEach(async (component) => {
  let template = `import theme from "../theme";
import type { Meta, StoryObj } from "@storybook/react";
import { getThemingArgTypes } from "@chakra-ui/storybook-addon";
import { ${component.name} as Chakra${component.name} } from "@chakra-ui/react";

const meta = {
  title: "Atoms/${component.category}/${component.name}",
  component: Chakra${component.name},
  tags: ["autodocs"],
  argTypes: {
    ...getThemingArgTypes(theme, "${component.name}"),
  },
} satisfies Meta<typeof Chakra${component.name}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: ${JSON.stringify(component.args, null, 2)}
};
`;

  writeFileSync(
    join(__dirname, "/stories", `/${component.name}.stories.tsx`),
    template
  );
});
