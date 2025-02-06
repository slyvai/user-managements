

export const fetchUsers = async () => {
  const response = await fetch('http://localhost:3000/users');
  const data = await response.json();
  return data;
};

export const fetchUser = async (id) => {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  const data = await response.json();
  return data;
}

export const editUser = async (id, updatedUser) => {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};

export const createUser = async (newUser) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  return data;
};

export default { fetchUsers, fetchUser, editUser, deleteUser, createUser };