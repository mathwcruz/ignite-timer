import { NavLink } from "react-router-dom"
import { Scroll, Timer } from "phosphor-react";

import { HeaderContainer } from "./styles";
import logoIgnite from "../../assets/logo.svg"

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
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