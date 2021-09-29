/// <reference types="react-scripts" />

import { createTheme, ThemeOptions, Theme } from "@material-ui/core";

declare module "@material-ui/core/styles" {
  interface ThemeOptions {
    sizes: {
      menuWidth: number;
      menuExtendedWidth: number;
    };
  }
  interface Theme {
    sizes: {
      menuWidth: number;
      menuExtendedWidth: number;
    };
  }
}
