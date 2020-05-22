import { useState } from "react";
import { useRecoilState } from "recoil";
import { shapeWithID } from "../state/global";
const SquareShape = (props) => {
  const [position, setPosition] = useRecoilState(shapeWithID(props.id));

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    setPosition({
      ...position,
      originalX: clientX,
      originalY: clientY,
      selected: true,
    });
    setIsDragging(true);
  };

  const handleMouseMove = ({ clientX, clientY }) => {
    // since these are called from within event listeners you have to use a statee updater function to get the latest values WTF
    // https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
    setIsDragging((isDragging) => {
      if (!isDragging) return;
      setPosition((prevPosition) => ({
        ...prevPosition,
        translateX:
          clientX - prevPosition.originalX + prevPosition.lastTranslateX,
        translateY:
          clientY - prevPosition.originalY + prevPosition.lastTranslateY,
      }));
      return isDragging;
    });
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    setPosition((prevPosition) => ({
      ...prevPosition,
      originalX: 0,
      originalY: 0,
      lastTranslateX: prevPosition.translateX,
      lastTranslateY: prevPosition.translateY,
    }));
    setIsDragging(false);
  };
  const selectedClass = position.selected
    ? "border-purple-800"
    : "border-gray-100";

  return (
    <div
      className={`transition-colors ease-in duration-100  ${position.backgroundColor} cursor-pointer border-2 border-dashed ${selectedClass}`}
      style={{
        width: `${position.width}px`,
        height: `${position.height}px`,
        transform: `translate(${position.translateX}px, ${position.translateY}px)`,
        cursor: "grab",
      }}
      onMouseDown={handleMouseDown}
    ></div>
  );
};

export default SquareShape;
