import React, { useState, useEffect } from 'react';
import playImage from '../assets/play.png';
import pauseImage from '../assets/pause.png';

const Clock = () => {
   
  const [isRunning, setIsRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(new Date().getTime() / 1000);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryTime, setCountryTime] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCountryTime = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
          const data = await response.json();
          console.log(data,data.datetime)
          setCountryTime(formatCountryTime(data.datetime));
        } catch (error) {
          console.error('Error fetching country time:', error);
        }
      }
    };

    fetchCountryTime();
  }, [selectedCountry]);


  const formatCountryTime = (countryDateTime) => {
    const timestampString = countryDateTime
        const timeString = timestampString?.split('T')[1]?.split('.')[0];
        return timeString
      };


  useEffect(() => {
    let interval;
    if (isRunning && !selectedCountry) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    else if (countryTime && selectedCountry && isRunning) { 
       interval = setInterval(() => {
        setCountryTime((prevTime) => {
          const [hours, minutes, seconds] = prevTime.split(':').map(Number);
          let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
          const newHours = Math.floor(totalSeconds / 3600) % 24;
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSeconds = totalSeconds % 60;
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
      }, 1000);
    }
    else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, countryTime, selectedCountry]);
   
  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const onSelectContry = (e) => { 
    setSelectedCountry(e.target.value)
  }

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const secondsPart = date.getSeconds();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`;
  };
  


  return (
    <div className="p-10 text-center userDetailBody justifyCenter">
      <div className='selectContainer'>
          <select
            maxHeight={ 30}
          className='font16 bgColor select textColor'
          id="countryDropdown"
          value={selectedCountry}
            onChange={(e) => onSelectContry(e)}
          >  
          <option className='dropdown-options' value="">Select a country</option>
          {countries.map((country) => (
            <option className='whiteBorder dropdown-options' key={country} value={country}>
              {country}
            </option>
          ))}
          </select>
        </div>
      <div className="body d-flex">
        <div className="text-center circle">
          <div>
            <p className="font16 textColor pt-5">{
               selectedCountry ? countryTime ? countryTime :'Loading...' :
                formatTime(elapsedTime)}</p>
          </div>
          <div>
            <img
              height={20}
              width={20}
              onClick={toggleStopwatch}
              src={isRunning ? pauseImage : playImage}
              alt="Play"
            />
          </div>
        </div>
      </div>
      </div>
  );
};

export default Clock;
