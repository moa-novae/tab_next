import "./_app.scss";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme({
    palette: {
      white: "#fafafa",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {/* reset css */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
