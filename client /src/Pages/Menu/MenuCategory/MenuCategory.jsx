import { Link } from "react-router-dom";
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
        <Link className="text-center" to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-2 border-b-gray-300">View All</button>
        </Link>
      </div>
    </>
  );
};

export default MenuCategory;
