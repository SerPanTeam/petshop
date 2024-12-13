# Структура проекта

```plaintext
├── public
│   ├── images
│   │   ├── 404.png
│   │   ├── first-order-banner.png
│   │   ├── main-banner.png
│   │   └── map.png
│   └── .htaccess
├── src
│   ├── assets
│   │   └── icons
│   │       ├── cart.svg
│   │       ├── instagram.svg
│   │       ├── logo.svg
│   │       ├── minus.svg
│   │       ├── plus.svg
│   │       ├── whatsapp.svg
│   │       └── x.svg
│   ├── components
│   │   ├── common
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── OrderSendForm.tsx
│   │   │   ├── PreData.tsx
│   │   │   ├── ReadMore.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── SectionDivider.tsx
│   │   │   └── SendButton.tsx
│   │   ├── layout
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── product
│   │   │   ├── AddToCartButton.tsx
│   │   │   ├── CategoriesComponent.tsx
│   │   │   └── ProductsComponent.tsx
│   │   └── ui
│   │       ├── dropdown-menu.tsx
│   │       └── skeleton.tsx
│   ├── lib
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── pages
│   │   ├── Cart.tsx
│   │   ├── Categories.tsx
│   │   ├── Category.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   └── Sales.tsx
│   ├── redux
│   │   ├── cartSlice.ts
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
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Sales from "./pages/Sales";
import Categorie from "./pages/Category";
import { useSetCategories, useSetProducts } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addSlugs } from "@/redux/slugsSlice";
import { nameToSlug } from "./lib/utils";
import PreData from "@/components/common/PreData";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useSetCategories();

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useSetProducts();

  const [slugsDispatched, setSlugsDispatched] = useState(false);

  useEffect(() => {
    if (
      !errorCategories &&
      !isLoadingCategories &&
      Array.isArray(categoriesData) &&
      !errorProducts &&
      !isLoadingProducts &&
      Array.isArray(productsData)
    ) {
      const categorySlugs = categoriesData.map((category) => ({
        id: category.id,
        slug: nameToSlug(category.title),
        title: category.title,
        catId: 0,
        type: "category" as const,
      }));

      const productSlugs = productsData.map((product) => ({
        id: product.id,
        slug: nameToSlug(product.title),
        title: product.title,
        catId: product.categoryId,
        type: "product" as const,
      }));

      dispatch(addSlugs([...categorySlugs, ...productSlugs]));
      setSlugsDispatched(true);
    }
  }, [
    categoriesData,
    isLoadingCategories,
    errorCategories,
    productsData,
    isLoadingProducts,
    errorProducts,
    dispatch,
  ]);

  const isLoading =
    isLoadingCategories || isLoadingProducts || !slugsDispatched;
  const error = errorCategories || errorProducts;

  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <header className="lg:px-10 border-b border-gray-300">
        <Header />
      </header>
      <main className="lg:px-10">
        {isLoading ? (
          <PreData limit={0} isLoading={isLoading} error={error} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryName" element={<Categorie />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/categories/:categoryName/:productName"
              element={<ProductDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
      <footer className="lg:px-10">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

```

## src\components\common\Breadcrumb.tsx

```typescript
import { Link } from "react-router-dom";
interface Breadcrumb {
  name: string | undefined;
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
        const isLast = index === fullBreadcrumb.length - 1;
        const isFirst = index === 0;
        return (
          <div
            key={index}
            className={`flex flex-row justify-center items-center flex-wrap ${
              isFirst || isLast ? "hidden md:flex" : "flex"
            }`}
          >
            {!isFirst && <div className="border h-[1px] lg:w-4 w-2 "></div>}
            <div className="border lg:py-2 lg:px-4 py-1 px-2 rounded-md hover:bg-gray-50">
              <Link
                to={val.url}
                className={`${
                  index !== fullBreadcrumb.length - 1
                    ? "text-small-grey"
                    : "text-black"
                } lg:text-[16px] text-[12px]`}
              >
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

## src\components\common\ContactForm.tsx

```typescript
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { login } from "@/redux/userSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const dispatch = useDispatch();

  const [isAdded, setIsAdded] = useState(false);
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log("Form submitted:", data);
    dispatch(
      login({
        name: data.name,
        phone: data.phone,
        email: data.email,
        kupon: true,
        loggedIn: true,
      })
    );
    reset(); // Reset all form fields
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="w-full md:w-[400px] ld:w-[600px]">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Name */}
        <div className="mb-4">
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
            })}
            className={`bg-transparent placeholder-white shadow appearance-none border rounded w-full py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Name"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-xs italic mt-2">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone Number without Mask */}
        <div className="mb-4">
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                // Allows digits, parentheses, plus, and hyphens, minimum 6 characters
                value: /^[\d()+-]{6,}$/,
                message:
                  "Please enter a valid phone number with at least 6 characters. Allowed characters: digits, (), +, -",
              },
            })}
            className={`bg-transparent placeholder-white shadow appearance-none border rounded w-full py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="Phone Number"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-red-500 text-xs italic mt-2">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className={`bg-transparent placeholder-white shadow appearance-none border rounded w-full py-4 px-8 text-white leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs italic mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          {/* <button
            type="submit"
            className="bg-white text-black text-[20px] font-semibold leading-[1.3] w-full px-8 py-4 rounded-md"
          >
            Get a discount
          </button> */}
          <button
            type="submit"
            className={`h-14 w-full font-bold py-2 px-6 rounded-md transition-all duration-300 ${
              isAdded
                ? "bg-gray-200 text-blue-600"
                : " text-black bg-white hover:bg-black hover:text-white"
            } `}
            // onClick={(e) => handleClick(e)}
          >
            {isAdded ? "Request Submitted" : "Get a discount"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

```

## src\components\common\Modal.tsx

```typescript
import IcoX from "@/assets/icons/x.svg?react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} 
    >
      <div
        className="bg-blue-600 rounded-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} 

      >
        {title && <h2 className="text-xxl font-bold mb-4 text-white">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-500"
        >
          <IcoX/>
        </button>
      </div>
    </div>
  );
};

export default Modal;

```

## src\components\common\OrderSendForm.tsx

```typescript
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
}

interface OrderSendFormProps {
  callback: () => void;
}

const OrderSendForm: React.FC<OrderSendFormProps> = ({ callback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>();

  // Получаем данные пользователя из Redux
  const { name, phone, email } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Если пользователь уже залогинен и есть данные,
    // устанавливаем их в поля формы
    if (name) setValue("name", name);
    if (phone) setValue("phone", phone);
    if (email) setValue("email", email);
  }, [name, phone, email, setValue]);

  const [isAdded, setIsAdded] = useState(false);
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log("Form submitted:", data);
    reset(); // Reset all form fields
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
    callback();
  };

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   callbackFunc?.();

  //   setIsAdded(true);
  //   setTimeout(() => setIsAdded(false), 1000);
  // };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Name */}
        <div className="mb-4">
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
            })}
            className={`bg-white placeholder-gray-400 shadow appearance-none border rounded w-full py-4 px-8 text-black leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Name"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-xs italic mt-2">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone Number without Mask */}
        <div className="mb-4">
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                // Allows digits, parentheses, plus, and hyphens, minimum 6 characters
                value: /^[\d()+-]{6,}$/,
                message:
                  "Please enter a valid phone number with at least 6 characters. Allowed characters: digits, (), +, -",
              },
            })}
            className={`bg-white placeholder-gray-400 shadow appearance-none border rounded w-full py-4 px-8 text-black leading-tight focus:outline-none focus:shadow-outline ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="Phone Number"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-red-500 text-xs italic mt-2">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className={`bg-white placeholder-gray-400 shadow appearance-none border rounded w-full py-4 px-8 text-black leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs italic mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          {/* <button
            type="submit"
            className="bg-white text-black text-[20px] font-semibold leading-[1.3] w-full px-8 py-4 rounded-md"
          >
            Get a discount
          </button> */}
          <button
            type="submit"
            className={`h-14 w-full font-bold py-2 px-6 rounded-md transition-all duration-300 ${
              isAdded
                ? "bg-gray-200 text-blue-600"
                : " text-white bg-blue-600 hover:bg-black hover:text-white"
            } `}
            // onClick={(e) => handleClick(e)}
          >
            {isAdded ? "Order sendet" : "Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderSendForm;

```

## src\components\common\PreData.tsx

```typescript
import { Skeleton } from "@/components/ui/skeleton";
import { Category, ProductInCategory } from "@/lib/api";
import NotFound from "@/pages/NotFound";

function PreData({
  isLoading,
  limit,
  error,
  data,
}: {
  isLoading: boolean;
  limit?: number;
  error: Error | null;
  data?: Category[] | ProductInCategory[] | undefined;
}) {
  if (isLoading) {
    return (
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-5">
        {Array.from({ length: limit || 8 }).map((_, index) => (
          <div key={index} className="flex flex-col justify-center">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-6 w-3/4 mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (error instanceof Error) return <p>Error: {error.message}</p>;
  //   if (!data || data.length === 0) return <p>No data available.</p>;
  if (!data) return <NotFound />;
}

export default PreData;

```

## src\components\common\ReadMore.tsx

```typescript
import { useState } from "react";

const ReadMore = ({
  text,
  maxLength = 100,
}: {
  text: string;
  maxLength: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="">
      <p>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
        <br />
        <button
          onClick={toggleReadMore}
          className=" mt-4 text-[16px] font-medium leading-[1.3] underline custom-underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
};

export default ReadMore;

```

## src\components\common\ScrollToTop.tsx

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

## src\components\common\SectionDivider.tsx

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
      <h2 className="heading-2 whitespace-nowrap">{titleName}</h2>
      <div className="md:ml-8 ml-2 h-[1px] w-full bg-slate-300"></div>
      <button
        className="text-nowrap px-4 py-2 text-small-grey border-slate-300 border-solid border rounded-md"
        onClick={() => goToPage(url)}
      >
        {buttonName}
      </button>
    </div>
  );
}

```

## src\components\common\SendButton.tsx

```typescript
import { useState } from "react";

type SendButtonProps = {
  width: string;
  customStyles?: string;
  callbackFunc?: () => void;
  normalText: string;
  afterSendText: string;
};

const SendButton = ({
  width = "w-full",
  customStyles = "",
  callbackFunc,
  normalText,
  afterSendText,
}: SendButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    callbackFunc?.();

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <button
      type="submit"
      className={`h-14 ${width} font-bold py-2 px-6 rounded-md transition-all duration-300 ${
        isAdded
          ? "bg-gray-200 text-blue-600"
          : " text-black bg-white hover:bg-black hover:text-white"
      } ${customStyles}`}
      // onClick={(e) => handleClick(e)}
       onClick={(e) => handleClick(e)}
    >
      {isAdded ? afterSendText : normalText}
    </button>
  );
};

export default SendButton;

```

## src\components\layout\Footer.tsx

```typescript
import Instagram from "@/assets/icons/instagram.svg?react";
import Whatsapp from "@/assets/icons/whatsapp.svg?react";



import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="px-2 mt-[100px]">
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
    </div>
  );
}

export default Footer;

```

## src\components\layout\Header.tsx

```typescript
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

```

## src\components\product\AddToCartButton.tsx

```typescript
import { addProduct } from "@/redux/cartSlice";
import { Product } from "@/lib/api";
import { useDispatch } from "react-redux";
import { useState } from "react";

type AddToCartButtonProps = {
  data: Product;
  count: number;
  width: string;
  customStyles?: string;
  callbackFunc?: () => void;
};

const AddToCartButton = ({
  data,
  count,
  width = "w-full",
  customStyles = "",
  callbackFunc,
}: AddToCartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  function addToCart(data: Product) {
    dispatch(addProduct({ product: data, count: count }));
    //setCount(1);
    callbackFunc?.();
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAdded(true);
    addToCart(data);
    setTimeout(() => setIsAdded(false), 500);
  };

  return (
    <button
      className={`h-14 ${width} font-bold py-2 px-6 rounded-md transition-all duration-300 ${
        isAdded
          ? "bg-white text-black border border-black"
          : "bg-blue-600 text-white hover:bg-[#282828]"
      } ${customStyles}`}
      onClick={(e) => handleClick(e)}
    >
      {isAdded ? "Added" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;

{
  /* <button
className="h-14 w-full bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-[#282828]"
onClick={() => addToCart(data)}
>
Add to Cart
</button> */
}

```

## src\components\product\CategoriesComponent.tsx

```typescript
import { API_BASE_URL } from "@/config";
import { Link } from "react-router-dom";
import { nameToSlug } from "@/lib/utils";
import { useSetCategories } from "@/lib/api";

type CategoryProps = {
  limit?: number;
};

export default function Category({ limit }: CategoryProps) {
  const { data } = useSetCategories();

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data?.slice(0, limit ? limit : data.length).map((category) => (
        <Link
          key={category.id}
          to={"/categories/" + nameToSlug(category.title)}
        >
          <div className="flex flex-col justify-center">
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

## src\components\product\ProductsComponent.tsx

```typescript
import { Product } from "@/lib/api";
import { Link } from "react-router-dom";
import { nameToSlug } from "@/lib/utils";
import { API_BASE_URL } from "@/config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { getPercent } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

function Products({ products }: { products: Product[] }) {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);

  if (!slugs.length) {
    return <div>Loading slugs...</div>;
  }

  function getCatSlugByProdID(prodId: number) {
    //console.log(slugs);
    const catID = slugs.filter((val) => val.id == prodId && val.catId > 0)[0]
      .catId;
    return slugs.filter((val) => val.id == catID && val.catId == 0)[0].slug;
  }

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((val) => {
        return (
          <Link
            key={val.id}
            to={`/categories/${getCatSlugByProdID(val.id)}/${nameToSlug(
              val.title
            )}`}
          >
            <div className="flex flex-col justify-center border rounded-md items-center gap-5">
              <div className="relative group w-full lg:h-72 md:h-56 h-56 overflow-hidden">
                <img
                  className="w-full object-cover h-full"
                  src={API_BASE_URL + val.image}
                  alt={val.title}
                />
                {val.discont_price && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-[20px] font-bold px-2 py-1 rounded-lg leading-[130%] tracking-[0.6px]">
                    -{getPercent(val.price, val.discont_price)}%
                  </span>
                )}

                <AddToCartButton
                  data={val}
                  count={1}
                  width="w-[90%]"
                  customStyles="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                />
              </div>
              <div className="w-full px-4 pb-4">
                <h3 className="text-center text-[20px] font-medium leading-[130%] text-[#282828] mt-4 truncate">
                  {val.title}
                </h3>
                <div className="flex flex-row justify-start items-end gap-4">
                  <p className="heading-3">
                    ${val.discont_price ? val.discont_price : val.price}
                  </p>
                  <p className="text-small-grey line-through">
                    {val.discont_price ? `$${val.price}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Products;

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
    @apply 2xl:text-[64px] xl:text-[40px] lg:text-[30px] text-[25px];
  }
  .heading-3 {
    @apply text-txtBlack font-semibold leading-[110%];
    @apply xl:text-[36px] md:text-[28px] text-[20px];
  }
  .text-small-grey {
    @apply text-txtGrey font-medium leading-[130%] md:text-[20px] text-[12px];
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

## src\lib\api.ts

```typescript
import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";

export type Category = {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  discont_price: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
};

export type ProductInCategory = {
  category: Category;
  data: Product[];
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories/all`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const useSetCategories = () => {
  return useQuery({
    queryKey: ["categories"], // Уникальный ключ для запроса
    queryFn: fetchCategories, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });
};

const fetchProductsByCategorieId = async (
  id: number | undefined
): Promise<ProductInCategory> => {
  //const url = `${API_BASE_URL}/categories/${id}`;
 //console.log(url);
  const response = await fetch(`${API_BASE_URL}/categories/${id}`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const useFetchProductsByCategorieId = (id: number | undefined) => {
  return useQuery({
    queryKey: ["categorieByID", id], // Уникальный ключ для запроса
    queryFn: () => fetchProductsByCategorieId(id), // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
    enabled: typeof id === "number",
  });
};

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products/all`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const useSetProducts = () => {
  return useQuery({
    queryKey: ["products"], // Уникальный ключ для запроса
    queryFn: fetchProducts, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });
};

const fetchProductById = async (
  id: number | undefined
): Promise<Product> => {
  //console.log(url);
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  // return response.json();

  const data: Product[] = await response.json();
  
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Product not found");
  }
  
  return data[0];
};

export const useFetchProductById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["productByID", id], // Уникальный ключ для запроса
    queryFn: () => fetchProductById(id), // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
    enabled: typeof id === "number",
  });
};

```

## src\lib\utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToSlug(name: string): string {
  return name
    .toLowerCase() // Преобразуем в нижний регистр
    .trim() // Убираем начальные и конечные пробелы
    .replace(/&/g, 'and') // Заменяем & на 'and'
    .normalize('NFD') // Разлагаем символы с диакритическими знаками
    .replace(/[\u0300-\u036f]/g, '') // Удаляем диакритические знаки
    .replace(/[^a-z0-9\s-]/g, '') // Удаляем все специальные символы кроме букв, цифр, пробелов и дефисов
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-'); // Удаляем множественные дефисы
}

export function getPercent(fullPrice: number, curPrice: number) {
  return Math.round(100 - (curPrice * 100) / fullPrice);
}
```

## src\main.tsx

```typescript
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/common/ScrollToTop.tsx";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
);

```

## src\pages\Cart.tsx

```typescript
import SectionDevider from "@/components/common/SectionDivider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config";
import IcoX from "@/assets/icons/x.svg?react";
import Minus from "@/assets/icons/minus.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import { useDispatch } from "react-redux";
import { addProduct, delProduct, resetCart } from "@/redux/cartSlice";
import { closeKupon } from "@/redux/userSlice";
import { Product } from "@/lib/api";
import OrderSendForm from "@/components/common/OrderSendForm";
import { useState } from "react";
import Modal from "@/components/common/Modal";

function Cart() {
  const curCart = useSelector((state: RootState) => state.cart.cartPositions);

  const { kupon } = useSelector((state: RootState) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(resetCart());
    dispatch(closeKupon());
  };

  function sendOrder() {
    //dispatch(resetCart());
    openModal();
  }

  const navigate = useNavigate();

  const goShop = () => {
    navigate("/products");
  };

  const dispatch = useDispatch();

  function onMinusCount(data: Product) {
    dispatch(addProduct({ product: data, count: -1 }));
  }
  function onPlusCount(data: Product) {
    dispatch(addProduct({ product: data, count: 1 }));
  }

  function onDelPosition(id: number) {
    dispatch(delProduct(id));
  }

  return (
    <div>
      <SectionDevider
        titleName="Shopping cart"
        buttonName="Back to the store"
        url="/products"
      />

      {!curCart.length && (
        <div className="pt-10 flex flex-col gap-8">
          <p className="text-black text-[20px] font-medium leading-[1.3]">
            Looks like you have no items in your basket currently.
          </p>
          <button
            className="w-[314px] text-white text-center text-[20px] font-semibold leading-[1.3] bg-blue-600 px-12 py-4"
            onClick={goShop}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {!!curCart.length && (
        <div className="flex flex-col xl:flex-row xl:justify-between w-full gap-4">
          {/* <div className="w-full xl:w-[780px] flex flex-col gap-4"> */}
          <div className="w-full flex flex-col gap-4">
            {curCart.map((val) => {
              return (
                <div className="border border-gray-200 flex md:flex-row flex-col-reverse rounded-md items-center">
                  <img
                    className="md:w-52 w-full"
                    src={API_BASE_URL + val.product.image}
                    alt=""
                  />
                  <div className="p-2 md:p-8 w-full">
                    <div className="flex flex-row justify-between">
                      <p className="text-[20px] font-medium leading-[1.3]">
                        {val.product.title}
                      </p>
                      <button onClick={() => onDelPosition(val.product.id)}>
                        <IcoX />
                      </button>
                    </div>

                    <div className="flex xxl:flex-row flex-col items-end xl:gap-8 gap-4">
                      <div className="flex flex-row mt-8">
                        <button
                          className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -mr-1 z-10"
                          onClick={() => onMinusCount(val.product)}
                        >
                          <Minus />
                        </button>
                        <input
                          className="appearance-none w-24 text-center border-t border-b border-l-0 border-r-0 border-gray-300 z-0 text-[20px] font-semibold leading-[1.3]"
                          value={val.count}
                          disabled
                        />
                        <button
                          className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -ml-1 z-10"
                          onClick={() => onPlusCount(val.product)}
                        >
                          <Plus />
                        </button>
                      </div>
                      <div className="flex xl:flex-row flex-col items-end gap-2">
                        <div className="heading-3">
                          $
                          {val.product.discont_price
                            ? val.product.discont_price
                            : val.product.price}
                        </div>
                        <div className="text-gray-500 2xl:text-[20px] text-[15px] font-medium leading-[1.3] line-through">
                          {val.product.discont_price
                            ? "$" + val.product.price
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="w-full xl:w-[548px] bg-gray-100 p-8 rounded-md"> */}
          <div className=" bg-gray-100 p-8 rounded-md  xl:w-[60%]">
            <p className="heading-3 mb-6">Order details</p>
            <p className="text-gray-400 text-[40px] font-medium leading-[1.3]">
              {curCart.reduce((akk, cur) => akk + cur.count, 0)} items
            </p>
            {kupon && (
              <p className="text-red-700">-5% off on the first order</p>
            )}
            <div className="flex flex-row justify-between items-end mb-4">
              <p className="text-gray-400 text-[40px] font-medium leading-[1.3]">
                Total
              </p>
              <p className="text-black xl:text-[64px] text-[34px] font-bold leading-[1.1]">
                $
                {(
                  curCart.reduce((akk, cur) => {
                    // let cur_price = cur.product.discont_price;
                    // if (!cur_price) cur_price = cur.product.price;
                    const cur_price =
                      cur.product.discont_price ?? cur.product.price; // Убедимся, что это число

                    akk = akk + cur.count * cur_price;
                    return akk;
                  }, 0) * (kupon ? 0.95 : 1)
                ).toFixed(2)}
              </p>
            </div>
            <OrderSendForm callback={sendOrder} />

            <div>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Congratulations!"
              >
                <div className="text-white">
                  <p>Your order has been successfully placed on the website.</p>
                  <p>
                    A manager will contact you shortly to confirm your order.
                  </p>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

```

## src\pages\Categories.tsx

```typescript
import CategotiesComponent from "@/components/product/CategoriesComponent";
import Breadcrumb from "@/components/common/Breadcrumb";


function Categories() {


  return (
    <div>
      <Breadcrumb />
      <h1 className="heading-2 mb-10">Categories</h1>

      <CategotiesComponent />
    </div>
  );
}

export default Categories;

```

## src\pages\Category.tsx

```typescript
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { useFetchProductsByCategorieId } from "@/lib/api";
import PreData from "@/components/common/PreData";
import Breadcrumb from "@/components/common/Breadcrumb";
import Products from "@/pages/Products";

function Categorie() {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  const { pathname } = useLocation();

  const catSlug = pathname.split("/").pop();
  const catId = slugs.find((val) => val.slug === catSlug)?.id;

  const { data, isLoading, error } = useFetchProductsByCategorieId(catId);

  if (!slugs.length) {
    return <div>Loading slugs...</div>;
  }

  if (isLoading) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  return (
    <>
      <Breadcrumb
        additionalBreadcrumb={[{ name: data.category.title, url: pathname }]}
      />
      <h1 className="heading-2 mb-10">{data.category.title}</h1>
      <Products dataStart={data.data} isIncludeHead={false} />
    </>
  );
}

export default Categorie;

```

## src\pages\Home.tsx

```typescript
import { useNavigate } from "react-router-dom";
import SectionDevider from "@/components/common/SectionDivider";
import Categoty from "@/components/product/CategoriesComponent";
import Products from "./Products";
import ContactForm from "@/components/common/ContactForm";

function Home() {
  const navigate = useNavigate();

  const goSales = () => {
    navigate("/sales");
  };

  return (
    <> 
      <section className="px-10 lg:py-20 py-2 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] bg-[url('/images/main-banner.png')] bg-cover bg-center">
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
      <Categoty limit={4} />

      <section className="px-8 pt-8 flex flex-col gap-6 bg-gradient-to-tr from-[#2451C6] to-[#0D50FF] mt-24">
        <div className="flex flex-row justify-center heading-2 text-white">
          5% off on the first order
        </div>

        <div className="pb-10 flex flex-row justify-end bg-[url('/images/first-order-banner.png')] bg-left-bottom bg-no-repeat">
          <ContactForm />
        </div>
      </section>

      <SectionDevider titleName="Sale" buttonName="All sales" url="/sales" />
      <Products
        limit={4}
        isIncludeHead={false}
        isSalesProducts={true}
        isIncludeFilters={false}
      />
    </>
  );
}

export default Home;

```

## src\pages\NotFound.tsx

```typescript
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <div className="text-center flex flex-col justify-center items-center mt-20 max-w-[664px]">
        <img
          src="/images/404.png"
          alt="Page Not Found"
          className="max-w-[600px]"
        />
        <h1 className="text-4xl font-bold text-txtBlack">Page Not Found</h1>
        <p className="text-lg text-gray-500">
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <button
          onClick={goHome}
          className="bg-blue-600 rounded-md text-whitetext-center text-[20px] font-semibold leading-[1.3] text-white w-52 py-4 mt-8"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;

```

## src\pages\ProductDetail.tsx

```typescript
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import PreData from "@/components/common/PreData";
import { useFetchProductById } from "@/lib/api";
import Breadcrumb from "@/components/common/Breadcrumb";
import { API_BASE_URL } from "@/config";
import { getPercent } from "@/lib/utils";
import Minus from "@/assets/icons/minus.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import ReadMore from "@/components/common/ReadMore";
import { useState } from "react";
import AddToCartButton from "@/components/product/AddToCartButton";

function ProductDetail() {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  const { pathname } = useLocation();
  const prodSlug = pathname.split("/").pop();

  const prod = slugs.find((val) => val.slug === prodSlug && val.catId > 0);
  const prodId = prod?.id;

  const catId = slugs.find((val) => val.id == prodId && val.catId > 0)?.catId;
  const category = slugs.find((val) => val.id == catId && val.catId == 0);

  const { data, isLoading, error } = useFetchProductById(prodId);

  // const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  function onChangeCount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (value) setCount(value);
  }

  function onPlusCount() {
    setCount((value) => value + 1);
  }
  function onMinusCount() {
    if (count > 1) setCount((value) => value - 1);
  }

  if (isLoading || !data) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  return (
    <div>
      <Breadcrumb
        additionalBreadcrumb={[
          { name: category?.title, url: "/categories/" + category?.slug },
          {
            name: prod?.title,
            url: "/categories/" + category?.slug + "/" + prod?.slug,
          },
        ]}
      />
      <div className="flex lg:flex-row flex-col gap-16">
        <div className="lg:w-1/2">
          <img
            src={API_BASE_URL + data.image}
            alt={data.title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col lg:w-1/2 gap-8">
          <h1 className="heading-2">{data.title}</h1>
          <div className="flex flex-row gap-8 items-end">
            <p className="2xl:text-[64px] text-[40px] font-bold leading-[1.1]">
              ${data.discont_price}
            </p>
            <p className="text-gray-500 2xl:text-[40px] text-[30px] font-medium leading-[1.3] line-through">
              ${data.price}
            </p>
            <div className="bg-blue-600 px-2 py-1 rounded-md self-start text-white text-[20px] font-semibold leading-[1.3] tracking-[0.6px]">
              -{getPercent(data.price, data.discont_price)}%
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex md:flex-row flex-col w-full gap-8 justify-center items-center">
              <div className="flex flex-row">
                <button
                  className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -mr-1 z-10"
                  onClick={onMinusCount}
                >
                  <Minus />
                </button>
                <input
                  className="appearance-none w-24 text-center border-t border-b border-l-0 border-r-0 border-gray-300 z-0 text-[20px] font-semibold leading-[1.3]"
                  value={count}
                  onChange={(e) => onChangeCount(e)}
                />
                <button
                  className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -ml-1 z-10"
                  onClick={onPlusCount}
                >
                  <Plus />
                </button>
              </div>
              <AddToCartButton
                data={data}
                count={count}
                callbackFunc={() => setCount(1)}
                width="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[20px] font-semibold leading-[130%]">
              Description
            </h3>

            <ReadMore text={data.description} maxLength={400} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

```

## src\pages\Products.tsx

```typescript
import { useSetProducts } from "@/lib/api";
import PreData from "@/components/common/PreData";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductsComponent from "@/components/product/ProductsComponent";
import { useState, useEffect } from "react";
import { Product } from "@/lib/api";
import { useSearchParams } from "react-router-dom";



type ProductsComponentProps = {
  isIncludeHead?: boolean;
  limit?: number;
  isSalesProducts?: boolean;
  isIncludeFilters?: boolean;
  dataStart?: Product[];
};

function Products({
  isIncludeHead = true,
  limit = 0,
  isSalesProducts = false,
  isIncludeFilters = true,
  dataStart,
}: ProductsComponentProps) {
  const { data: newData, isLoading, error, isFetched } = useSetProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  let data: Product[] = [];
  if (dataStart?.length) data = dataStart;
  else data = newData || [];



  

  // const [priceFrom, setPriceFrom] = useState<number | "">("");
  // const [priceTo, setPriceTo] = useState<number | "">("");
  // const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  // const [sortOption, setSortOption] = useState<string>("default");

  // Извлекаем значения из URL при монтировании
  const initialPriceFrom = searchParams.get("priceFrom");
  const initialPriceTo = searchParams.get("priceTo");
  const initialOnlyDiscounted = searchParams.get("onlyDiscounted") === "true";
  const initialSortOption = searchParams.get("sort") || "default";

  const [priceFrom, setPriceFrom] = useState<number | "">(
    initialPriceFrom ? parseFloat(initialPriceFrom) : ""
  );
  const [priceTo, setPriceTo] = useState<number | "">(
    initialPriceTo ? parseFloat(initialPriceTo) : ""
  );
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(initialOnlyDiscounted);
  const [sortOption, setSortOption] = useState<string>(initialSortOption);

  // Обновляем URL при изменении фильтров
  useEffect(() => {
    const params: Record<string, string> = {};

    if (priceFrom !== "") params.priceFrom = String(priceFrom);
    if (priceTo !== "") params.priceTo = String(priceTo);
    if (onlyDiscounted) params.onlyDiscounted = String(onlyDiscounted);
    if (sortOption !== "default") params.sort = sortOption;

    setSearchParams(params);
  }, [priceFrom, priceTo, onlyDiscounted, sortOption, setSearchParams]);

  if (isLoading || !isFetched) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  let filteredProducts = data;

  // if (isSalesProducts) {
  //   setOnlyDiscounted(true);
  //   filteredProducts = filteredProducts.filter((val) => val.discont_price > 0);
  // }

  if (onlyDiscounted || isSalesProducts) {
    filteredProducts = filteredProducts.filter(
      (product) => product.discont_price > 0
    );
  }
  if (limit > 0) filteredProducts = filteredProducts.slice(0, limit);

  if (priceFrom !== "") {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.discont_price || product.price;
      return price >= (priceFrom as number);
    });
  }

  if (priceTo !== "") {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.discont_price || product.price;
      return price <= (priceTo as number);
    });
  }

  //filteredProducts = [...filteredProducts];

  switch (sortOption) {
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case "price-asc":
      filteredProducts.sort(
        (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price)
      );
      break;
    case "price-desc":
      filteredProducts.sort(
        (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price)
      );
      break;
    case "discount-asc":
      filteredProducts.sort((a, b) => {
        const aDiscount = a.discont_price ? a.price - a.discont_price : 0;
        const bDiscount = b.discont_price ? b.price - b.discont_price : 0;
        return aDiscount - bDiscount;
      });
      break;
    case "discount-desc":
      filteredProducts.sort((a, b) => {
        const aDiscount = a.discont_price ? a.price - a.discont_price : 0;
        const bDiscount = b.discont_price ? b.price - b.discont_price : 0;
        return bDiscount - aDiscount;
      });
      break;
  }

  return (
    <>
      {isIncludeHead && (
        <>
          <Breadcrumb
            additionalBreadcrumb={[{ name: "All products", url: "/products" }]}
          />
          <h1 className="heading-2 mb-10">All products</h1>
        </>
      )}
      {isIncludeFilters && (
        <div className="flex md:flex-row flex-col mb-10 lg:gap-10 gap-2">
          <div className="flex flex-row lg:gap-4 gap-1 items-center">
            <p className="lg:text-[20px] font-semibold leading-[1.3]">Price</p>
            <input
              className="lg:w-28 w-16 border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="from"
              value={priceFrom}
              onChange={(e) =>
                setPriceFrom(e.target.value ? parseFloat(e.target.value) : "")
              }
            />
            <input
              className="lg:w-28 w-14 border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="to"
              value={priceTo}
              onChange={(e) =>
                setPriceTo(e.target.value ? parseFloat(e.target.value) : "")
              }
            />
          </div>
          {!isSalesProducts && (
            <div className="flex flex-row gap-4 items-center">
              <p className="lg:text-[20px] font-semibold leading-[1.3]">
                Discounted items
              </p>
              <input
                type="checkbox"
                name=""
                id=""
                className="w-8 h-8"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
              />
            </div>
          )}

          <div className="flex flex-row gap-4 items-center">
            <p className="lg:text-[20px] font-semibold leading-[1.3]">Sorted</p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="lg:w-52 w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              {/* <option value="discount-asc">Discount: Low to High</option>
              <option value="discount-desc">Discount: High to Low</option> */}
            </select>
          </div>
        </div>
      )}
      <ProductsComponent products={filteredProducts} />
    </>
  );
}

export default Products;

```

## src\pages\Sales.tsx

```typescript
import Products from "./Products";
import Breadcrumb from "@/components/common/Breadcrumb";

function Sales() {
  return (
    <>
      <Breadcrumb
        additionalBreadcrumb={[{ name: "All sales", url: "/sales" }]}
      />
      <h1 className="heading-2 mb-10">Discounted items</h1>
      <Products
        limit={0}
        isIncludeHead={false}
        isSalesProducts={true}
        isIncludeFilters={true}
      />
    </>
  );
}

export default Sales;

```

## src\redux\cartSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/api";

type ProductPosition = {
  product: Product;
  count: number;
};

type CartState = {
  cartPositions: ProductPosition[];
};

// Загружаем сохранённое состояние из localStorage
const savedCart = localStorage.getItem("cartPositions");
const persistedCart = savedCart ? JSON.parse(savedCart) : [];

const initialState: CartState = {
  cartPositions: persistedCart,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductPosition>) {
      const curElement = state.cartPositions.find(
        (val) => val.product.id === action.payload.product.id
      );
      if (curElement) {
        if (curElement.count + action.payload.count > 0)
          curElement.count += action.payload.count;
      } else {
        state.cartPositions.push(action.payload);
      }
    },
    delProduct(state, action: PayloadAction<number>) {
      state.cartPositions = state.cartPositions.filter(
        (val) => val.product.id !== action.payload
      );
    },
    resetCart(state) {
      state.cartPositions = [];
    },
  },
});

export const { addProduct, delProduct, resetCart } = CartSlice.actions;
export default CartSlice.reducer;

```

## src\redux\slugsSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Slug = {
  id: number;
  slug: string;
  title: string;
  catId: number;
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
      if (!state.slugs.some((slug) => slug.slug === action.payload.slug))
        state.slugs.push(action.payload);
    },
    addSlugs(state, action: PayloadAction<Slug[]>) {
      //if (!state.slugs.some((slug) => slug.slug === action.payload.slug))
      state.slugs = action.payload;
    },
  },
});

export const { addSlug, addSlugs } = slugsSlice.actions;
export default slugsSlice.reducer;

```

## src\redux\store.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/userSlice";
import slugsReduser from "@/redux/slugsSlice";
import cartReduser from "@/redux/cartSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    slugs: slugsReduser,
    cart: cartReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  const state = store.getState();
  const cartPositions = state.cart.cartPositions;
  localStorage.setItem("cartPositions", JSON.stringify(cartPositions));
});
```

## src\redux\userSlice.ts

```typescript
// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  phone: string;
  email: string;
  kupon: boolean;
  loggedIn: boolean;
};

const initialState: UserState = {
  name: "",
  phone: "",
  email: "",
  kupon: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.kupon = action.payload.kupon;
      state.loggedIn = true;
    },
    logout(state) {
      state.name = "";
      state.loggedIn = false;
    },
    closeKupon(state) {
      state.kupon = false;
    },
  },
});

export const { login, logout, closeKupon } = userSlice.actions;
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

