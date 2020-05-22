import SquareInfo from "./SquareInfo";

const Sidebar = ({ items }) => {
  return items.map((item, index) => {
    return <SquareInfo key={item.id} id={item.id} />;
  });
};

export default Sidebar;
