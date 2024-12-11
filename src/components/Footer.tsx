import Instagram from "../assets/icons/instagram.svg?react";
import Whatsapp from "../assets/icons/whatsapp.svg?react";



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
