import React from 'react'
import { ImLocation } from 'react-icons/im'
import { WiHumidity, WiStrongWind, WiNightCloudyWindy } from 'react-icons/wi'
import { BsThermometerHalf } from 'react-icons/bs'

interface weatherProps {
    data: {
        weather: {
            0: {
                icon: string
                main: string

            },
        },
        main: {
            feels_like: number
            humidity: number
            pressure: number
            temp: number
        },
        wind: {
            speed: number
        },
        name: string
    }
}


const Weather = ({ data }: weatherProps) => {

    const dayOfWeekName = new Date().toLocaleString(
    'default', {weekday: 'long'}
    );

    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconUrl = `${iconBaseUrl}${data.weather[0]?.icon}.png`;
    return (
        <div className='font-arimo'>
            <div className='md:flex md:justify-between'>
                <div className='flex flex-col items-center md:items-start'>
                    <img src={iconUrl} alt={data.name} className="md:w-[100px] w-[70px]" />
                    <div className='mt-[-15px] flex flex-col items-center md:items-start'>
                        <h1 className='md:text-4xl text-2xl font-semibold'>{data.weather[0].main}</h1>
                        <span className='flex items-center gap-2'><ImLocation size={20} /><h1 className='text-md'>{data.name}</h1></span>
                        <h1 className='md:text-5xl text-3xl font-extrabold pt-6'>{`${data.main.temp} °C`}</h1>
                        <h1 className='md:text-xl text-sm font-bold'>{dayOfWeekName}</h1>
                    </div>
                </div>
                <div className='flex md:flex-col items-end justify-between px-8 md:items-start mt-12 md:mt-0 gap-5 md:gap-12'>
                    <span className='flex flex-col md:flex-row items-center'><WiHumidity size={50} />
                        <div>
                            <p className='text-sm'>Humidity</p>
                            <h1 className='font-bold text-lg md:text-3xl'>{`${data.main.humidity} %`}</h1>
                        </div>
                    </span>
                    <span className='flex flex-col md:flex-row items-center gap-3 md:gap-0'><WiNightCloudyWindy size={50} />
                        <div>
                            <p className='text-sm'>Air Pressure</p>
                            <h1 className='font-bold text-lg md:text-3xl'>{`${data.main.pressure} PS`}</h1>
                        </div>
                    </span>
                    <span className='flex flex-col md:flex-row items-center gap-3 md:gap-0'><WiStrongWind size={50} />
                        <div>
                            <p className='text-sm'>Wind Speed</p>
                            <h1 className='font-bold text-lg md:text-3xl'>{`${data.wind.speed} km/h`}</h1>
                        </div>
                    </span>
                    <span className='flex flex-col md:flex-row items-center'><BsThermometerHalf size={50} />
                        <div>
                            <p className='text-sm'>Feels Like</p>
                            <h1 className='font-bold text-lg md:text-3xl'>{`${data.main.feels_like} °C`}</h1>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Weather