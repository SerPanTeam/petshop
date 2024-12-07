# Структура проекта

```plaintext
├── public
│   ├── images
│   │   ├── main-banner.png
│   │   └── map.png
│   └── .htaccess
├── src
│   ├── assets
│   │   └── icons
│   │       ├── cart.svg
│   │       ├── instagram.svg
│   │       ├── logo.svg
│   │       └── whatsapp.svg
│   ├── components
│   │   ├── ui
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── skeleton.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── CategotiesComponent.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── SectionDevider.tsx
│   ├── lib
│   │   ├── db.ts
│   │   └── utils.ts
│   ├── pages
│   │   ├── Cart.tsx
│   │   ├── Categorie.tsx
│   │   ├── Categories.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   └── Sales.tsx
│   ├── redux
│   │   ├── slugsSlice.ts
│   │   ├── store.ts
│   │   └── userSlice.ts
│   ├── types
│   │   └── svg.d.ts
│   ├── App.tsx
│   ├── config.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── codewr.js
├── combined-files.md
├── components.json
├── eslint.config.js
├── ftp-deploy-config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

# Файлы .ts, .tsx, .css

## src\App.tsx

```typescript
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Sales from "./pages/Sales";
import Categorie from "./pages/Categorie";

// import { useDispatch } from "react-redux";
// import { addSlug } from "@/redux/slugsSlice";
import { useEffect } from "react";

function App() {
  useEffect(() => {

  }, []);

  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryName" element={<Categorie />} />

          <Route path="/sales" element={<Sales />} />
          <Route path="/products" element={<Products />}>
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

```

## src\components\Breadcrumb.tsx

```typescript
import { Link } from "react-router-dom";
interface Breadcrumb {
  name: string;
  url: string;
}

const startBreadcrumb: Breadcrumb[] = [
  { name: "Main page", url: "/" },
  { name: "Categories", url: "/categories" },
];

export default function Breadcrumb({
  additionalBreadcrumb,
}: {
  additionalBreadcrumb?: Breadcrumb[];
}) {
  const fullBreadcrumb = startBreadcrumb.concat(additionalBreadcrumb || []);
  return (
    <div className="flex flex-row mt-10 mb-10">
      {fullBreadcrumb.map((val, index) => {
        return (
          <div className="flex flex-row justify-center items-center flex-wrap">
            {index !== 0 && <div className="border h-[1px] lg:w-4 w-2"></div>}
            <div className="border lg:py-2 lg:px-4 py-1 px-2 rounded-md">
              <Link to={val.url} className="text-small-grey lg:text-[16px] text-[12px]">
                {val.name}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

```

## src\components\CategotiesComponent.tsx

```typescript
// import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { nameToSlug } from "@/lib/utils";
import { setCategories } from "@/lib/db";

// type Category = {
//   id: number;
//   title: string;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
// };

type CategoryProps = {
  limit?: number;
};

// const fetchCategories = async (): Promise<Category[]> => {
//   const response = await fetch(`${API_BASE_URL}/categories/all`);
//   if (!response.ok) throw new Error("Failed to fetch categories");
//   return response.json();
// };

export default function Category({ limit }: CategoryProps) {
  const { data, isLoading, error } = setCategories();
  // useQuery({
  //   queryKey: ["categories"], // Уникальный ключ для запроса
  //   queryFn: fetchCategories, // Функция для загрузки данных
  //   staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  // });

  // if (isLoading) return <p>Loading...</p>;

  if (isLoading) {
    return (
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: limit || 4 }).map((_, index) => (
          <div key={index} className="flex flex-col justify-center">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-6 w-3/4 mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No categories available.</p>;

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.slice(0, limit ? limit : data.length).map((category) => (
        <Link
          to={"/categories/" + nameToSlug(category.title)}
        >
          <div key={category.id} className="flex flex-col justify-center">
            <img src={API_BASE_URL + category.image} alt={category.title} />
            <h3 className="text-center text-[20px] font-medium leading-[130%] text-[#282828] mt-4">
              {category.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

```

## src\components\Footer.tsx

```typescript
import Instagram from "../assets/icons/instagram.svg?react";
import Whatsapp from "../assets/icons/whatsapp.svg?react";



import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="px-2 lg:px-10 mt-[100px]">
      <h2 className="heading-2">Contact</h2>
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <div className="flex flex-col gap-8 w-full lg:min-w-[240px]">
          <div className="p-8 bg-bgGrey rounded-xl">
            <p className="text-small-grey">Phone</p>
            <p className="heading-3 mt-4">+49 30 915-88492</p>
          </div>
          <div className="p-8 bg-bgGrey rounded-xl">
            <p className="text-small-grey">Address</p>
            <p className="heading-3 mt-4">
              Wallstraẞe 9-13, 10179 Berlin, Deutschland
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full lg:w-[548px]">
          <div className="p-8 bg-bgGrey rounded-xl">
            <p className="text-small-grey">Socials</p>
            <p className="heading-3 mt-4 flex flex-row gap-4">
              <Link to={"/"}>
                <Instagram />
              </Link>
              <Link to={"/"}>
                <Whatsapp />
              </Link>
            </p>
          </div>
          <div className="p-8 bg-bgGrey rounded-xl h-full">
            <p className="text-small-grey">Working Hours</p>
            <p className="heading-3 mt-4">24 hours a day</p>
          </div>
        </div>
      </div>
      <img className="py-8" src="/images/map.png" alt="PetShop on the MAP" />
    </footer>
  );
}

export default Footer;

```

## src\components\Header.tsx

```typescript
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

```

## src\components\ScrollToTop.tsx

```typescript
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;

```

## src\components\SectionDevider.tsx

```typescript
import { useNavigate } from "react-router-dom";

export default function SectionDevider({
  titleName,
  buttonName,
  url,
}: {
  titleName: string;
  buttonName: string;
  url: string;
}) {
  const navigate = useNavigate();
  const goToPage = (page: string) => {
    navigate(page);
  };

  return (
    <div className="flex flex-row items-center justify-center px-2 py-4 mt-20">
      <h2 className="heading-2">{titleName}</h2>
      <div className="md:ml-8 ml-2 h-[1px] w-full bg-slate-300"></div>
      <button
        className="text-nowrap px-4 py-2 text-[16px] text-small-grey border-slate-300 border-solid border rounded-md"
        onClick={() => goToPage(url)}
      >
        {buttonName}
      </button>
    </div>
  );
}

```

## src\components\ui\dropdown-menu.tsx

```typescript
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

```

## src\components\ui\skeleton.tsx

```typescript
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

## src\config.ts

```typescript
export const API_BASE_URL = "https://pet-shop-backend.fly.dev";
```

## src\index.css

```css
@layer components {
  .heading-2 {
    @apply text-txtBlack font-bold leading-[110%];
    @apply xl:text-[64px] md:text-[40px] text-[30px];
  }
  .heading-3 {
    @apply text-txtBlack font-semibold leading-[110%];
    @apply xl:text-[40px] md:text-[30px] text-[20px];
  }
  .text-small-grey {
    @apply text-txtGrey font-medium leading-[130%] text-[20px];
  }
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

## src\lib\db.ts

```typescript
import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";

type Category = {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories/all`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const setCategories = () => {
  return useQuery({
    queryKey: ["categories"], // Уникальный ключ для запроса
    queryFn: fetchCategories, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });
};

```

## src\lib\utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// import { useDispatch } from "react-redux";
// import { addSlug } from "@/redux/slugsSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToSlug(name: string) {
  // const dispatch = useDispatch();

  return name.toLocaleLowerCase().trim().replace("&", "and").replace(/\s+/g, "-");
}

```

## src\main.tsx

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);

```

## src\pages\Cart.tsx

```typescript

function Cart() {
  return (
    <div>Cart</div>
  )
}

export default Cart
```

## src\pages\Categorie.tsx

```typescript

function Categorie() {
  return (
    <div>Categorie</div>
  )
}

export default Categorie
```

## src\pages\Categories.tsx

```typescript
import Category from "@/components/CategotiesComponent";
import Breadcrumb from "@/components/Breadcrumb";

function Categories() {
  return (
    <div>
      <Breadcrumb/>
      <h1 className="heading-2 mb-10">Categories</h1>
      <Category />
    </div>
  );
}

export default Categories;

```

## src\pages\Home.tsx

```typescript
import { useNavigate } from "react-router-dom";
import SectionDevider from "../components/SectionDevider";
import Categoty from "../components/CategotiesComponent";
function Home() {
  const navigate = useNavigate();

  const goSales = () => {
    navigate("/sales");
  };

  return (
    <>
      <section className="px-10 lg:py-20 py-2 w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] bg-[url('/images/main-banner.png')] bg-cover bg-center">
        <h1 className="lg:text-[96px] md:text-[56px] text-[32px] text-white font-bold leading-[110%] lg:mb-10 mb-2">
          Amazing Discounts on Pets Products!
        </h1>
        <button
          className="py-4 px-12 lg:w-[218px] lg:h-[58px] bg-blue-600 text-white rounded-md text-[20px] text-center font-semibold leading-[130%]"
          onClick={goSales}
        >
          Check out
        </button>
      </section>

      <SectionDevider
        titleName="Categories"
        buttonName="All categories"
        url="/categories"
      />
      <Categoty limit={4}/>
      <SectionDevider titleName="Sale" buttonName="All sales" url="/sales" />
    </>
  );
}

export default Home;

```

## src\pages\NotFound.tsx

```typescript
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-txtBlack">404</h1>
      <p className="text-lg text-gray-500">Page Not Found</p>
      <Link to="/" className="text-hoverBlue hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;

```

## src\pages\ProductDetail.tsx

```typescript

function ProductDetail() {
  return (
    <div>ProductDetail</div>
  )
}

export default ProductDetail
```

## src\pages\Products.tsx

```typescript

function Products() {
  return (
    <div>Products</div>
  )
}

export default Products
```

## src\pages\Sales.tsx

```typescript
function Sales() {
  return (
    <div>Sales</div>
  )
}

export default Sales
```

## src\redux\slugsSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Slug = {
  id: number;
  slug: string;
};

type SlugsState = {
  slugs: Slug[];
};

const initialState: SlugsState = {
  slugs: [],
};

const slugsSlice = createSlice({
  name: "slugs",
  initialState,
  reducers: {
    addSlug(state, action: PayloadAction<Slug>) {
      state.slugs.push(action.payload);
    },
  },
});

export const { addSlug } = slugsSlice.actions;
export default slugsSlice.reducer;

```

## src\redux\store.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

```

## src\redux\userSlice.ts

```typescript
// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  loggedIn: boolean;
};

const initialState: UserState = {
  name: "",
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.name = action.payload;
      state.loggedIn = true;
    },
    logout(state) {
      state.name = "";
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

```

## src\types\svg.d.ts

```typescript
declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
```

## src\vite-env.d.ts

```typescript
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

```

## vite.config.ts

```typescript
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

# Дополнительные файлы

## index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PetShop</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

