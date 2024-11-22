/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Kalendarz.css'
import { useNotepadContext } from './NotepadContext';
import { Dzien } from './Dzien'
import { eventyDnia } from './EventyDnia';

export const Kalendarz = () => {
    // eslint-disable-next-line no-unused-vars
    const { events, addEvent, removeEvent } = useNotepadContext();
    const [extraWeeksBefore, setExtraWeeksBefore] = useState(0)
    const [extraWeeksAfter, setExtraWeeksAfter] = useState(0)
    const [zoomedDay, setZoomedDay] = useState('2000-13-32')
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
          //console.log (zoomedDay)
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
                            isZoomed={day.days_date==zoomedDay}
                            setZoomedD={setZoomedDay}
                            zoomedD={zoomedDay}
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

const przerwa = Array.from({ length: 14 }, (_, index) => (<div key={index}>&nbsp;</div>));
                                                                //przerwa z divów między miesiącami
function formattedDate(some_day) {                              //obiekt daty na format 2024-02-09
    let y = some_day.getFullYear()
    let m = (some_day.getMonth() + 1).toString().padStart(2, '0')
    let d = some_day.getDate().toString().padStart(2, '0')      //dopełnienie zerem gdy jednocyfrowa
    return `${y}-${m}-${d}`                                     //Template literals: `${}`
  }



