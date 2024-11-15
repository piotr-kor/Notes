/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

// Tworzymy kontekst z domyślnymi wartościami
const NotepadContext = createContext();

export const NotepadProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [hints, setHints] = useState([]);


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


  return (
    <NotepadContext.Provider value={{ events, hints, addEvent, addHint, removeEvent, removeHint }}>
      {children}
    </NotepadContext.Provider>
  );
};

// Hook do łatwego dostępu do kontekstu
export const useNotepadContext = () => {
  return useContext(NotepadContext);
};

function Component1() {
  const [newEvent, setNewEvent] = useState('');
  const { addEvent, events } = useNotepadContext();

  const handleAddEvent = () => {
    if (newEvent) {
      addEvent(newEvent);
      setNewEvent('');
    }
  };

  return (
    <div>
      <h2>Component 1 - Wydarzenia</h2>
      <input
        type="text"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        placeholder="Dodaj wydarzenie"
      />
      <button onClick={handleAddEvent}>Dodaj wydarzenie</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}

function Component2() {
  const [newHint, setNewHint] = useState('');
  const { addHint, hints } = useNotepadContext();

  const handleAddHint = () => {
    if (newHint) {
      addHint(newHint);
      setNewHint('');
    }
  };

  return (
    <div>
      <h2>Component 2 - Wskazówki</h2>
      <input
        type="text"
        value={newHint}
        onChange={(e) => setNewHint(e.target.value)}
        placeholder="Dodaj wskazówkę"
      />
      <button onClick={handleAddHint}>Dodaj wskazówkę</button>
      <ul>
        {hints.map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>
    </div>
  );
}

function Component3() {
  const { events, hints, removeEvent, removeHint } = useNotepadContext();

  return (
    <div>
      <h2>Component 3 - Zarządzaj</h2>
      <div>
        <h3>Wydarzenia</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event} <button onClick={() => removeEvent(index)}>Usuń</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Wskazówki</h3>
        <ul>
          {hints.map((hint, index) => (
            <li key={index}>
              {hint} <button onClick={() => removeHint(index)}>Usuń</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <NotepadProvider>
      <div>
        <h1>Moja Aplikacja</h1>
        <Component1 />
        <Component2 />
        <Component3 />
      </div>
    </NotepadProvider>
  );
}

export default App;
