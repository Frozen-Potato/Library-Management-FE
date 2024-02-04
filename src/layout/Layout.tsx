import { Outlet } from "react-router-dom"
import { Header } from "./header/Header"
import { Footer } from "./footer/Footer"
import { Suspense } from "react"
import { Loading } from "../loading/Loading"

export const Layout = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
            <Footer />
        </>
    )
}