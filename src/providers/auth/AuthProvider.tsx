import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }: { children: ReactNode})
{
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem("shopifyCustomerAccessToken");

        if(storedToken) 
            setToken(storedToken);
    }, [])



    function onLogin (newToken: string){
        setToken(newToken);
        localStorage.setItem('shopifyCustomerAccessToken', newToken);
    };

    
    function onLogout() {
        // Đặt tất cả logic dọn dẹp ở đây
        setToken(null);
        localStorage.removeItem('shopifyCustomerAccessToken');
        localStorage.removeItem('cartId');
        navigate('/login')
    };

    const value = { isLoggedIn: !!token, token, onLogin, onLogout};

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}
