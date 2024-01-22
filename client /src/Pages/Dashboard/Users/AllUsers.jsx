import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks /useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });
  return (
    <>
      <div className="flex justify-evenly items-center text-3xl font-medium">
        <p>Total Users : {users.length} </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map(user =><tr key={user._id}>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>)
            }

          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
