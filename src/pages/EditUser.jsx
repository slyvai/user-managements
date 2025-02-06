import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, editUser} from '../services/apiServices';
import {formSchema} from '../utils/formValidation'
import {Formik, Form, Field, ErrorMessage} from 'formik'

function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({name: '', email: '', role: ''});
  const navigate = useNavigate();

  async function getUser() {
    const response = await fetchUser(userId);
    setUser(response);
    setEditedUser(response);
  }

  async function saveUser() {
   const response = await editUser(userId, editedUser);
    console.log(response);
    setUser(response);
    navigate('/');
  }

  const handleCancel = () => {
    navigate('/');
  }

  useEffect(() => {
    getUser();
  }, [userId]);

  

  return (
    <>
 
      {user && (
        <>
            <>
            <div className='container-edit'>
            <Formik
            initialValues={{ name: user.name, email: user.email, role: user.role }}
            onSubmit={saveUser}
            validationSchema={formSchema}
            enableReinitialize 
            >
              <Form>
              <h2>Edit User</h2>
              <label>
                Name:
                </label> <br />
                <Field
                  type="text"
                  name="name"
                  
                />
                <ErrorMessage name='name' component={'div'} style={{color: 'red'}} /><br />
                <label>
                Email:
                </label> <br />
                <Field
                  type="email"
                  name="email"
                  
                />
                <ErrorMessage name='email' component={'div'} style={{color: 'red'}} /><br />
                <label>
                Role:
                </label> <br />
                <Field
                  type="text"
                  name="role"
                 
                />
                <ErrorMessage name='role' component={'div'} style={{color: 'red'}} /> <br />
              <div className='editing-button'>
              <button type='submit'>Save</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
              </div>
              </Form>
              </Formik>
              </div>
            </>
         
        </>
      )}
    </>
  );
}

export default EditUser;
