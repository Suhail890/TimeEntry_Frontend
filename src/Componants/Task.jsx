import React, { useState, useEffect } from "react";

import axios from "axios";

const Task = () => {
  const [data, setData] = useState([]);
  const [newData,setNewData]=useState({})
  const [inp, setInp] = useState("");
  const [out, setOut] = useState("");

  const getData = async () => {
    const result = await axios.get("http://localhost:3030/allentry");
    setData(result.data);
    setInp("")
    setOut("")
  };

  const handleAdd=()=>{
    
  }
  const handleSave = async () => {
    const payload = {
      inp,
      out,
    };
   const result= await axios.post("http://localhost:3030/entries", payload);
 console.log(result.data)
   setNewData(result.data)
  };

  const handleDelete = (item, index) => {
    const a = prompt("Confirm! want to delete");

    console.log(a);
    if (a === "y") {
      const deleted = data.filter((elem, i) => i !== index);
      setData(deleted);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
        <div>
      <h1>Time Entry</h1>
      Time In:
      <input vlaue={inp} onChange={(e) => setInp(e.target.value)} type="time" />
      Time Out:
      <input vlaue={out} onChange={(e) => setOut(e.target.value)} type="time" />
      
      <button onClick={handleAdd}>Add New</button>
      <br />
      <br />
      <button onClick={handleSave}>Save</button>
      </div>
      <center>
        <div>
          <table border="2px solid black">
            <tr>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>

            {data.map((item, index) => {
              return (
                <>
                  {" "}
                  <tr>
                    <td>{item.inp}</td>
                    <td>{item.out}</td>
                    <td></td>
                    <td>
                      <button onClick={() => handleDelete(item, index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
        <div>
          <table border="2px solid black">
            <tr>
              <th>In Hours</th>
              <th>Out Hours</th>
              <th>First In</th>
              <th>Last Out</th>
            </tr>
            <tr>
              
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
              
            </tr>
          </table>
        </div>
      </center>
    </div>
  );
};

export default Task;
