
import { useLocation,Navigate, Outlet } from "react-router-dom";
import UserAuth from "./UserAuth";

const RequireAuth = ()=>{
    const auth = UserAuth()

    const location = useLocation()
    return (
        <>
            {auth ? <Outlet/> : <Navigate to='/sign-in' state={{ form : location}} replace />}
        </>
    )
}

export default RequireAuth