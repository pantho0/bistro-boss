import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <SectionTitle subHeading="What's New" heading="Add An Item" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Please select a category
            </option>
            <option value="salad">Salad</option>
            <option value="salad">Salad</option>
            <option value="soup">Soup</option>
            <option value="dessert">Dessert</option>
            <option value="drinks">Drinks</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
