import React,{useState} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

const User = () =>{
    const[state,setState]= useState({
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        profilePicture:''
    })
    const[userData,setUserData]= useState([]);
    const[selectedFile,setSelectedFile] = useState(null);  

    React.useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () =>{
        axios.get("http://localhost:3001/api/user").then(res =>{           
            setUserData(res.data)
        })
    }

    const handleChange= (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    
    const updateData = (id) =>{
        const update = userData.filter(user => id === user.id)[0];        
        setState({...state,
          firstName: update['firstName'],
          lastName: update['lastName'],
          phone: update['phone'],
          email: update['email'],
          profilePicture: update['profilePicture']
        })            
    }

    const submitValue = () =>{      
        axios.post("http://localhost:3001/api/user",state).then(res =>{
            getUserData();
        }).catch(e => console.log(e))
    }
    const onChangeHandler=event=>{
        setSelectedFile(event.target.files[0]);    
    }

    const removeData = (id) => {
        axios.delete(`http://localhost:3001/api/user/${id}`).then(res => {
            const del = userData.filter(user => id !== user.id)
            setUserData(del);
        })
    }

    const onClickHandler = () => {
        const data = new FormData()
        data.append('file', selectedFile)
        axios.post("http://localhost:3001/upload", data, {        
            }).then(res => { // then print response status
            if(res.statusText === 'OK'){
                setState({...state,profilePicture: selectedFile.name })
            }       
        })
    }

    return(
        <>
            <hr/>
            <input type="text" placeholder="First Name" value={state.firstName} name="firstName" onChange={handleChange} />
            <input type="text" placeholder="Last Name" value={state.lastName} name="lastName" onChange={handleChange} />
            <input type="text" placeholder="Phone" value={state.phone} name="phone" onChange={handleChange} />
            <input type="text" placeholder="Email" value={state.email} name="email" onChange={handleChange} />
            <input type="file" name="file" onChange={onChangeHandler}/>
            <button class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
            <button onClick={submitValue}>Submit</button>   
            <table id='employee'>
                <thead>
                    <tr><th>FirstName</th>
                    <th>LastName</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>View</th>
                    <th>Update</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && userData.map(({id,firstName,lastName,phone,email}) =>{
                    return <tr>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>{phone}</td>
                                <td>{email}</td>
                                <td>
                                    <Link
                                    to={{
                                        pathname: "/detail",                                       
                                        state: { 
                                            firstName: firstName,
                                            lastName: lastName,
                                            phone: phone,
                                            email: email      
                                        }
                                    }}
                                    >View</Link>
                                </td>
                                <td><button onClick={() => updateData(id)}>Update</button></td>
                                <td><button onClick={() => removeData(id)}>Delete</button></td>
                            </tr>                         
                    })}
                </tbody>
            </table>
        </>
    )
}

export default User;