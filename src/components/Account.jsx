const { useEffect } = require("react");
const { useNavigate } = require("react-router-dom")


const Account = ({ token }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    return (
        <div>
            <h2>Account</h2>
        </div>
    );
};

export default Account;