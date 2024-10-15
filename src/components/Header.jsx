import { NavLink } from "react-router-dom"
import { header } from "server/reply"


const Header = () => {
  return (
    <header>
      <h2>İş Takip</h2>
      <nav>
       <NavLink to={'/'}>İş Listesi</NavLink>
       <NavLink to={'/add'}>İş Ekle</NavLink>
      </nav>
    </header>
  )
}

export default Header