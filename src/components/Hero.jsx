import React from "react";
import Button from "./Button";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
      <div className="flex flex-col gap-4">
        <p>IT'S TIME TO GET</p>
        <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Jugger<span className="text-blue-400">naut</span>
        </h1>
      </div>

      <p className="text-sm md:text-base font-light">
        Built for{" "}
        <span className="text-blue-400 font-medium">
          beginners, lifters, and beasts alike
        </span>{" "}
        — this app helps you stay on track, crush your goals, and level up your
        training one set at a time.{" "}
        <span className="text-blue-400 font-medium">Let’s get started.</span>
      </p>

      <Button
        func={() => {
          window.location.href = "#generate";
        }}
        text={"Begin"}
      ></Button>
    </div>
  );
}
