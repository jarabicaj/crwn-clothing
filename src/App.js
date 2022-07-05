import { Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component'

const Shop = () => {
    return (
        <Fragment>
            <div>I am the Shop Page !!!</div>
        </Fragment>
    )
}

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index={true} element={<Home />} /> 
                <Route path='/shop' element={<Shop />} /> 
                <Route path='/sign-in' element={<SignIn />} /> 
            </Route>
        </Routes>
    )
}
export default App;