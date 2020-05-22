import { useRecoilState } from "recoil";
import { shapeWithID } from "../state/global";

const SquareInfo = (props) => {
  const [position, setPosition] = useRecoilState(shapeWithID(props.id));
  return (
    <div className="flex flex-col my-3 p-2">
      <div className="w-8 text-sm">
        <div className="text-xs flex">
          <div className="mr-1">x:{position.translateX}</div>{" "}
          <div>y:{position.translateY}</div>
        </div>
        width:{" "}
        <input
          className="border-1 border-gray-600"
          type="number"
          value={position.width}
          onChange={(e) => setPosition({ ...position, width: e.target.value })}
        ></input>
      </div>
      <div className="w-8 text-sm">
        height:{" "}
        <input
          type="number"
          value={position.height}
          onChange={(e) => setPosition({ ...position, height: e.target.value })}
        ></input>
      </div>
    </div>
  );
};

export default SquareInfo;
