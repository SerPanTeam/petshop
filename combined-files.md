# Структура проекта

```plaintext
├── dist
│   ├── assets
│   │   ├── index-B-wHMxLf.css
│   │   └── index-DHVWmsS0.js
│   ├── images
│   │   ├── main-banner.png
│   │   └── map.png
│   ├── .htaccess
│   └── index.html
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
│   │   │   └── dropdown-menu.tsx
│   │   ├── Categoty.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── SectionDevider.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── pages
│   │   ├── Cart.tsx
│   │   ├── Categories.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   └── Sales.tsx
│   ├── types
│   │   └── svg.d.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── codewr.js
├── combined-files.md
├── components.json
├── eslint.config.js
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

## dist\assets\index-B-wHMxLf.css

```css
*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Montserrat,sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:root{--background: 0 0% 100%;--foreground: 240 10% 3.9%;--card: 0 0% 100%;--card-foreground: 240 10% 3.9%;--popover: 0 0% 100%;--popover-foreground: 240 10% 3.9%;--primary: 240 5.9% 10%;--primary-foreground: 0 0% 98%;--secondary: 240 4.8% 95.9%;--secondary-foreground: 240 5.9% 10%;--muted: 240 4.8% 95.9%;--muted-foreground: 240 3.8% 46.1%;--accent: 240 4.8% 95.9%;--accent-foreground: 240 5.9% 10%;--destructive: 0 84.2% 60.2%;--destructive-foreground: 0 0% 98%;--border: 240 5.9% 90%;--input: 240 5.9% 90%;--ring: 240 10% 3.9%;--chart-1: 12 76% 61%;--chart-2: 173 58% 39%;--chart-3: 197 37% 24%;--chart-4: 43 74% 66%;--chart-5: 27 87% 67%;--radius: .5rem}*{border-color:hsl(var(--border))}body{background-color:hsl(var(--background));color:hsl(var(--foreground))}.container{width:100%;margin-right:auto;margin-left:auto;padding-right:1rem;padding-left:1rem}@media (min-width: 100%){.container{max-width:100%}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px;padding-right:2rem;padding-left:2rem}}@media (min-width: 1440px){.container{max-width:1440px;padding-right:0rem;padding-left:0rem}}.heading-2{font-size:64px;font-weight:700;line-height:110%;color:var(--txt-black, #282828)}.heading-3{font-weight:600;line-height:110%;color:var(--txt-black, #282828);font-size:30px}@media (min-width: 1280px){.heading-3{font-size:40px}}.text-small-grey{font-size:20px;font-weight:500;line-height:130%;--tw-text-opacity: 1;color:rgb(139 139 139 / var(--tw-text-opacity, 1))}.absolute{position:absolute}.relative{position:relative}.left-2{left:.5rem}.z-50{z-index:50}.-mx-1{margin-left:-.25rem;margin-right:-.25rem}.my-1{margin-top:.25rem;margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.ml-8{margin-left:2rem}.ml-auto{margin-left:auto}.mt-10{margin-top:2.5rem}.mt-20{margin-top:5rem}.mt-4{margin-top:1rem}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-2{height:.5rem}.h-3\.5{height:.875rem}.h-4{height:1rem}.h-\[1px\]{height:1px}.h-\[200px\]{height:200px}.h-full{height:100%}.h-px{height:1px}.min-h-screen{min-height:100vh}.w-2{width:.5rem}.w-3\.5{width:.875rem}.w-4{width:1rem}.w-48{width:12rem}.w-full{width:100%}.min-w-\[8rem\]{min-width:8rem}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-default{cursor:default}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-2{gap:.5rem}.gap-4{gap:1rem}.gap-8{gap:2rem}.overflow-hidden{overflow:hidden}.text-nowrap{text-wrap:nowrap}.rounded-md{border-radius:calc(var(--radius) - 2px)}.rounded-sm{border-radius:calc(var(--radius) - 4px)}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-solid{border-style:solid}.border-slate-300{--tw-border-opacity: 1;border-color:rgb(203 213 225 / var(--tw-border-opacity, 1))}.bg-bgGrey{--tw-bg-opacity: 1;background-color:rgb(241 243 244 / var(--tw-bg-opacity, 1))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-muted{background-color:hsl(var(--muted))}.bg-popover{background-color:hsl(var(--popover))}.bg-slate-300{--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-\[url\(\'\/images\/main-banner\.png\'\)\]{background-image:url(/images/main-banner.png)}.bg-cover{background-size:cover}.bg-center{background-position:center}.fill-current{fill:currentColor}.p-1{padding:.25rem}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.px-12{padding-left:3rem;padding-right:3rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.py-8{padding-top:2rem;padding-bottom:2rem}.pl-8{padding-left:2rem}.pr-2{padding-right:.5rem}.text-center{text-align:center}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-\[16px\]{font-size:16px}.text-\[20px\]{font-size:20px}.text-\[32px\]{font-size:32px}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.leading-\[110\%\]{line-height:110%}.leading-\[130\%\]{line-height:130%}.tracking-widest{letter-spacing:.1em}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-hoverBlue{--tw-text-opacity: 1;color:rgb(13 80 255 / var(--tw-text-opacity, 1))}.text-popover-foreground{color:hsl(var(--popover-foreground))}.text-txtBlack{color:var(--txt-black, #282828)}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.opacity-60{opacity:.6}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300{transition-duration:.3s}@keyframes enter{0%{opacity:var(--tw-enter-opacity, 1);transform:translate3d(var(--tw-enter-translate-x, 0),var(--tw-enter-translate-y, 0),0) scale3d(var(--tw-enter-scale, 1),var(--tw-enter-scale, 1),var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity, 1);transform:translate3d(var(--tw-exit-translate-x, 0),var(--tw-exit-translate-y, 0),0) scale3d(var(--tw-exit-scale, 1),var(--tw-exit-scale, 1),var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))}}.duration-300{animation-duration:.3s}.hover\:rotate-12:hover{--tw-rotate: 12deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\:rotate-45:hover{--tw-rotate: 45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\:scale-125:hover{--tw-scale-x: 1.25;--tw-scale-y: 1.25;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\:text-hoverBlue:hover{--tw-text-opacity: 1;color:rgb(13 80 255 / var(--tw-text-opacity, 1))}.hover\:underline:hover{text-decoration-line:underline}.hover\:brightness-125:hover{--tw-brightness: brightness(1.25);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\:bg-accent:focus{background-color:hsl(var(--accent))}.focus\:text-accent-foreground:focus{color:hsl(var(--accent-foreground))}.data-\[disabled\]\:pointer-events-none[data-disabled]{pointer-events:none}.data-\[state\=open\]\:bg-accent[data-state=open]{background-color:hsl(var(--accent))}.data-\[disabled\]\:opacity-50[data-disabled]{opacity:.5}.data-\[state\=open\]\:animate-in[data-state=open]{animation-name:enter;animation-duration:.15s;--tw-enter-opacity: initial;--tw-enter-scale: initial;--tw-enter-rotate: initial;--tw-enter-translate-x: initial;--tw-enter-translate-y: initial}.data-\[state\=closed\]\:animate-out[data-state=closed]{animation-name:exit;animation-duration:.15s;--tw-exit-opacity: initial;--tw-exit-scale: initial;--tw-exit-rotate: initial;--tw-exit-translate-x: initial;--tw-exit-translate-y: initial}.data-\[state\=closed\]\:fade-out-0[data-state=closed]{--tw-exit-opacity: 0}.data-\[state\=open\]\:fade-in-0[data-state=open]{--tw-enter-opacity: 0}.data-\[state\=closed\]\:zoom-out-95[data-state=closed]{--tw-exit-scale: .95}.data-\[state\=open\]\:zoom-in-95[data-state=open]{--tw-enter-scale: .95}.data-\[side\=bottom\]\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y: -.5rem}.data-\[side\=left\]\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x: .5rem}.data-\[side\=right\]\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x: -.5rem}.data-\[side\=top\]\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y: .5rem}@media (min-width: 640px){.sm\:h-\[300px\]{height:300px}.sm\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width: 768px){.md\:block{display:block}.md\:hidden{display:none}.md\:h-\[400px\]{height:400px}.md\:text-\[56px\]{font-size:56px}}@media (min-width: 1024px){.lg\:mb-10{margin-bottom:2.5rem}.lg\:h-\[58px\]{height:58px}.lg\:h-\[600px\]{height:600px}.lg\:w-\[218px\]{width:218px}.lg\:w-\[548px\]{width:548px}.lg\:min-w-\[240px\]{min-width:240px}.lg\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\:flex-row{flex-direction:row}.lg\:px-10{padding-left:2.5rem;padding-right:2.5rem}.lg\:py-20{padding-top:5rem;padding-bottom:5rem}.lg\:text-\[96px\]{font-size:96px}}.\[\&\>svg\]\:size-4>svg{width:1rem;height:1rem}.\[\&\>svg\]\:shrink-0>svg{flex-shrink:0}.\[\&_svg\]\:pointer-events-none svg{pointer-events:none}.\[\&_svg\]\:size-4 svg{width:1rem;height:1rem}.\[\&_svg\]\:shrink-0 svg{flex-shrink:0}

```

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

function App() {
  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
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

## src\components\Categoty.tsx

```typescript
import { useQuery } from "@tanstack/react-query";

// Тип данных
type Category = {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

// Функция для загрузки данных
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    "https://pet-shop-backend.fly.dev/categories/all"
  );
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export default function Category() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"], // Уникальный ключ для запроса
    queryFn: fetchCategories, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No categories available.</p>;

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((category) => (
        <div key={category.id} className="flex flex-col justify-center">
          <img
            src={`https://pet-shop-backend.fly.dev${category.image}`}
            alt={category.title}
          />
          <h3 className="text-center">{category.title}</h3>
        </div>
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
    <footer className="px-2 lg:px-10">
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
    <header className="flex flex-row justify-between items-center px-2 lg:px-10 py-6">
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
        <Cart className="transform transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:brightness-125" />
      </Link>

      {/* Гамбургер меню для маленьких экранов */}
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden">
          <Menu size={52} />
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
      <div className="ml-8 h-[1px] w-full bg-slate-300"></div>
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
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
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
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

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
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

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
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
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
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

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
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

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
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
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
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

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
}

```

## src\index.css

```css
@layer components {
  .heading-2 {
    @apply text-txtBlack text-[64px] font-bold leading-[110%];
  }
  .heading-3 {
    @apply text-txtBlack font-semibold leading-[110%];
    @apply xl:text-[40px] text-[30px]; /* Размер шрифта 40px */
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

## src\lib\utils.ts

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
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

## src\pages\Categories.tsx

```typescript

function Categories() {
  return (
    <div>Categories</div>
  )
}

export default Categories
```

## src\pages\Home.tsx

```typescript
import { useNavigate } from "react-router-dom";
import SectionDevider from "../components/SectionDevider";
import Categoty from "../components/Categoty";
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
      <Categoty />
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
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import svgr from 'vite-plugin-svgr';

// export default defineConfig({
//   plugins: [
//     react(),
//     svgr(), // Для экспорта ReactComponent
//   ],
// });

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
    <title>Vite + React + TS</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

