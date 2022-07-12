import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useStateValue } from "../StateProvider";


const Sidebar = () => {

	const [weatherdata, setWeatherdata] = useState()

	useEffect(() => {

		const successCallback = (position) => {
			console.log(position);

			let URL = `https://community-open-weather-map.p.rapidapi.com/forecast?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}`

			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
					'X-RapidAPI-Key': 'd5513fc387msh1217526fa2aa6e5p17daefjsnef096ed4cbe1'
				}
			};

			fetch(URL, options)
				.then(response => response.json())
				.then(data => {setWeatherdata(data); console.log(data)})
				.catch(err => console.error(err));
					}

		const erroCallback = err => console.log(err)
		
		navigator.geolocation.getCurrentPosition(successCallback, erroCallback)
	}, [])

	const [{user}, dispatch] = useStateValue();

	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<h4>{weatherdata?.city.name}</h4>
				<img src={`http://openweathermap.org/img/w/${weatherdata?.list[0].weather[0].icon}.png`} alt="" />
				<h1>{Math.round(weatherdata?.list[0].main.temp)} °C</h1>
			</div>
			<div className="sidebar__bottom">
				<h4>Welcome</h4>
				<h4>{user?.displayName}</h4>
			</div>
			
		</div>
	)
}

export default Sidebar