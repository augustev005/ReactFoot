import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { LIEN } from "./composant";
 
export default function Edit() {
 const [form, setForm] = useState({
  idplayers:"",
   name: "",
   numberofgoals: "",
   numberofmissedgoals:"",
   numberofpoint: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${LIEN}record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    idplayers:form.idplayers,
     name: form.name,
     numberofgoals: form.numberofgoals,
     numberofmissedgoals: form.numberofmissedgoals,
     numberofpoint: form.numberofpoint,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`${LIEN}update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="idplayers">Idplayers: </label>
         <input
           type="text"
           className="form-control"
           id="idplayers"
           value={form.idplayers}
           onChange={(e) => updateForm({ idplayers: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="numberofgoals">Numberofgoals: </label>
         <input
           type="text"
           className="form-control"
           id="numberofgoals"
           value={form.numberofgoals}
           onChange={(e) => updateForm({ numberofgoals: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="numberofmissedgoals">Numberofmissedgoals: </label>
         <input
           type="text"
           className="form-control"
           id="numberofmissedgoals"
           value={form.numberofmissedgoals}
           onChange={(e) => updateForm({ numberofmissedgoals: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="numberofpoint">Numberofpoint: </label>
         <input
           type="text"
           className="form-control"
           id="numberofpoint"
           value={form.numberofpoint}
           onChange={(e) => updateForm({ numberofpoint: e.target.value })}
         />
       </div>
       <div className="form-group">
         
         
         
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}