import { useCallback } from "react";
import { SwatchesPicker } from "react-color";
import { useRecoilState } from "recoil";
import { shapeWithID, activeID } from "../state/global";
import ColorPicker from "./ColorPicker";

export default (props) => {
  const [id] = useRecoilState(activeID);
  const [position, setPosition] = useRecoilState(shapeWithID(id));
  const onChange = useCallback(
    (color) => {
      setPosition((prev) => ({ ...prev, backgroundColor: color }));
    },
    [position]
  );
  return <ColorPicker color={position.backgroundColor} onChange={onChange} />;
};
