import { NavLink } from "react-router-dom"
import { Scroll, Timer } from "phosphor-react";

import igniteLogo from "../../assets/ignite-logo.svg"
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink title="Timer" to="/">
          <Timer size={24} />
        </NavLink>
        <NavLink title="Histórico" to="/history">
          <Scroll size={24}  />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}