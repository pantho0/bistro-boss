import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateItem = () => {
  const {_id, name, recipe, price, category} = useLoaderData();
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      //save the recipe in the menu collection
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price),
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} added to menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionTitle heading="update item" subHeading="Edit the details" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            </div>
            <input
              type="text"
              defaultValue={name}
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
                defaultValue={category}
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
                defaultValue={price}
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
              defaultValue={recipe}
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
            Update Item <FaUtensils className="ml-6 " />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
