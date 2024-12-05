// import Logo from "../assets/icons/logo.svg?react";
// import Cart from "../assets/icons/cart.svg?react";
// import { Link } from "react-router-dom";

// const menuItems = [
//   { id: 1, label: "Main Page", href: "/" },
//   { id: 2, label: "Categories", href: "/categories" },
//   { id: 3, label: "All products", href: "/products" },
//   { id: 4, label: "All sales", href: "/sales" },
// ];

// function Header() {
//   return (
//     <header className=" flex flex-row justify-between items-center px-10 py-[30px]">
//       <Link to={"/"}>
//         <Logo className="transform transition-transform duration-300 hover:scale-125 hover:rotate-45 hover:brightness-125" />
//       </Link>
//       <div>
//         <nav>
//           <ul className="flex gap-8">
//             {menuItems.map((item) => (
//               <li key={item.id}>
//                 <Link
//                   to={item.href}
//                   className="text-txtBlack text-[20px] font-medium leading-[130%] hover:text-hoverBlue"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//       <Link to={"/cart"}>
//         <Cart className="transform transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:brightness-125" />
//       </Link>
//     </header>
//   );
// }

// export default Header;

// import { useState } from "react";
import { Link } from "react-router-dom";
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@shadcn/ui";

import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Logo from "../assets/icons/logo.svg?react";
import Cart from "../assets/icons/cart.svg?react";

const menuItems = [
  { id: 1, label: "Main Page", href: "/" },
  { id: 2, label: "Categories", href: "/categories" },
  { id: 3, label: "All products", href: "/products" },
  { id: 4, label: "All sales", href: "/sales" },
];

function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-10 py-6">
      {/* Логотип */}
      <Link to={"/"}>
        <Logo className="transform transition-transform duration-300 hover:scale-125 hover:rotate-45 hover:brightness-125" />
      </Link>

      {/* Меню для больших экранов */}
      <nav className="hidden md:block">
        <ul className="flex gap-8">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.href}
                className="text-txtBlack text-[20px] font-medium leading-[130%] hover:text-hoverBlue"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Иконка корзины */}
      <Link to={"/cart"}>
        {/* <Cart className="hidden md:block transform transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:brightness-125" /> */}
        <Cart className="transform transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:brightness-125" />
      </Link>

      {/* Гамбургер меню для маленьких экранов */}
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden">
          <Menu size={52} />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-txtBlack"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-white shadow-lg">
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.id}>
              <Link
                to={item.href}
                className="text-txtBlack text-[16px] font-medium leading-[130%] hover:text-hoverBlue"
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
