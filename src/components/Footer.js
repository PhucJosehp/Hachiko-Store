import React from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/20/solid";

const Footer = () => {
  return (
    <footer className="relative bottom-0 bg-gray-900 text-gray-400 pt-8">
      <div className="container mx-auto text-center pb-6">
        <p className="text-lg text-white">
          Get connected with us on social networks:
        </p>
      </div>

      <div className="container mx-auto flex justify-between gap-8 text-left px-4 md:px-0 pb-10">
        <div className="w-3/4">
          <h5 className="uppercase text-white mb-4">Company Name</h5>
          <p>
            Here you can use rows and columns to organize your footer content.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>

        <div className="w-1/4">
          <h5 className="uppercase text-white mb-4">Contact</h5>
          <ul className="space-y-2">
            <li className="flex gap-2 items-center">
              <MapPinIcon className="size-5" />
              <span className="block">New York, NY 10012, US</span>
            </li>

            <li className="flex gap-2 items-center">
              <EnvelopeIcon className="size-5" />
              <span className="block">info@example.com</span>
            </li>

            <li className="flex gap-2 items-center">
              <PhoneIcon className="size-5" />
              <span className="block">+01 234 567 88</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 py-4">
        <div className="container mx-auto text-center text-gray-500">
          &copy; 2024 Copyright: Hachiko.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
