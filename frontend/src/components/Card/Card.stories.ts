import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Card } from "./Card";
import { CDN_URL } from "../../utils/constants.ts";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "card-1",
    image: `${CDN_URL}/bg1s.jpg`, // Здесь должно быть корректное изображение
    title: "Архитекторы общества", // Обязательно укажите title, если он нужен
    text: "Архитекторы общества", // Если text ожидается, обязательно передавайте
  },
};
