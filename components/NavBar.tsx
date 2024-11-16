import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="lex items-center gap-6 px-6 py-3 bg-slate-800 text-white rounded-md shadow-lg">
            <ul className="flex gap-4">
                <li>
                    <Link
                        href="/"
                        className="hover:text-slate-300 transition-colors"
                    >
                        Home
                    </Link>
                </li>
                <li className="hover:text-slate-300 transition-colors">
                    <Link href="/admin">Admin</Link>
                </li>
                <li className="hover:text-slate-300 transition-colors">
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className="hover:text-slate-300 transition-colors">
                    <Link href="/attendance">Attendance</Link>
                </li>
                <li className="hover:text-slate-300 transition-colors">
                    <Link href="/guestbook">Guest Book</Link>
                </li>
                <li className="hover:text-slate-300 transition-colors">
                    <Link href="/invitation">Invitation</Link>
                </li>
                <li className="hover:text-slate-300 transition-colors">
                    <Link href="/welcome">Welcome</Link>
                </li>
            </ul>
        </nav>
    )
}
