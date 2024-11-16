/* eslint-disable react/prop-types */
import EventModal from './EventModal';

export const Dzien = (props) => {
    const [year, month, day] = props.days_date.split('-');      //destructuring
    const months = {1: "sty.",2: "lut.",3: "mar.",4: "kwi.",5: "maja",6: "cze.",7: "lip.",
        8: "sie.",9: "wrz.",10: "paź.",11: "lis.",12: "gru.", "01": "sty.","02": "lut.","03": "mar.",
        "04": "kwi.","05": "maja","06": "cze.","07": "lip.","08": "sie.","09": "wrz."}
    const add_event_link = "index.php?a=add_event&d=" + props.days_date
    return(
        <div className={props.classes}>
            <div 
                onClick={() => {
                    props.setZoomedD(props.days_date)
                    //handleShow
                    }}>
                <EventModal />
                <div className="data_dnia">{day} {months[month]} {day==1 && year}</div>
                <div className="plusik"><a href={add_event_link}>&nbsp;+&nbsp;</a></div>
                <div className="eventy" dangerouslySetInnerHTML={{ __html: props.eventy }} />
            </div>
        </div>
    )
} 