import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRoleLoading(false);
      return;
    }

    fetch(`https://scholarstream-server-alpha.vercel.app/users/${user.email}/role`) 
      .then((res) => res.json())
      .then((data) => {
        setRole(data?.role || "Student");
        setRoleLoading(false);
      })
      .catch((err) => {
        console.error("Role fetch error:", err);
        setRole("Student");
        setRoleLoading(false);
      });
  }, [user?.email]);

  return { role, roleLoading };
};

export default useRole;