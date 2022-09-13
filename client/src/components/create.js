import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LIEN } from "./composant";
 
export default function Create() {
 const [form, setForm] = useState({
   idplayers: "",
   name: "",
   numberofgoals: "",
   numberofmissedgoals: "",
   numberofpoint: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch(`${LIEN}record/add`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ idplayers:"", name: "", numberofgoals: "", numberofmissedgoals: "", numberofpoint:"" });
   navigate("/list");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="idplayers">Idplayers</label>
         <input
           type="text"
           className="form-control"
           id="idplayers"
           value={form.idplayers}
           onChange={(e) => updateForm({ idplayers: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="numberofgoals">Numberofgoals</label>
         <input
           type="text"
           className="form-control"
           id="numberofgoals"
           value={form.numberofgoals}
           onChange={(e) => updateForm({ numberofgoals: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="numberofmissedgoals">Numberofmissedgoals</label>
         <input
           type="text"
           className="form-control"
           id="numberofmissedgoals"
           value={form.numberofmissedgoals}
           onChange={(e) => updateForm({ numberofmissedgoals: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="numberofpoint">Numberofpoint</label>
         <input
           type="text"
           className="form-control"
           id="numberofpoint"
           value={form.numberofpoint}
           onChange={(e) => updateForm({ numberofpoint: e.target.value })}
         />
       </div> <br/>
       <div className="form-group">
         
        
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}