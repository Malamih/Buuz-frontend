import MenuIcon from "@/assets/icons/menu.svg";
export const Sidebar = () => {
  return (
    <div className="z-101 relative">
      <div className="icon cursor-pointer">
        <MenuIcon />
      </div>
      <aside></aside>
    </div>
  );
};
