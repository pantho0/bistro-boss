import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks /useAuth";
import useAxiosSecure from "../../../Hooks /useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle
        heading="Payment History"
        subHeading="Track your purchase item status"
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction_ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
                payments.map((payment, idx) =><tr key={payment._id}>
                    <th>{idx+1}</th>
                    <td>{payment.price}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.status}</td>
                  </tr> )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
