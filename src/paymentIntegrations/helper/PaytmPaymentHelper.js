import { API } from "../../backend";

export const processPayment = (userId, token, paymentData) => {
    console.log(paymentData);
    return fetch(`${API}/paytmpayments/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: paymentData
    })
    .then(data => {
      return data.json()
    })
    .catch(err => console.log(err));
}


export const processPaytmPayment = (userId, token, paymentData) => {
    console.log(paymentData);
    return fetch(`${API}/paytmpayment`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(data => {
        return data.json()
    })
    .catch(err => console.log(err));
}