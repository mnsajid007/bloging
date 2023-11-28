import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children, hand}) => {
    //    const som = ()=> {
    //     hand()
    //    }
    return (
        <>
        <Header hand={hand}  />
        {/* <button onClick={som}>some</button> */}
        {children}
        <Footer />
        </>
    )
}

export default Layout;