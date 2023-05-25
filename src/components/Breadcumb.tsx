import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router-dom";
import { NavLink as NavLinkI } from '../interfaces/NavLink.ts';

export default function Breadcrumb({ pages }: { pages: NavLinkI[] }) {
  const pathname = useLocation().pathname;
  return (
    <nav aria-label="breadcrumb rounded" style={{ backgroundColor: "#EEE"}}>
      <ol className="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
        <li className="breadcrumb-item">
          <Link to={pathname} className="link-body-emphasis">
            <FontAwesomeIcon icon={['fas', 'home']} color="#000" />
            <span className="visually-hidden">Home</span>
          </Link>
        </li>
        { pages.map((page) => {
          const isActive = page.link === pathname;
          return (
            <li className={"breadcrumb-item fw-bold" + (isActive ? ' active' : '') } key={page.name}>
              <Link to={page.link} className={"link-dark" + (isActive ? '' : ' text-decoration-none opacity-75')}>{page.name}</Link>
            </li>
          );
        }) }
      </ol>
    </nav>
  );
}
