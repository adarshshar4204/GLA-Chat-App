import { useEffect, useState } from "react";
import UserChat from "./UserChat";
import UserSpace from "./UserSpace";
import supabase from "../config/Supabase";

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const [recieverUser, setRecieverUser] = useState(null);
  const [activeConverstion, setActiveConverstion] = useState(null);

  useEffect(() => {
    if (recieverUser && user) {
      const fetchConversation = async () => {
        try {
          const { data, error } = await supabase
            .from("conversations")
            .select("*")
            .or(
              `userA.eq.${user.university_roll_no},userB.eq.${user.university_roll_no}`,
            )
            .or(
              `userA.eq.${recieverUser.university_roll_no},userB.eq.${recieverUser.university_roll_no}`,
            );
          if (error) throw error;

          const matchingConversation = data.find(
            (conversation) =>
              (conversation.userA === user.university_roll_no &&
                conversation.userB === recieverUser.university_roll_no) ||
              (conversation.userA === recieverUser.university_roll_no &&
                conversation.userB === user.university_roll_no),
          );
          // console.log(response.data);
          if (!matchingConversation) {
            const response = await supabase.from("conversations").insert({
              userA: user.university_roll_no,
              userB: recieverUser.university_roll_no,
            });
            if (response.error) throw response.error;
            // console.log("convoCreated", response);
            fetchConversation();
          } else {
            // console.log("convoFound", matchingConversation);
            setActiveConverstion({
              ...matchingConversation,
              recieverUser,
              user,
            });
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      // console.log(recieverUser);
      fetchConversation();
    }
  }, [recieverUser, user]);

  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <UserSpace
        recieverUser={recieverUser}
        setRecieverUser={setRecieverUser}
        user={user}
      />
      <UserChat activeConverstion={activeConverstion} user={user} />
    </div>
  );
};

export default DashBoard;
