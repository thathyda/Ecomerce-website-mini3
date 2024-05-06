import React from "react";

function AboutUs() {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Welcome to GlowBloom, your ultimate destination for unlocking the secrets to radiant and healthy skin. Dive into a world of premium skincare products meticulously curated to elevate your beauty regimen and unveil your natural glow. Explore our extensive range of skincare essentials, carefully crafted to cater to every skin type and concern. Radiant beauty awaits.
            </p>
            <a href="/about" className="text-pink-400 hover:text-pink-600 font-medium">
              Learn more about us <span className="ml-2">&#8594;</span>
            </a>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src="https://cf.creatrip.com/original/blog/1813/a041sifel2pw3inycc7snd2cxw0s1mzk.jpg"
              alt="About Us Image"
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
