import React from 'react'

interface WeeklyForecastData {
    forecastData: {
        list: {
            dt_txt: string;
            main: {
                temp: number;
                feels_like: number
            };
        }[];
        city: {
            name: string;
        };
    }
}

const ForeCastData = ({ forecastData }: WeeklyForecastData) => {
    const dayOfWeekName = new Date().toLocaleString(
        'default', {weekday: 'long'}
        );

    return (
        <div className='px-8 md:px-0'>
            <h1 className='md:pb-4 font-arimo md:font-semibold'>{dayOfWeekName}</h1>
            <ul className='flex flex-wrap gap-4 md:justify-between items-center md:items-start text-white font-arimo'>
                {forecastData.list.slice(0, 8).map((item) => {
                    console.log(item)
                    const date = new Date(item.dt_txt);
                    const time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                    return (
                        <div key={item.dt_txt}>
                            <div className='flex flex-col bg-gray-500 bg-opacity-20 backdrop-blur-lg hover:-translate-y-4 ease-in-out duration-200 rounded drop-shadow-lg p-2 w-[130px] md:w-[150px] h-[90px] md:h-[160px]'>
                                <p className='text-sm'>{time}</p>
                                <h1 className='text-lg font-extrabold md:pt-16'>{`${item.main.temp}°C`}</h1>
                                <h2 className='text-sm'>{`Feels like ${item.main.feels_like}°C`}</h2>
                            </div>
                        </div>
                    );
                })}

            </ul>
        </div>
    )
}

export default ForeCastData

