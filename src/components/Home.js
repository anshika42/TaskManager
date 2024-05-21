import React, { useContext, useEffect } from "react";
import MyNContext from "../context/NoteContext/noteconContext";
import Addnote from "./Addnote";
import Note2dspl from "./Note2dspl";

const Home = () => {
  const a = useContext(MyNContext);
  return (
    <div>
      <Note2dspl />
    </div>
  );
};

export default Home;
