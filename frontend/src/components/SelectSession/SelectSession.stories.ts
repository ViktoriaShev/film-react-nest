import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions"; // Используем action для событий
import { SelectSession } from "./SelectSession";

const meta = {
  title: "UI/SelectSession",
  component: SelectSession,
  parameters: {
    layout: "centered",
  },
  args: {
    onSelect: action("onSelect"), // Используем action для обработки select
  },
} satisfies Meta<typeof SelectSession>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sessions: [
      {
        id: "1", // Убедитесь, что каждый элемент имеет уникальный id
        day: "Monday",
        time: "10:00",
      },
      {
        id: "2", // Уникальный id
        day: "Monday",
        time: "12:00",
      },
      {
        id: "3", // Уникальный id
        day: "Tuesday",
        time: "11:00",
      },
      {
        id: "4", // Уникальный id
        day: "Wednesday",
        time: "12:00",
      },
    ],
    selected: null, // или передайте ID выбранной сессии
    onSelect: action("onSelect"), // Используем action для отлавливания события
  },
};
