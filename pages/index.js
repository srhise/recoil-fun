import Head from "next/head";
import { useState } from "react";
import { Square, Circle } from "react-feather";
import SquareShape from "../components/SquareShape";
import Sidebar from "../components/Sidebar";
/*  
Things to keep track of
xpos
ypos
label
shapeType
*/

export default function Home() {
  const [squares, setSquares] = useState([]);
  const addSquare = () => {
    setSquares([
      ...squares,
      {
        id: squares.length,
      },
    ]);
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="flex">
          <div className="menu w-64 bg-gray-300 h-screen">
            <div
              className="cursor-pointer text-blue-500 bg-white p-2 inline-flex rounded-sm shadow-sm m-1 hover:bg-gray-100"
              onClick={() => addSquare()}
            >
              <Square width={15} height={15} color="#444" />
            </div>
            <div
              className="cursor-pointer text-blue-500 bg-white p-2 inline-flex rounded-sm shadow-sm m-1 hover:bg-gray-100"
              onClick={() => console.log("add circle")}
            >
              <Circle width={15} height={15} color="#444" />
            </div>
            <Sidebar items={squares} />
          </div>
          <div className="flex-1">
            {squares.map((square, index) => {
              return (
                <SquareShape
                  key={square.id}
                  id={square.id}
                  height={square.height}
                  width={square.width}
                  backgroundColor={square.backgroundColor}
                ></SquareShape>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
