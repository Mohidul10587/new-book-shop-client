import url from '@/components/url'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiEditAlt } from 'react-icons/bi'

import jwt_decode from 'jwt-decode';
const AllProducts = () => {
const filse= {lastModified:false}
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState(filse)

    const [refetch, setRefetch] = useState(false)
    const router = useRouter();

    const imageStorageKey = '6c0277e2286d8c4a1059080d1574e2a7'



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
                    fetch(`${url}/getProduct`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json())
                        .then(data => {
                            setProducts(data)
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
    }, [router, refetch]);



    const handleProfile = (e) => {
        e.preventDefault();

console.log(file)

        
        const id = e.target.id.value;
        const formData = new FormData();
        formData.append("key", imageStorageKey);
        formData.append("image", file);



        if (file.lastModified) {
            console.log('ok')
            fetch(`https://api.imgbb.com/1/upload?key=${imageStorageKey}`, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result)
                    if (result.success) {
                        const imgUrl = result.data.url;
                        console.log('oo',imgUrl);
                        fetch(`${url}/updateProduct/${id}`, {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json",
                                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                            body: JSON.stringify({
                                img: imgUrl,
                                name: e.target.name.value,
                                price: e.target.price.value,
                                description: e.target.description.value,
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.acknowledged) {
                                    console.log(data);
                                    setRefetch(!refetch);
                                    alert("Your Profile updated successfully");
                                    
                                } else {
                                    setRefetch(!refetch);
                                    alert("Sorry The profile do not updated");
                                }
                            });
                    }
                });

        } else {
            fetch(`${url}/updateProduct/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                    img: e.target.img.value,
                    name: e.target.name.value,
                    price: e.target.price.value,
                    description: e.target.description.value,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.acknowledged) {
                        console.log(data);
                        alert("Your Profile updated successfully");
                        setRefetch(!refetch);

                    } else {
                        alert("Sorry The profile do not updated");
                        setRefetch(!refetch);
                    }
                });
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const res = await fetch(`${url}/products/${productId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete product');
            }
            setRefetch(!refetch);
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
        <div className='px-2'>
            <div className='grid grid-cols-4 md:px-10 px-4 border py-4 border-black items-center'>
                <div className='flex justify-start'>
                    <p>Img</p>
                </div>


                <div className='flex justify-start'>
                    <p>Title</p>
                </div>

                <div className='flex justify-end'>
                    <p>Edit</p>
                </div>
                <div className='flex justify-end'>
                    <p>Delete</p>
                </div>

            </div>

            {products.map((p, i) => <div key={p._id} className='grid grid-cols-4 md:px-10 px-4 py-2 mb-2 items-center border border-black'>

                <div className='flex justify-start'>
                    <div className='w-12 h-12'>
                        <img src={p.img} className='w-full h-full  rounded-full' alt="" />
                    </div>

                </div>

                <div className='flex justify-start'>
                    <p className='md:w-full w-44  ml-2 md:text-start'>{p.name}</p>
                </div>


                <div className='flex justify-end'>
                    <p className='border-[1px] w-8 bg-orange-400 rounded text-white border-orange-400 text-center'><button className=" px-1 py-1">
                        <label htmlFor={i} ><BiEditAlt /></label>
                    </button>
                    </p>
                </div>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id={i} className="modal-toggle" />
                <div className="modal md:mt-0 mt-8">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Update  Product</h3>
                        <div className="modal-action justify-center">

                            <form onSubmit={handleProfile}>
                                <label htmlFor="myFile">Image</label> <br />
                                <input id="myFile" name='myFile' type="file" size="30" onChange={(e) => setFile(e.target.files[0])} />
                                <br />
                                <input type="text" className='border-1 border-white w-1 h-1 text-white outline-none' name='id' id='id' defaultValue={p._id} />
                                <label htmlFor="name">Title</label> <br />
                                <input type="text" className='border-2 border-teal-800 rounded px-4 md:w-96 h-12' name='name' id='name' defaultValue={p.name} /> <br />
                                <label htmlFor="price">Price</label> <br />
                                <input type="number" className='border-2 border-teal-800 rounded px-4 md:w-96 h-12' name='price' id='price' defaultValue={p.price} /> <br />

                                <label htmlFor="description">Description</label> <br />
                                <input type="text" className='border-2 border-teal-800 rounded px-4 md:w-96 h-12' name='description' id='description' defaultValue={p.description} /> <br />
                                <input type="text" className='border-1 border-white w-1 h-1 text-white outline-none' name='img' id='img' defaultValue={p.img} />

                                <div className='md:flex justify-center mt-4'>
                                    <button type='submit'>
                                        <label htmlFor={i} className="border-2 border-teal-800 rounded px-4 py-2">Submit</label>
                                    </button>

                                    <label className="border-2 border-teal-800 rounded px-4 py-1 ml-3" htmlFor={i} >Cancel</label>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <p onClick={() => deleteProduct(p._id)} className='border-[1px] w-8 bg-red-600 rounded text-white border-red-800 text-center'><button className=" px-1 py-1"><RiDeleteBin6Line /></button></p>
                </div>


            </div>)}

        </div>
    )
}

export default AllProducts