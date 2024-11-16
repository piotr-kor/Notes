/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { months, miesiace } from './Consts'

export const Dzien = (props) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [year, month, day] = props.days_date.split('-');      //destructuring
    
    const add_event_link = "index.php?a=add_event&d=" + props.days_date
    return(
        <>  
           <div className={props.classes}>
                <div 
                    onClick={() => {
                        props.setZoomedD(props.days_date)
                        {handleShowModal()}
                        console.log('kliknięto', props.zoomedD)
                        }}>
                    <div className="data_dnia">{day} {months[month]} {day==1 && year}</div>
                    <div className="plusik"><a href={add_event_link}>&nbsp;+&nbsp;</a></div>
                    <div className="eventy" dangerouslySetInnerHTML={{ __html: props.eventy }} />
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{day} {miesiace[month]} {day==1 && year}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div dangerouslySetInnerHTML={{ __html: props.eventy }} />
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="third" onClick={handleCloseModal}>
                        Zatwierdź
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 