import { NavLink } from "react-router-dom";
import GlaCampus from "../assets/GlaCampus.jpg";
import supabase from "../config/Supabase";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataNew = Object.fromEntries(formData.entries());
    try {
      const response = await supabase.auth.signInWithPassword(dataNew);

      if (response.error) throw response.error;

      if (response.data) {
        // console.log(response.data.user.user_metadata.university_roll_no)
        const { data: users, error } =  await supabase
          .from("users")
          .select("*")
          .eq(
            "university_roll_no",
            response.data.user.user_metadata.university_roll_no,
          );
        if (users.length > 0) {
          const combinedUserData = { ...users[0], ...response.data.user };
          localStorage.setItem("user", JSON.stringify(combinedUserData));
          navigate("user-space");
        } else {
          if (error) throw error;
          if (users.length === 0) {
            const newError = {
              message: "User not found",
              status: 404,
            };
            throw newError;
          }
        }
        if (error || users.length === 0) throw error;
      }
    } catch (error) {
      alert(error.message ?? error);
    }
  }

  return (
    <>  <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${GlaCampus})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(3px)",
          }}
        />
        
        <div className="form-box" style={formBoxStyle}>
          <h1 id="title" style={formBoxH1Style}>
            Welcome To Gla's own Chat App
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group" style={inputGroupStyle}>
              <div className="input-field" style={inputFieldStyle}>
                <i
                  className="fa-solid fa-envelope"
                  style={inputFiledIStyle}
                ></i>
                <input
                  type="email"
                  name="email"
                  style={inputFieldInputStyle}
                  placeholder="Email"
                />
              </div>

              <div className="input-field" style={inputFieldStyle}>
                <i className="fa-solid fa-lock" style={inputFiledIStyle}></i>
                <input
                  type="password"
                  name="password"
                  style={inputFieldInputStyle}
                  placeholder="Password"
                />
              </div>

              <p style={formPStyle}>
                {" "}
                Don't Have An Account{" "}
                <NavLink to={"SignUp"} style={formPAStyle}>
                  Click Here!
                </NavLink>
              </p>
            </div>
              <button
                type="submit"
                id="signinBtn"
                style={btnFieldButtonStyle}
                className="disable"
              >
                Sign in
              </button>
          </form>
        </div>
      
    </>
  );
}

export default LoginForm;


const formBoxStyle = {
  width: "90%",
  height:'',
  maxWidth: "450px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  background: "rgba(255,255,255,0.5)",
  padding: "50px 60px 70px",
  textAlign: "center",
  borderRadius: "20px",
  
};
const formBoxH1Style = {
  fontSize: "30px",
  marginBottom: "60px",
  color: "#006400",
  position: "relative",

};
const inputFieldStyle = {
  background: "rgba(255,255,255,0.5)",
  margin: "15px 0",
  borderRadius: "3px",
  display: "flex",
  alignItems: "center",
  maxHeight: "65px",
  width: "100%",
  transition: "max-height 0.5s",
  overflow: "hidden",
};
const inputFiledIStyle = {
  padding: "10px",
  color: "#999",
};
const formPStyle = {
  textAlign: "left",
  fontSize: "13px",
};
const formPAStyle = {
  textDecoration: "none",
  color: "#006400",
};
const btnFieldStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};
const btnFieldButtonStyle = {
  background: "#006400",
  color: "#fff",
  height: "50px",
  width: "100%",
  borderRadius: "20px",
  cursor: "pointer",
  textAlign: "center",
  padding: "auto",
  fontSize: "20px",
};
const inputGroupStyle = {
  height: "150px",
};
const inputFieldInputStyle = {
  width: "100%",
  padding: "2px",
  marginRight: "5px",
};
