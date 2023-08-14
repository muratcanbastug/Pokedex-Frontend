import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UserList from "../../components/UserList";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  removeUser,
  updateRole,
} from "../../services/UserService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllUsers(searchText).then((data) => {
      const newUsers = [];
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          let role;
          data[i].roles.length > 1 ? (role = "Admin") : (role = "Trainer");
          newUsers.push({
            id: data[i].id,
            name: data[i].name,
            role: role,
          });
        }
      }
      setUsers(newUsers);
    });
  }, [searchText]);

  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          direction: "column",
          backgroundColor: "lightgray",
        }}
      >
        <Box
          sx={{
            width: "40%",
          }}
        >
          <UserList
            rows={users}
            title="Users"
            setSearchText={setSearchText}
            removeMethod={removeUser}
            updateMethod={updateRole}
          />
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
