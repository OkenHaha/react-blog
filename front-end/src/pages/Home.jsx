import React from 'react'
import Centre from "../components/Centre"
import Footer from "../components/Footer"
import TidioChat from "../components/Tidio";



const Home = () => {
	return (
		<div id="container" className='w-full pt-20'>
			<div id="centre" className='w-full'>
       			<Centre/>
				<TidioChat/>

      		</div>
		</div>
	)
}

export default Home