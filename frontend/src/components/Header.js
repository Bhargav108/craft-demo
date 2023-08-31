import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return (
        <header>
            <Link className="site-logo" to="/">#IdeaHub</Link>
            <nav>
                <NavLink 
                    to="idea"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Ideas
                </NavLink>
                <NavLink 
                    to="playground"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Playground
                </NavLink>
            </nav>
        </header>
    )
}