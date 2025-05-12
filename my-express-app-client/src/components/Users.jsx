import React, { use, useState } from "react";

const Users = ({ fetchpromise }) => {
  const initialUser = use(fetchpromise);
  const [users, setUsers] = useState(initialUser);
  const [editingUser, setEditingUser] = useState(null);

  //add user
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {
      name,
      email,
    };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        form.reset(); // ✅ Clear form
      });
  };

  //delete user
  const handleDeleteUser = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // If successful, update local state to remove user
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } else {
          // If deletion failed, show an alert with error message
          alert(data.message);
        }
      });
  };

  //update user
  const handleUpdateUser = (user) => {
    setEditingUser(user);
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      name: e.target.name.value,
      email: e.target.email.value,
    };
    fetch(`http://localhost:5000/users/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          {
            setUsers((prevUsers) =>
              prevUsers.map((u) => (u.id === editingUser.id ? data.user : u))
            );
            setEditingUser(null);
            e.target.reset(); //clear form
          }
        } else {
          alert(data.message);
        }
      });
  };
  return (
    <div>
      <p>Users={users.length}</p>
      <form onSubmit={handleAddUser}>
        <input name="name" type="text" placeholder="enter name" required/>
        <br />
        <input name="email" type="email" placeholder="enter email" required />
        <br />
        <button type="submit">Add User</button>
      </form>

      {users.map((user) => (
        <p key={user.id}>
          {user.name} : {user.email}
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          <button onClick={() => handleUpdateUser(user)}>Update</button>
        </p>
      ))}

      {editingUser && (
        <form onSubmit={handleUpdateSubmit}>
          <input type="text" name="name" placeholder="Update User Name" />
          <input type="email" name="email" placeholder="Update User Email" />
          <input type="submit" value="Update User" />
        </form>
      )}
    </div>
  );
};

export default Users;
