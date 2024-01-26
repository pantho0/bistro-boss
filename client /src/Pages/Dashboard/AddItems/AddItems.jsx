import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data)
};
  return (
    <div>
      <SectionTitle subHeading="What's New" heading="Add An Item" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter Recipe Name Here"
              className="input input-bordered w-full"
              {...register("name")}
            />
          </label>

          <div className="flex gap-6 my-6">
            {/* Category goes here */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Select Category</span>
              </div>
              <select
                {...register("category")}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Please select a category
                </option>
                <option value="salad">Salad</option>
                <option value="salad">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>
            {/* Price goes here */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                placeholder="Enter Price Here"
                className="input input-bordered w-full"
                {...register("price")}
              />
            </label>
          </div>
          <label className="form-control my-6">
            <div className="label">
              <span className="label-text">Recipe Details * </span>
            </div>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </label>
          {/* Image upload section */}
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Pick a Image</span>
            </div>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered w-full"
            />
          </label>
          <button className="btn my-6">
            ADD ITEM <FaUtensils className="ml-6 " />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
