import { useState } from "react";
import Button from "./Button";

const Attendance = () => {
  const [name, setName] = useState("");
  const [present, setPresent] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  const handlePresent = (event) => {
    setPresent(event.target.value);
    console.log(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Attendance Records</h1>
      <form onSubmit={handleSave}>
        <label></label>
        <input
          type="text"
          placeholder="Student Name:"
          value={name}
          onChange={handleName}
          required
        />
        <br />

        <label>Present: </label>
        <input
          name="presence"
          type="radio"
          value={true}
          onChange={handlePresent}
        />
        <label>Absent: </label>
        <input
          name="presence"
          type="radio"
          defaultChecked
          value={false}
          onChange={handlePresent}
        />
        <Button type="submit" text="Save attendance" />
      </form>
    </div>
  );
};

export default Attendance;
