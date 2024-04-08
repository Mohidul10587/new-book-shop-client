import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import url from '@/components/url';
import { useRouter } from 'next/router';
import { FiLoader } from 'react-icons/fi';
const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
const router = useRouter()
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

        // A sweet baked food made from a dough or thick batter usually containing flour and sugar and often shortening, eggs, and a raising agent (such as baking powder) : a flattened usually round mass of food that is baked or fried.




        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          router.push('/login');
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error(err);

      }
    };

    fetchCartProducts();
  }, [router]);



const handleProfile = (e)=>{
  e.preventDefault() 
  fetch(`${url}/updateUser/${id}`, {
    method: "PUT",
    headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
        name: e.target.name.value,

    }),
})
    .then((res) => res.json())
    .then((data) => {
        if (data.massage === "Update Success") {
            console.log(data);
            alert("Your Profile updated successfully");
            setRefetch(!refetch);
            reset();
        } else {
            alert("Sorry The profile do not updated");
            setRefetch(!refetch);
        }
    });
}





  if (loading) return <div className='min-h-screen pt-24 flex justify-center items-center gap-2'>
  <FiLoader className='animate-spin text-2xl' />
  <p className='text-center text-2xl'>Loading....</p>
</div>

  return (
    <div className='min-h-screen pt-20 '>
      <div className='h-44 w-full relative'>
        <img src="/profilebg.jpg" className='h-full w-full' alt="" />
        <img src="/review.jpeg" className='h-24 w-24 left-4 rounded-full border border-black absolute -bottom-10' alt="" />
      </div>

      <div className='mt-10 ml-4'>
        <p>Name :{user.name}</p>
        <p>Email : {user.email}</p>
      </div>

      <div className=''>
               
                      <button className="ml-4">
                        <label htmlFor='profile' >Update profile</label>
                    </button>
                 
                </div>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id='profile' className="modal-toggle" />
                <div className="modal md:mt-0 mt-8">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Update  Product</h3>
                        <div className="modal-action justify-center">

                            <form onSubmit={handleProfile}>
                              
                                <label htmlFor="name">Name</label> <br />
                                <input type="text" className='border-2 border-teal-800 rounded px-4 md:w-96 h-12' name='name' id='name' defaultValue={user.name} /> <br />
                             
                                <div className='md:flex justify-center mt-4'>
                                    <button type='submit'>
                                        <label htmlFor='profile' className="border-2 border-teal-800 rounded px-4 py-2">Submit</label>
                                    </button>

                                    <label className="border-2 border-teal-800 rounded px-4 py-1 ml-3" htmlFor='profile' >Cancel</label>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
    </div>
  )
}

export default Profile