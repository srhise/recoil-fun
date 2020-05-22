import { useState } from "react";
import { useRecoilState } from "recoil";
import { shapeWithID, activeID } from "../state/global";

const SquareShape = (props) => {
  const [position, setPosition] = useRecoilState(shapeWithID(props.id));
  const [id, setActive] = useRecoilState(activeID);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    setActive(props.id);
    setPosition({
      ...position,
      originalX: clientX,
      originalY: clientY,
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
  const selectedClass = id === props.id ? "border-gray-100 border-dashed" : "";

  return (
    <div
      className={`transition-colors ease-in duration-100 cursor-pointer border-2 ${selectedClass}`}
      style={{
        width: `${position.width}px`,
        height: `${position.height}px`,
        transform: `translate(${position.translateX}px, ${position.translateY}px)`,
        cursor: "grab",
        backgroundColor: position.backgroundColor,
      }}
      onMouseDown={handleMouseDown}
    ></div>
  );
};

export default SquareShape;
