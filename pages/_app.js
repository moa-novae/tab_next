import "./_app.scss";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme({
    palette: {
      white: "#fafafa",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
