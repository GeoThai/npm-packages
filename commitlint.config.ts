import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "no-at-mentions": ({ body, subject }) => {
          const text = `${subject || ""} ${body || ""}`.replaceAll(
            /`[^`]*`/g,
            "",
          );

          const mentionPattern = /@[a-zA-Z][a-zA-Z0-9_-]*/g;
          const mentions = text.match(mentionPattern);

          if (mentions && mentions.length > 0) {
            return [
              false,
              `Avoid bare @mentions in commit messages (found: ${mentions.join(", ")}). Wrap in backticks: \`@example\``,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "no-at-mentions": [2, "always"],
  },
};

export default config;
