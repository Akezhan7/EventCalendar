import { Button, Modal, Row } from 'antd'
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar/EventCalendar'
import EventForm from '../components/EventForm/EventForm';
import { StoreContext } from '../store.context';

const Event = () => {
  const [modalVisible, setModalVisible] = useState<boolean> (false);
  const {eventStore, authStore} = useContext (StoreContext);

  useEffect (() => {
    eventStore.fetchGuests ();
    eventStore.fetchEvents (authStore.user.username)
  }, [])


  return (
    <>
      <EventCalendar events={eventStore.events}/>
      <Row justify='center'>
          <Button onClick={() => setModalVisible(true)}>
              Добавить событие
          </Button>
      </Row>
      <Modal 
        title="Добавить событие"
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible (false)}
      >
        <EventForm guests={eventStore.guests} visible={setModalVisible}/>
      </Modal>
    </>
  )
}

export default observer (Event)