
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes("login")
    return (
        <div>
            {noHeaderFooter || <Navbar/>}
            <div className='max-w-screen-xl mx-auto'>
            <Outlet/>
            </div>
            
            {noHeaderFooter || <Footer/>}
        </div>
    );
};

export default Main;