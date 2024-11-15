/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import { initialEvents, initialHints } from './Consts';


const NotepadContext = createContext();

export const NotepadProvider = ({ children }) => {

    const [events, setEvents] = useState(initialEvents);
    const [hints, setHints] = useState(initialHints);


    // Funkcje do modyfikowania stanów
    const addEvent = (event) => {
        setEvents([...events, event]);
    };
    const addHint = (hint) => {
        setHints([...hints, hint]);
    };
    const removeEvent = (eventIndex) => {
        setEvents(events.filter((_, index) => index !== eventIndex));
    };
    const removeHint = (hintIndex) => {
        setHints(hints.filter((_, index) => index !== hintIndex));
    };


    // Zwracamy provider, który przekazuje dane do komponentów.
    // children to specjalny props, który zawiera elementy umieszczone wewnątrz. Dzięki temu, NotepadProvider
    // może „owijać” inne komponenty, dając im dostęp do danych i funkcji, które udostępnia.
    return (
        <NotepadContext.Provider value={{ events, hints, addEvent, addHint, removeEvent, removeHint }}>
        {children}
        </NotepadContext.Provider>
    );
};

// Custom hook do łatwego dostępu do kontekstu
// można będzie w komponencie użyć: const { events, hints, addEvent, addHint } = useNotepadContext();
// by uzyskać dostęp do danych z kontekstu
export const useNotepadContext = () => {
  return useContext(NotepadContext);
};
