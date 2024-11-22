export const eventyDnia = (events, currentDate) => {
    let thisDayEvents = getThisDayEvents(events, currentDate);
    let thisDayEventsTxt = ''
    thisDayEvents.forEach(elem => {
        let t = elem.kiedy.slice(-5)
        let e = elem.event.slice(0,12)
        thisDayEventsTxt += '<span class="eventy">' + t + ' ' + e + '</span><br>'        //problem braku <br> i czerni zamiast szarości
    });
    return(thisDayEventsTxt)
}
export const getThisDayEvents = (events, thisDay) => {
    const thisDayDate = thisDay.toISOString().split('T')[0];
    return events.filter(event => event.kiedy.startsWith(thisDayDate));
  };