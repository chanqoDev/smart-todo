import { MdTaskAlt } from "react-icons/md";

export default function Navbar() {
    return (
        <nav className="mx-auto w-full max-w-4xl flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MdTaskAlt className="text-3xl text-slate-900" />
                <span className="font-bold tracking-tight">To-Done</span>
            </div>
            <ul>
                <li><button type="button" href="tel:9493759321" className="text-sm px-2 py-1 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition"
                >Contact</button></li>
            </ul>
        </nav>
    );
}