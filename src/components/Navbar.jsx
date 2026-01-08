import logo from '../assets/react.svg';

export default function Navbar() {
    return (
       <nav className="mx-auto w-full max-w-4xl flex items-center justify-between sticky top-0 z-50">
        <img src={logo} alt="some brand" className='logo react main__title' />
        <h1 className="main__title text-xl font-bold">Smart To-Done</h1>
            <ul className="nav__links flex gap-4 text-sm">
                <li className="nav__link cursor-pointer hover:underline"><a href="#SubmitForm">Requests</a></li>
                <li className="nav__link cursor-pointer hover:underline"><a href="tel:9493759321">Contact Me</a></li>
            </ul>
        </nav>
    ); 
}