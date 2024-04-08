import url from "@/components/url";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';


function UserManagement() {
  const [users, setUsers] = useState([]);
  const router = useRouter()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        const decodedToken = jwt_decode(token);
        if (!decodedToken) {
          router.push('/login');
          return;
        }

        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());

        if (data.role) {
          fetch(`${url}/users`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => res.json())
            .then(data => {
              setUsers(data)
              setLoading(false)
            })
            .catch(error => console.log(error));

        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };


    fetchCartProducts();
  }, [users, router]);


  const deleteUsers = async (id) => {
    try {
      const res = await fetch(`${url}/deleteUser/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        alert('User not deleted . Try again plz ');
        
      }
      alert('User Deleted Successfully');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };




  if (loading) return <div className='min-h-screen pt-20 flex justify-center items-center'>
    <p className='text-xl'> Loading...</p>
  </div>






  return (
    <div className=" min-h-screen mx-2 ">
      <div className="flex justify-between border border-black px-4">
        <p className=" py-2">Name & Email</p>


        <p className="py-2">Delete</p>


      </div>
      <div>
        {users?.map(user => (
          <div key={user._id} className="flex justify-between items-center border border-black px-4">
            <p className="py-2">{user.name} <br /> {user.email}</p>


            {/* <p  onClick={()=>deleteProduct(user._id)} className='border-[1px] bg-red-600 rounded text-white border-red-800 text-center h-7'><button  className=" px-1 py-1"><RiDeleteBin6Line /></button></p> */}
           <button onClick={() => deleteUsers(user._id)} className='border-[1px] bg-red-600 rounded text-white border-red-800 text-center p-1' disabled={user.role}> <RiDeleteBin6Line /></button>
          </div>
        ))}
      </div>


    </div>
  );
}

export default UserManagement;
