import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.div`
  background-color: gainsboro;
  padding: 10px;
  font-size: 12px;
`;

export default function NavBar(){
  return (
    <Navbar>
    <Link to="/"><h3 style={{float: "left", position: "absolute", left: 10}}>Home🏠</h3></Link>
    <a href="/login"><button style={{float: "right", position: "absolute", right: 10, top: 10}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="30" alt=""></img>
    </button></a>
    <h3 style={{textAlign: "center"}}>LO-Tracker</h3>
    </Navbar>
  );
};
