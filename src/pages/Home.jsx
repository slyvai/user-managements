import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchUsers, deleteUser, createUser } from '../services/apiServices';
import { formSchema } from '../utils/formValidation';


const Home = () => {
  const [users, setUsers] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [search, setSearch] = useState('')

  const handleFetch = async () => {
    const response = await fetchUsers();
    setUsers(response);
  };

  const handleCreate = async (values) => {
    const response = await createUser(values);
    setUsers([...users, response]);
    setPopUp(false);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const openPopUp = () => {
    setPopUp(true);
  };
  const closePopUp = () => {
    setPopUp(false);
  };

  const filteringUser = users.filter (user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div>
        <input type="text" placeholder='Search Here!' value={search} onChange={(e) => setSearch(e.target.value)} className='search-bar' style={{padding : '10px', width: '20%', borderRadius: '5px', fontSize: '17px'}}/>
      <div className='table-container'>
      
      <button onClick={openPopUp} className='button-add'>+ Add Member</button>
      <table>
        <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
        </thead>
          <tbody>
                {filteringUser.map((user) => (
                    <tr key={user.id} className='table'>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className='action'> <Link to={`/${user.id}`}>Edit</Link> <button onClick={() => handleDelete(user.id)} className='button-delete'>Delete</button> </td>
                    </tr>
                ))}
        </tbody>
        </table>
        </div>

    <Formik
      initialValues={{ name: '', email: '', role: '' }}
      onSubmit={handleCreate}
      validationSchema={formSchema}
      
      >
      {()=> (
      <div style={{ display: popUp ? 'block' : 'none' }}  className={'modal-overlay'}>
      <div className='container-form'>
        <Form>
        <h1>Add New Team Member</h1> 
          <div>
          <label>Name:</label> <br />
          <Field style={{width: "60%", padding: "10px"}}type="text" name="name" placeholder="Name"/> 
          <ErrorMessage name='name' component={'div'} style={{color: 'red'}}/>
          </div>
          <div>
          <label>Email:</label> <br />
          <Field style={{width: "60%", padding: "10px"}} type="email" name="email" placeholder="Email" /> 
          <ErrorMessage name='email' component={'div'} style={{color: 'red'}}/>
          </div>
          <div>
          <label>Role:</label> <br />
          <Field style={{width: "60%", padding: "10px"}} type="text" name="role" placeholder="Role" /> 
          <ErrorMessage name='role' component={'div'} style={{color: 'red'}}/>
          </div>
          <div className='button-modal'>
        <button type="submit">Create</button>
        <button type='button' onClick={closePopUp}>Cancel</button>
        </div>
        </Form>
        </div>
      </div>
      )}
      </Formik>
    </div>
  );
};

export default Home;
