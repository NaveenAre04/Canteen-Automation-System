import { API } from "../../backend";

export const createOrder = (userId,token, orderData) => {
    console.log(orderData);
    console.log(userId);
    console.log(token);
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: orderData})
    })
    .then(response => {
        if(response.status===200)
        {
        return response.json()
        }
    })
    .catch(err => console.log(err))
};


export const getOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`,{
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}