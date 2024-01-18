import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Cover from "../../Shared/Cover/Cover";
import MenuItems from "../../Shared/MenuItems/MenuItems";

const MenuCategory = ({ items, title, img, subHeading, heading }) => {
  return (
    <>
      {title && <Cover img={img} title={title} />}
      <div className="my-14">
        {heading && <SectionTitle subHeading={subHeading} heading={heading} />}
        <div className="grid md:grid-cols-2 gap-10">
          {items.map((item) => (
            <MenuItems key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuCategory;
