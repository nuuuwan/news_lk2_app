import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";

import TimeXFuture from "../../nonview/base/TimeXFuture";

export default function HomePageBottomNavigation({
  timeLatestRefresh,
  onClickRefresh,
}) {
  const timeLatestRefreshStr =
    "Last Refreshed " + TimeXFuture.localeString(timeLatestRefresh);
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label={
            <Typography sx={{ fontSize: "xx-small" }}>
              {timeLatestRefreshStr}
            </Typography>
          }
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
        />
      </BottomNavigation>
    </Box>
  );
}
