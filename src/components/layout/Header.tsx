import { Link } from "react-router-dom";
import { Menu as MenuIco } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "@/assets/icons/logo.svg?react";
import Cart from "@/assets/icons/cart.svg?react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { id: 1, label: "Main Page", href: "/" },
  { id: 2, label: "Categories", href: "/categories" },
  { id: 3, label: "All products", href: "/products" },
  { id: 4, label: "All sales", href: "/sales" },
  { id: 5, label: "Cart", href: "/cart", isMobMenu: true },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const countInCart = useSelector((state: RootState) =>
    state.cart.cartPositions.reduce((acc, val) => acc + val.count, 0)
  );

  const { pathname } = useLocation();
  useEffect(() => {
    const name = menuItems.find((val) => val.href == pathname)?.label;
    if (name) {
      document.title = name + " - PetSHOP";
    } else {
      document.title =
        pathname
          .split("/")[pathname.split("/").length - 1].toUpperCase()
          .replace(/-/g, " ") + " - PetSHOP";
    }
  }, [pathname]);

  return (
    <div className="flex flex-row justify-between items-center px-2 py-6 ">
      <Link to={"/"}>
        <Logo className="transform transition-transform duration-300 hover:scale-125 hover:rotate-45 hover:brightness-125" />
      </Link>

      <nav className="hidden md:block">
        <ul className="flex gap-8">
          {menuItems.map(
            (item) =>
              !item.isMobMenu && (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="text-txtBlack text-[20px] font-medium leading-[130%] hover:text-hoverBlue"
                  >
                    {item.label}
                  </Link>
                </li>
              )
          )}
        </ul>
      </nav>

      <Link to={"/cart"} className="relative">
        <Cart className="transform transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:brightness-125" />
        {countInCart > 0 && (
          <div className="rounded-full bg-blue-600 absolute top-0 left-0 text-white p-1 w-7 h-7 flex justify-center items-center">
            {countInCart > 99 ? 99 : countInCart}
          </div>
        )}
      </Link>

      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger className="md:hidden">
          <MenuIco size={52} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60 bg-white shadow-lg">
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.id}>
              <Link
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                to={item.href}
                className="text-txtBlack text-[20px] font-medium leading-[130%] hover:text-hoverBlue"
              >
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Header;
