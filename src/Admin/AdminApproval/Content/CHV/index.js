import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, styled } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import NewCHVApproval from "./NewCHVApproval";
import CHVGroupApproval from "./CHVGroupApproval";

const StyledBox = styled(Box)(({ theme }) => ({
  margin: "0px",
  backgroundColor: "white",
  padding: theme.spacing(1),
  boxSizing: "border-box",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  color: "Black",
  backgroundColor: "#E0F4FF",
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "#176B87",
  },
  "&:hover": {
    backgroundColor: "#222C38",
    color: "white",
  },
}));

function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index}>{value === index && <>{children}</>}</div>
  );
}

function CHVApproval() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <StyledBox sx={{ width: "100%" }}>
        <AppBar position="static">
          <Tabs value={value} variant="fullWidth" onChange={handleChange}>
            <CustomTab label="New User Approval"></CustomTab>
            <CustomTab label="Designation Approval"></CustomTab>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <NewCHVApproval />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CHVGroupApproval />
        </TabPanel>
      </StyledBox>
    </>
  );
}

export default CHVApproval;
