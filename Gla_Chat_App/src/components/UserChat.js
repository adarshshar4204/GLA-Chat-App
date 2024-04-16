import { useEffect, useState } from "react";
import supabase from "../config/Supabase";
import moment from "moment";
import GlaCampus from "../assets/GlaCampus.jpg";
function UserChat({ activeConverstion, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchConversation = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversationId", activeConverstion.id);
      if (error) throw error;
      // console.log(data);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (!activeConverstion) return;
    fetchConversation();

    const channelName = `chat_${activeConverstion.id}`;

    const subscription = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversationId=eq.${activeConverstion.id}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          setMessages((prevMessages) => [...prevMessages, payload.new]);
          // location.reload()
        },
      )
      .subscribe();

    return () => {
      // supabase.removeChannel(channelName);
      subscription.unsubscribe();
    };
  }, [activeConverstion]);

  const handleSend = () => {
    if (message) {
      supabase
        .from("messages")
        .insert({
          content: message,
          senderRollNo: activeConverstion.recieverUser.university_roll_no,
          conversationId: activeConverstion.id,
        })
        .select("*")
        .then((data) => {
          if (data.error) {
            alert(data.error.message);
          } else {
            setMessage("");
          }
        });
    }
  };

  if (!activeConverstion) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "70%",
          position:'relative',
        }}>
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
      <div style={{color:'#006400',zIndex: 1,fontSize:'25px',
      fontFamily:'cursive',
      textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: '10px'
      }}>
        <h1>Select User To Start conversation</h1>
      </div>
      </div>
    );
  }

  return (
    <>
      <div className="rightside" style={rightSideStyle}>
        <div className="header" style={headerStyle}>
          <div className="imgText">
            <div className="userimg" style={userImgStyle}>
              <img
                src={`https://ui-avatars.com/api/?name=${activeConverstion?.recieverUser?.Name}`}
                alt="pic"
                style={userImgStyle}
                className="cover"
              />
            </div>
            <h4>{activeConverstion?.recieverUser?.Name}</h4>
          </div>
        </div>
        {/* <!-- CHAT-BOX --> */}
        <div className="chatbox">
          <div className="msgs">
          {messages?.map((message, index) => (
            <div
              className={`message ${message.senderRollNo !== user.university_roll_no ? "my_msg" : "friend_msg"}`}
              key={index}
            >
              <p style={{margin:'1px',}}>
                {message.content} <br />
                <span>{moment(message.created_at).format("hh:mm a")}</span>
              </p>
            </div>  
          ))}
          </div>
          {/* <!-- CHAT_INPUT --> */}
          
        </div>
        <div className="chat_input">
            <ion-icon name="happy-outline"></ion-icon>
            <ion-icon name="document-outline"></ion-icon>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message"
            />
            <span onClick={handleSend}>
              <ion-icon name="send-outline"></ion-icon>
            </span>
          </div>
      </div>
    </>
  );
}
export default UserChat;

const rightSideStyle = {
  position: "relative",
  flex: "70%",
  background: "#e5ddd",
  height: "100%",
  width: "100%",
};
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
const userImgStyle = {
  position: "relative",
  width: "40px",
  height: "40px",
  overflow: "hidden",
  borderRadius: "50%",
  cursor: "pointer",
};
