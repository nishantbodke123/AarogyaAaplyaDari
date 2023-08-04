import { Row, Tooltip } from "antd";
import React from "react";
import { HeaderBar, HeaderBarSubDiv, HeaderLogo, LogOutIcon } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div>
      <HeaderBar>
        <HeaderLogo src="logo (1).svg"></HeaderLogo>
        <HeaderBarSubDiv>
          <Tooltip title="Logout">
            <LogOutIcon
              icon={faRightFromBracket}
              onClick={() => window.location.replace("/")}
            />
          </Tooltip>
        </HeaderBarSubDiv>
      </HeaderBar>
    </div>
  );
}

export default Header;
