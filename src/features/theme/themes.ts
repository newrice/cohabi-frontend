import { ThemeOptions, colors, makeStyles, Theme } from "@material-ui/core";

export const MyTheme: ThemeOptions = {
  palette: {
    type: "light",
    // primary: { main: '#52b202', contrastText: '#f5f5f5' },
    primary: { main: "#f5f5f5", contrastText: colors.grey[900] },
    secondary: { main: "#F39800", contrastText: "#f5f5f5" },
    background: {
      paper: colors.grey[100],
      default: colors.grey[200],
    },
  },
};

export const useStyles = makeStyles((theme: Theme) => {
  const overridePrimeColor = theme.palette.secondary.main;
  const overridePrimeContrastText = theme.palette.secondary.contrastText;
  return {
    root: {
      // Typographies
      "& .MuiTypography-colorPrimary": {
        color: overridePrimeColor,
      },
      // textfields
      "& .MuiInput-underline:after": {
        borderColor: overridePrimeColor,
      },
      "& .MuiInput-underline.Mui-error:after": {
        borderColor: theme.palette.error.main,
      },
      // textareas
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: overridePrimeColor,
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: overridePrimeColor,
      },
      "& .MuiFormLabel-root.Mui-error": {
        color: theme.palette.error.main,
      },
      // buttons
      "& .MuiButton-textPrimary": {
        color: overridePrimeColor,
      },
      // date pickers
      "& .MuiPickersDay-current": {
        color: overridePrimeColor,
      },
      "& .MuiPickersDay-daySelected": {
        color: overridePrimeContrastText,
        backgroundColor: overridePrimeColor,
      },
      "& .MuiPickersYear-root:focus": {
        color: overridePrimeColor,
      },
      "& .MuiPickersMonth-root:focus": {
        color: overridePrimeColor,
      },
    },
  };
});
