import { navBar, navBarElement, navBarElementSelected, navBarNewButton } from "../styles/NavBar"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

export default function NavBar(params: {
    onNew: () => void,
    mode: 'stats' | 'home'
}) {

    function home() {
        location.href = '/';
    }

    function stats() {
        location.href = '/stats';
    }

    return (
        <div style={navBar} className={inter.className}>
            <span style={(params.mode == 'home' ? navBarElementSelected : navBarElement)} onClick={home}>Sticky notes</span>
            <span style={(params.mode == 'stats' ? navBarElementSelected : navBarElement)} onClick={stats}>Statistics</span>
            <span style={navBarNewButton} onClick={params.onNew}>New</span>
        </div>
    )
}