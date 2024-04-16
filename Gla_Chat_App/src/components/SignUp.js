import { useNavigate } from "react-router-dom";
import GlaCampus from "../assets/GlaCampus.jpg";
import supabase from "../config/Supabase";
import { useState } from "react";
function SignUp() {
  const navigate = useNavigate();
  const [university_roll_no, setUniversity_roll_no] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setUniversity_roll_no("");
    setPassword("");
    setEmail("");
    try {
      const response = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            university_roll_no: university_roll_no,
          },
        },
      });

      if (response.error) throw response.error;

      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      alert(error.message ?? error);
    }
  }

  return (
    <>
        <div
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
              <div
                className="input-field"
                id="nameField"
                style={inputFieldStyle}
              >
                <i className="fa-solid fa-user" style={inputFiledIStyle}></i>
                <input
                  type="integer"
                  name="university_roll_no"
                  style={inputFieldInputStyle}
                  placeholder="University Roll Number"
                  onChange={(e) => setUniversity_roll_no(e.target.value)}
                  value={university_roll_no}
                />
              </div>

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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="input-field" style={inputFieldStyle}>
                <i className="fa-solid fa-lock" style={inputFiledIStyle}></i>
                <input
                  type="password"
                  name="password"
                  style={inputFieldInputStyle}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            <button type="submit" id="signupBtn" style={btnFieldButtonStyle}>
              Sign up
            </button>
          </form>
        </div>
    </>
  );
}

export default SignUp;


const formBoxStyle = {
  width: "90%",
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
  color: "#999",
  padding: "10px",
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
  height: "170px",
};
const inputFieldInputStyle = {
  width: "100%",
  padding: "2px",
  marginRight: "5px",
};
