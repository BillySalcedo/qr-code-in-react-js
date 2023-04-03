import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/fetching-api.css";

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
}

export const UsersList = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get('https://reqres.in/api/users?page=1');
  //     setUsers(response.data.data);
  //   };

  //   fetchData();
  // }, []);

  function calculateTime(first_name: string) {
    let hour = first_name.length % 12;
  
    if (hour === 0) {
      hour = 12;
    }
    if (first_name.length > 12) {
      hour % 12;
    }
    const paddedHour = hour.toString().padStart(2, '0');
  
    if (!paddedHour) {
      return `No hour value found.`;
    } else if (first_name) {
      return `${paddedHour}: ${first_name.length > 12 ? 'AM' : 'PM'}`;
    } else {
      return `No input provided.`;
    }
  }
  
  const first_name = "BILLYJOSHUASALCEDO";
  console.log(calculateTime(first_name)); // output: 06: PM
  

  // function setCalculateSurnameMinutes() {
  //   let minutes = (first_name.length % 6) * 10;

  //   // Reset minutes to 0 if the length is exactly 6
  //   if (first_name.length === 6) {
  //     minutes = 0;
  //   }

  //   let hour = first_name.length % 12;

  //   if (hour === 0) {
  //     hour = 12;
  //   }
  //   if (first_name.length > 12) {
  //     hour += 12;
  //   }

  //   const paddedMinutes = minutes.toString().padEnd(2, '0');

  //   const paddedHour = hour.toString().padStart(2, '0');

  //   if (!paddedHour) {
  //     return `No hour value found.`;
  //   } else if (first_name) {
  //     return `${paddedHour}:${paddedMinutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  //   } else {
  //     return `No input provided.`;
  //   }
  // }

  return (
    <div>
      <h1>Users</h1>
      {/* <ul>
        {users.map(user => (
          <li key={user.id}>
            <div>
              <h2>{`${first_name} ${first_name}`}</h2>
              <p>{calculateSurnameMinutes()}</p>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default UsersList;
