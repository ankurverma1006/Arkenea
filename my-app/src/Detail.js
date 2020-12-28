import React from 'react';

const Detail =(props) =>{
    const data= props.location.state;
    
    return(
        <>
          <ul>
              <li>
                  {data.firstName}
              </li>
              <li>
                  {data.lastName}
              </li>
              <li>
                  {data.phone}
              </li>
              <li>
                  {data.email}
              </li>             
          </ul>
        </>
    )
}

export default Detail;