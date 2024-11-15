/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Kalendarz.css'
import { useNotepadContext } from './NotepadContext';


export const Kalendarz = () => {
    const { events, addEvent, removeEvent } = useNotepadContext();
    const [extraWeeksBefore, setExtraWeeksBefore] = useState(0)
    const [extraWeeksAfter, setExtraWeeksAfter] = useState(0)
    const today = new Date()
    const dayOfWeek = today.getDay()                            //0 to niedziela, 1 to poniedziałek,...   
    const amountOfDaysToDisplay = 63
    const firstDayToDisplay = new Date(today)
    firstDayToDisplay.setDate(today.getDate() - dayOfWeek - 6 - 7*extraWeeksBefore)
    
    let yesterdaysMonth = firstDayToDisplay.getMonth()            //wykrywacz zmiany miesiąca
    let czyNowyMiesiac = 0                                        //jw

    const daysToDisplay = []
    for (let i = 0; i < amountOfDaysToDisplay+7*extraWeeksBefore+7*extraWeeksAfter; i++){
        const currentDate = new Date(firstDayToDisplay);
        currentDate.setDate(firstDayToDisplay.getDate() + i);
        let klasy = "day_m"
        if (currentDate.getDay() == 0) {klasy += " niedziela";}                         //niedziele
        if (formattedDate(currentDate) == formattedDate(today)) {klasy += " dzisiaj";}  //dzisiaj
        if (currentDate.getMonth() != today.getMonth()) {klasy += " szary";}            //inne miesiące
        if (i>6+7*extraWeeksBefore && i<14+7*extraWeeksBefore) {klasy += " this_week";}         //aktualny tydzień
        if (currentDate.getMonth() != yesterdaysMonth) { czyNowyMiesiac = 1 } else {czyNowyMiesiac = 0}
       
        daysToDisplay.push({
            classes: klasy, 
            days_date: formattedDate(currentDate),
            eventy: eventyDnia(events,currentDate),
            czy_nowy_miesiac: czyNowyMiesiac
          });
          yesterdaysMonth = currentDate.getMonth()
    }
    return (
        <div> 
            <h3>Kalendarz</h3> 
            <div id="kalendarz_miesiac">
                <div className="dni_tyg">Pon</div>
                <div className="dni_tyg">Wt</div>
                <div className="dni_tyg">Śr</div>
                <div className="dni_tyg">Czw</div>
                <div className="dni_tyg">Pt</div>
                <div className="dni_tyg">Sob</div>
                <div className="dni_tyg">Niedz</div>
                {daysToDisplay.map((day) => (
                    <>
                        {(day.czy_nowy_miesiac == 1) && przerwa}
                        <Dzien
                            key={day.days_date}             // Użycie days_date jako unikalnego id dla Reacta
                            classes={day.classes}
                            days_date={day.days_date}
                            eventy={day.eventy}
                        />
                    </>
                ))}
                                
            </div>
            <div className="wiecej">
                <WiecejBtn czego="miesięcy" setValueEWB={setExtraWeeksBefore} setValueEWA={setExtraWeeksAfter} /> &nbsp;
                <WiecejBtn czego="lat" setValueEWB={setExtraWeeksBefore} setValueEWA={setExtraWeeksAfter} />
            </div>
        </div>
    )
}
const WiecejBtn = (props) => {
    let b = props.czego=="miesięcy" ? 4 : 100
    let a = props.czego=="miesięcy" ? 20 : 200
    return(
        <span className="wiecej" onClick = {() => {
            props.setValueEWB(b)
            props.setValueEWA(a)
            }}>
                więcej {props.czego}
        </span> 
    )
}

const Dzien = (props) => {
    const [year, month, day] = props.days_date.split('-');      //destructuring
    const months = {1: "sty.",2: "lut.",3: "mar.",4: "kwi.",5: "maja",6: "cze.",7: "lip.",
        8: "sie.",9: "wrz.",10: "paź.",11: "lis.",12: "gru.", "01": "sty.","02": "lut.","03": "mar.",
        "04": "kwi.","05": "maja","06": "cze.","07": "lip.","08": "sie.","09": "wrz."}
    const add_event_link = "index.php?a=add_event&d=" + props.days_date
    return(
        <div className={props.classes}>
            <div className="data_dnia">{day} {months[month]} {day==1 && year}</div>
            <div className="plusik"><a href={add_event_link}>&nbsp;+&nbsp;</a></div>
            <div className="eventy" dangerouslySetInnerHTML={{ __html: props.eventy }} />
        </div>
    )
} 

const przerwa = Array.from({ length: 14 }, (_, index) => (<div key={index}>&nbsp;</div>));
                                                                //przerwa z divów między miesiącami
function formattedDate(some_day) {                              //obiekt daty na format 2024-02-09
    let y = some_day.getFullYear()
    let m = (some_day.getMonth() + 1).toString().padStart(2, '0')
    let d = some_day.getDate().toString().padStart(2, '0')      //dopełnienie zerem gdy jednocyfrowa
    return `${y}-${m}-${d}`                                     //Template literals: `${}`
  }

const getThisDayEvents = (events, thisDay) => {
    const thisDayDate = thisDay.toISOString().split('T')[0];
    return events.filter(event => event.kiedy.startsWith(thisDayDate));
  };

const eventyDnia = (events, currentDate) => {
    let thisDayEvents = getThisDayEvents(events, currentDate);
    let thisDayEventsTxt = ''
    thisDayEvents.forEach(elem => {
        let t = elem.kiedy.slice(-5)
        let e = elem.event.slice(0,12)
        thisDayEventsTxt += '<span class="eventy">' + t + ' ' + e + '</span><br>'        //problem braku <br> i czerni zamiast szarości
    });
    return(thisDayEventsTxt)
}