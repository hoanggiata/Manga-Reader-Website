// import axios from "axios";

// export default async function handler(req,res){
//     const creds = {
//         grant_type: "password",
//         username: 'hoanggiata',
//         password: "mypassword",
//         client_id: "personal-client-cebbe109-38ca-43fd-8b57-90f3a2085253-927af891",
//         client_secrect: "q7awoKFR35y2dBUhtBYtKHOtQiy2KCTV"
//     };
//     try{
//         const respond = await axios.post("https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token",creds);
//         let {access_token, refresh_token} = respond.data;
//         console.log(access_token);

//         setInterval(async ()=>{
//             const refreshRespond = await axios.post("https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token",{
//                 grant_type: "refresh_token",
//                 refresh_token: refresh_token,
//                 client_id: "personal-client-cebbe109-38ca-43fd-8b57-90f3a2085253-927af891",
//                 client_secrect: "q7awoKFR35y2dBUhtBYtKHOtQiy2KCTV"
//             });
//             access_token = refreshRespond.data.access_token;
//             console.log(access_token);
//         },15 * 60 * 1000);
//     }catch(error){
//         console.log("Error fetching MangaDex token: ",error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }