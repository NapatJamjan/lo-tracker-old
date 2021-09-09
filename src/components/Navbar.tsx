import { Link } from 'react-router-dom';

export default function NavBar(){
  return (
    <div className="page-header header">
    <Link to="/"><h3 style={{float:"left",position:"absolute",left:10}}>Home🏠</h3></Link>
    <a href="/login"><button style={{float:"right",position:"absolute",right:10,top:10}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="30" alt=""></img>
    </button></a>
    <h3 style={{textAlign:"center"}}>LO-Tracker</h3>
    </div>
  );
};
