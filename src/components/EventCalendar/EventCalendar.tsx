import { Badge, BadgeProps, Calendar } from 'antd';
import { Moment } from 'moment';
import React from 'react'
import { formatDate } from '../../helpers/date';
import IEvents from '../../interfaces/event.interface'
import style from './EventCalendar.module.scss';
import { v4 as uuidv4 } from 'uuid';
interface EventCalendarProps {
    events: IEvents[];
}

const EventCalendar = ({events}:EventCalendarProps) => {
    
const dateCellRender = (value: Moment) => {
    const formetedDate = formatDate (value.toDate ());
    const currentDayEvents = events.filter (ev => ev.date === formetedDate);
    return (
        <ul className="events">
        {currentDayEvents.map(item => (
            <li key={uuidv4()}>
                {item.description}
            </li>
        ))}
        </ul>
    );
    };
  return (
    <>
        <Calendar dateCellRender={dateCellRender}/>
    </>
  )
}

export default EventCalendar