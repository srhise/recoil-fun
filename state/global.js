import { atom } from "recoil";
import { useMemo } from "react";

// To create a Property name from the arguments passed to the function
const constructPropertyFromArgs = function (fnToMemoize, args) {
  let propToCheck = [];
  propToCheck = propToCheck.concat(fnToMemoize.name, args);
  return propToCheck.join("|"); // A delimiter to join args
};

//  `memoize` function  decides if it has to return cached value or call the summation function
const memoize = function (fnToMemoize) {
  const memoizedCache = {}; // A closeure Object
  return function (...args) {
    const propToCheck = constructPropertyFromArgs(fnToMemoize, args);
    if (!memoizedCache[propToCheck]) {
      memoizedCache[propToCheck] = fnToMemoize(...args);
    } else {
      console.log("From Cache ");
    }
    return memoizedCache[propToCheck];
  };
};
// Have jake help me memoize this
export const shapeWithID = memoize((id) =>
  atom({
    key: `item${id}`,
    default: {
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0,
      width: 150,
      height: 150,
      backgroundColor: "bg-gray-100",
    },
  })
);
