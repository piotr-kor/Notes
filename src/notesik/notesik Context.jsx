import { createContext, useContext } from 'react';

// Tworzymy kontekst dla gatunków drzew
const LasContext = createContext();

// Komponent główny Las
export function Las() {
  const gatunkiDrzew = ["Dąb", "Sosna", "Brzoza", "Buk", "Świerk"];

  return (
    <LasContext.Provider value={gatunkiDrzew}>
      <h1>Las</h1>
      <Zagajnik />
      <Polana />
    </LasContext.Provider>
  );
}

// Komponent Zagajnik
function Zagajnik() {
  const gatunkiDrzew = useContext(LasContext);

  return (
    <div>
      <h2>Zagajnik</h2>
      <p>Dominujący gatunek drzewa: {gatunkiDrzew[0]}</p>
    </div>
  );
}

// Komponent Polana
function Polana() {
  const gatunkiDrzew = useContext(LasContext);

  return (
    <div>
      <h2>Polana</h2>
      <p>Dominujący gatunek drzewa: {gatunkiDrzew[1]}</p>
    </div>
  );
}

export default Las;
