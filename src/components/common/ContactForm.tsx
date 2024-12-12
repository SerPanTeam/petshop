import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
// import { log } from "console";

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

  const [isAdded, setIsAdded] = useState(false);
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log("Form submitted:", data);
    reset(); // Reset all form fields
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   callbackFunc?.();

  //   setIsAdded(true);
  //   setTimeout(() => setIsAdded(false), 1000);
  // };

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
