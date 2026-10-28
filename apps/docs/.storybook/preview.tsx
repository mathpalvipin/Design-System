import type { Preview } from "@storybook/react-vite";
import "@UI-lib/tokens/light.css";
import "@UI-lib/tokens/dark.css";
import "@UI-lib/ui/styles.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.dataset.theme = theme;
      document.body.style.background = "var(--color-bg-default)";
      return <Story />;
    },
  ],
};

export default preview;
