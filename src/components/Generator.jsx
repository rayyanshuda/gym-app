import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/workout-plan";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const {
    muscles,
    setMuscles,
    poison,
    setPoison,
    goal,
    setGoal,
    updateWorkout,
  } = props;
  const [showModal, setShowModal] = useState(false);

  //let showModal = false;

  function toggleModal() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false); // close modal
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false); // close modal
    }
  }

  return (
    <SectionWrapper
      id={"generate"}
      header={"Generate Your Workout"}
      title={["It's", "Huge", " o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick Your Poison"}
        description={"Pick a workout."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscles([]); // clear muscles
                setPoison(type);
              }}
              className={
                "bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg cursor-pointer hover:cursor-pointer" +
                (type === poison
                  ? " border-blue-600 border-2"
                  : "border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on Targets"}
        description={"Select the muscles you want to train."}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative p-3 flex items-center justify-center cursor-pointer hover:cursor-pointer"
        >
          <p className="capitalize">
            {muscles.length == 0 ? "Select muscle groups" : muscles.join(" ")}
          </p>
          <i
            className={`fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down duration-400 ${
              showModal ? "rotate-90" : "rotate-0"
            }`} //rotating the caret icon when clicked
          ></i>
        </button>
        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  key={muscleGroupIndex}
                  className={
                    "hover:text-blue-400 duration-200 hover:cursor-pointer" +
                    (muscles.includes(muscleGroup) ? " text-blue-400" : " ")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Determine your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoal(scheme);
              }}
              className={
                "bg-slate-950 border duration-200 hover:border-blue-600 py-3 rounded-lg px-4 cursor-pointer hover:cursor-pointer" +
                (scheme === goal
                  ? " border-blue-600 border-2"
                  : "border-blue-400")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button func={updateWorkout} text={"Formulate Workout"}></Button>
    </SectionWrapper>
  );
}
