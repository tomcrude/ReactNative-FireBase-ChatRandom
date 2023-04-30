import {collection, addDoc, Timestamp,where,query,getDocs,deleteDoc, doc,orderBy,updateDoc} from 'firebase/firestore'
import {db} from './firebaseConfig'
import {getToken,sendNotification} from "../utils/notifications.js"

// Create User.

export async function createUser (user){

    try {
        const token = await getToken()

    await addDoc (collection(db, 'users'),{
        name: user,
        created: Timestamp.now(),
        token: token
    })
    return token

}
    catch (e) {console.log(e);return "400"}}

// Get User.

export async function getUser(name){

    try {
        
    let response = '404'    

    const table = collection(db, 'users');
    const q = query(table, where("name","==",name))

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach((doc) => {

    response =doc.data()
    });
    return response;
    }
    catch (e) {return "400"}}

// Get all users.

async function getAllUsers(){

    try {
        let response = [];

        const table = collection(db, 'users');
        let querySnapshot = await getDocs(query(table));

        await querySnapshot.forEach((doc) => {
            
            response.push({...doc.data(), id: doc.id})
           
       
        });
        return response;
        }
        catch (e) {return "400"}
}

// Send Message.

function removeDuplicates(originalArray) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i]["token"]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

export async function sendMess(mess,user,token){
    try {

    const query = await getAllUsers() 

    let uniqueArray = await removeDuplicates(query);

    uniqueArray.forEach(
        stat => {if(token != stat.token){sendNotification(stat.token)}});

    let date = new Date();

    const dateMonth = date.getMonth() + 1
    
    let dateInfo = date.getDate() + "/" + dateMonth + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()  
        
    await addDoc (collection(db, 'messages'),{
        user: user,
        mess: mess,
        created: Timestamp.now(),
        date: dateInfo})
    }
    catch (e) {return "400"}}

// Get all  messages.    

export async function getAllMessages(){

    try {
        let messages = [];

        const table = collection(db, 'messages');
        let querySnapshot = await getDocs(query(table, orderBy('created')));

        await querySnapshot.forEach((doc) => {
            
            messages.push({...doc.data(), id: doc.id})
        });
        return messages;
    }
    catch (e) {return []}}

// Delete message.     

export async function removeMessage(id){
    try {
       await deleteDoc(doc(db, 'messages',id))
    }
    catch (e) {return []}}

// Get background.

export async function getBackground(name){

    try {
    let response = "404"    
     
    const table = collection(db, 'messages');
    const q = query(table, where("name","==","background"))

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach((doc) => {

    response = doc.data()
    });
    return response;
    }
    catch (e) {return "400"}}

// Update background.  

export async function updateBackground(data){
    try { await updateDoc(doc(db,'messages','background'),{url: data})}
    catch (e) {return "400"}}

// Get screamer.  

export async function getScreamer(){

    try {
    let response = "404"    
     
    const table = collection(db, 'messages');
    const q = query(table, where("name","==","screamer"))

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach((doc) => {
    
    response = doc.data()
    });
    return response;
    }
    catch (e) {return "400"}}

// Update screamer.  

export async function updateScreamer(data,state){
    try { await updateDoc(doc(db,'messages','screamer'),{url: data,status: state}) }
    catch (e) { return "400"}
}

