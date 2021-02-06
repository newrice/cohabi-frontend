import React from "react";
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  StylesProvider,
} from "@material-ui/core";
import AppWithAuth from "./AppBody";
import initI18n from "./features/i18n";
import { MyTheme } from "./features/theme/themes";

initI18n();

const App = (): JSX.Element => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={createMuiTheme(MyTheme)}>
      <CssBaseline>
        <AppWithAuth />
      </CssBaseline>
    </ThemeProvider>
  </StylesProvider>
);

export default App;
