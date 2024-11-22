/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { months, miesiace } from './Consts'
import { useNotepadContext } from './NotepadContext';

export const Dzien = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { events, addEvent, removeEvent } = useNotepadContext();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);   
    const handleCloseModal = () => setShowModal(false);         //bez takich funkcji trzeba by używać
                                                                //inline handlera 
                                                                //onClick={() => setShowModal(true)}
    const [year, month, day] = props.days_date.split('-');      //destructuring
    const add_event_link = "index.php?a=add_event&d=" + props.days_date
    return(
        <>  
           <div className={props.classes}
                onClick={() => {
                    props.setZoomedD(props.days_date)
                    {handleShowModal()}
                    console.log('kliknięto', props.zoomedD)
                    }}>
                <div className="data_dnia">{day} {months[month]} {day==1 && year}</div>
                <div className="plusik"><a href={add_event_link}>&nbsp;+&nbsp;</a></div>
                <div className="eventy" dangerouslySetInnerHTML={{ __html: props.eventy }} />
                
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{day} {miesiace[month]}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div dangerouslySetInnerHTML={{ __html: props.eventy }} />
                        <form>
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="timeInput" className="form-label">Godzina</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="timeInput"
                                        name="time"
                                        defaultValue="13:45"
                                    />
                                </div>
                                <div className="col-9">
                                    <label htmlFor="textInput" className="form-label">Tekst</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="textInput"
                                        name="text"
                                        placeholder="Wpisz tekst..."
                                    />
                                </div>
                            </div>
                        </form>
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