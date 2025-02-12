import type { Meta, StoryObj } from "@storybook/react";
import { Layout } from "./Layout";

const meta = {
  title: "UI/Layout",
  component: Layout,
  parameters: {
    layout: "centered",
  },
  args: {
    // Убедитесь, что передаете обязательное свойство children
    children: <div>Контент Layout</div>, // Например, передаем какой-то контент
    isLocked: false, // Это опциональное свойство
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // В args можно переопределить default значения, если нужно
    children: <div>Содержимое Layout</div>,
    isLocked: false, // Или другое состояние
  },
};
