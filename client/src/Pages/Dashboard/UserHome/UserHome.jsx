// import useAuth from "../../../Hooks /useAuth";

import useAuth from "../../../Hooks/useAuth";


const UserHome = () => {
    const {user} = useAuthh()
    return (
        <div>
            <h2 className="text-3xl">
                <span>Welcome </span>
                {
                    user.displayName ? user?.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default UserHome;