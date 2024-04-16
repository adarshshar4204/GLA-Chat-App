import AppImg from "../assets/pic.png";
import { useState, useEffect, useCallback } from "react";
import supabase from "../config/Supabase";
import { useNavigate } from "react-router-dom";

function UserSpace({ user, setRecieverUser, recieverUser}) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*").eq('Section',user.Section).neq('university_roll_no',user.university_roll_no);
        if (error) throw error;
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    if (users.length === 0) {
      fetchUsers();
    }
  }, [user, users]);

  const handleLogout = useCallback(async()=>{
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  },[]);

  return (
    <div className="leftside">
      {/* Header  */}
      <div className="header" style={headerStyle}>
        <div className="appImg">
          <img src={AppImg} alt="GLA" className="cover" style={appImgStyle} />
        </div>
        <ul className="nav_icon">
          <li>
            <button onClick={handleLogout} 
            style={{
              backgroundColor: 'lightgreen',
              borderRadius: '5px',
              height: '20px',
              width:'60px',
              cursor: "pointer",
            }}>Logout</button>
          </li>
        </ul>
      </div>

      <div className="chatlist">
        {users?.map(({ Name, Section, PhoneNo, university_roll_no }, index) => (
          <div
            onClick={() =>
              setRecieverUser({ Name, Section, PhoneNo, university_roll_no })
            }
            key={index} className="block active"
          >
            <div className="imgBox">
              <img className="imgBox" src={`https://ui-avatars.com/api/?name=${Name}`} />
            </div>
            <div className="details">
              <div className="listhead">
                <h4>{Name}</h4>
                  {/* You can add more user details here, like last message time */}
                </div>
                  {/* You can also include more user details or last message content */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UserSpace;

const headerStyle = {
  position: "relative",
  width: "100%",
  height: "10%",
  background: "#ededed",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 15px",
};
const appImgStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  objectFit: "fill",
};
