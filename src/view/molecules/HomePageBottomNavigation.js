import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";

import { LANG_LIST } from "../../nonview/base/I18N";
import I18N from "../../nonview/base/I18N";

export default function HomePageBottomNavigation({
  timeLatestRefresh,
  onClickRefresh,
  onSelectLanguage,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        {LANG_LIST.map(function (lang) {
          const onClickInner = function () {
            onSelectLanguage(lang.lang);
          };
          const color = lang.lang === I18N.getLang() ? lang.color : "neutral";

          return (
            <BottomNavigationAction
              key={"button-lang-" + lang.lang}
              label={
                <Typography variant="h6" color={color}>
                  {lang.shortLabel}
                </Typography>
              }
              onClick={onClickInner}
            />
          );
        })}
        <BottomNavigationAction
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
        />
      </BottomNavigation>
    </Paper>
  );
}