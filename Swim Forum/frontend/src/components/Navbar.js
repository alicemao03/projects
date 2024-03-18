import { textAlign } from '@mui/system';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
  return (
    <Navbar sticky="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/OnTheRoof">On The Roof</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/create_post">Create a Post</Nav.Link>
            <Nav.Link href="/calendar">Calendar</Nav.Link>
            <Nav.Link href="/logout" class="logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;


// onst [isAuth, setIsAuth] = useState(false);
    
//     useEffect(() => {
//         if (localStorage.getItem('access_token') !== null) {
//             setIsAuth(true);
//         }
//     }, [isAuth]);

//     return (
//         <div>
//             <Navbar bg="dark" variant="dark">
//                 <Navbar.Brand href="/">JWT Authentification</Navbar.Brand>
//                 <Nav className="me-auto">
//                     {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
//                 </Nav>
//                 <Nav>
//                     {isAuth ? <Nav.Link href="/api/logout">Logout</Nav.Link> :
//                         <Nav.Link href="/login">Login</Nav.Link>}
//                 </Nav>
//             </Navbar>
//         </div>
//     );