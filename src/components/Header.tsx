import { Link } from "react-router-dom";
import { Menu as MenuIco } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Logo from "../assets/icons/logo.svg?react";
import Cart from "../assets/icons/cart.svg?react";
import { useState } from "react";

const menuItems = [
  { id: 1, label: "Main Page", href: "/" },
  { id: 2, label: "Categories", href: "/categories" },
  { id: 3, label: "All products", href: "/products" },
  { id: 4, label: "All sales", href: "/sales" },
  { id: 5, label: "Cart", href: "/cart", isMobMenu: true },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-row justify-between items-center px-2 lg:px-10 py-6 border-b border-gray-300">
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

      <Link to={"/cart"}>
        <Cart className="transform transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:brightness-125" />
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
    </header>
  );
}

export default Header;
