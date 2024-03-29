import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
          <div className="absolute">
            <div className=" flex flex-col gap-4">
              <h1 className="my-2 text-base-content font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-2 text-base-content">
                Sorry about that! Please visit our hompage to get where you need to go.
              </p>
              <Link href="/" className="btn btn-primary">
                Take me there!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default NotFound;
