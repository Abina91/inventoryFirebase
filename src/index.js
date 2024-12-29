// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,onSnapshot,doc,addDoc,deleteDoc,query,where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvljF5wU7tsGFqE849QTXX4mnyiqNRj28",
  authDomain: "inventory-cfc3e.firebaseapp.com",
  projectId: "inventory-cfc3e",
  storageBucket: "inventory-cfc3e.appspot.com",
  messagingSenderId: "1022370271067",
  appId: "1:1022370271067:web:cefc43cd4ea74b7d90147e",
  measurementId: "G-30VGKW57DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colref=collection(db,'inventory');

const display = document.getElementById("display-item");
const q = query(colref,where("deletion","array-contains-any",["Less-Quality","Cause Damage"]));
onSnapshot(q,(snapshot)=>{
  let inventory=[];
  display.innerHTML="";

  snapshot.docs.forEach((doc)=>{
    const data=doc.data();
    inventory.push({...data,id:doc.id})
    const li=document.createElement("li")
    li.textContent=`Id:${data.id} , name:${data.name},delteionreson:${data.deletion.join(",")}`;
    display.appendChild(li);
  })
  console.log(inventory);

})

//adding document

const addForm=document.querySelector('.add')
addForm.addEventListener('submit',(e)=>{
  e.preventDefault();

  const deletion=[];
  const checkboxes = addForm.querySelectorAll(`input[name="deletion"]:checked`);
  checkboxes.forEach((checkbox)=>{
    deletion.push(checkbox.value);
  })

  addDoc(colref,{
    id:addForm.id.value,
    name:addForm.name.value,
    deletion:deletion
  })
  .then(()=>{
    //displayMessage("item added successfully");
    addForm.reset();
  });
});


//delete document

const deleteForm = document.querySelector('.delete')
deleteForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const docref=doc(db,'inventory',deleteForm.id.value)
  deleteDoc(docref)
  .then(()=>{
    deleteForm.reset();
  })
});