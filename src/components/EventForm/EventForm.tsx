import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import {Form, Input, Button, Card, DatePicker, Select} from 'antd';
import style from './EventForm.module.scss';
import { StoreContext } from '../../store.context';
import { observer } from 'mobx-react-lite'
import IUser from '../../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import IEvents from '../../interfaces/event.interface';
import { Moment } from 'moment';
import { formatDate, isDateAfter } from '../../helpers/date';

interface EventFormProps {
    guests: IUser[];
    visible: Dispatch<SetStateAction<boolean>>;
}

const EventForm = ({guests, visible}:EventFormProps) => {
    const {eventStore, authStore} = useContext (StoreContext);

    const [event, setEvent] = useState<IEvents> ({
        author: '',
        date: '',
        guest: '',
        description: ''
    } as IEvents)
    
    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent ({...event, date: formatDate (date.toDate())})
        }
    }

    const submitForm = () => {
        eventStore.createEvent ({...event, author: authStore.user.username});
        visible (false);
        // console.log (eventStore.events);
    }

  return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input onChange={e => setEvent({...event, description: e.target.value})} value={event.description}/>
            </Form.Item>

            <Form.Item
                label="Дата события"
                name="date"
                rules={[{ required: true, message: 'Обязательное поле' }, isDateAfter ("Нельзя создать событие в прошлом")]}
            >
                <DatePicker onChange={date => selectDate(date)}/>
            </Form.Item>

            <Form.Item
                label="Выберите гостя"
                name="guest"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select onChange={(guest: string) => setEvent ({...event, guest})} style={{ width: 120 }}>
                    {guests.map (item => 
                        <Select.Option key={uuidv4()} value={item.username}>{item.username}</Select.Option>
                    )}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form.Item>

        </Form>
  )
}

export default observer(EventForm); 