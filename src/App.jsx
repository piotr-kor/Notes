import './App.css'
import { copyright, motto } from './components/Consts'
import { Kalendarz } from './components/Kalendarz'
import { NotepadProvider } from './components/NotepadContext'

function App() {
  return (
    <NotepadProvider>
      <div id="kontener">
        <header>{motto}</header>
        <div>
          <main>
            <article id="main_box">
              <h3>Display header</h3>
              <div>Display content</div>
            </article>
          </main>
          <aside>
            <div id="aside_left">
              <section>
              <h3>To do</h3>
                Display to_do
              </section>
            </div>
            <div id="aside_center">
              <section>
                <h3>Lista notatek</h3>
                Display lista_notatek
              </section>
            </div>
            <div id="aside_right">
              <section>
                <h3>Bezpieczeństwo</h3>
                Display  login_form
              </section>
              <section>
                <h3>Tegi notatek</h3>
                Display lista_tagow
              </section>
              <section>
                <h3>Hinty</h3>
                Display kategorie_hintow
              </section>
            </div>
          </aside>
        </div>
        <footer>
          <Kalendarz />
          {copyright}
        </footer>
    </div>
  </NotepadProvider>
  )
}
export default App

/*
import { useState } from "react"
import { AutkoInfo } from "./components/AutkoInfo"    //Ctrl + i
import { Form } from "./components/Form"

const auto1 = {marka:"Mazda", rok: 2010, kolor:"zielona", url: "some.url"}
const auto2 = {marka:"Kamaz", rok: 1992, kolor:"szary", url: "some.other.url"}
const auta = [
  {marka:"Fiat", rok: 2022, kolor:"niebieski", url: "some.new.url"},
  {marka:"Opel", rok: 2011, kolor:"zielony", url: "url1.url"},
  {marka:"Honda", rok: 2007, kolor:"czerwona", url: "url2.url"}
]
const enter = <br />

function App() {
  const [isFormShown, setIsFormShown] = useState(false);   //destructuring - tworzę zmienną i funkcję podstawiając ze zwracanej tablicy 
  const handleShowFormClick = () => setIsFormShown(true);  //do event handlera przekazujemy całą definicję tej funkcji a nie tylko jej wywołanie - zatem bez ()
  return (
      <div> 
        <h1>Komis</h1>
        {isFormShown ? (<Form />) : (<span onClick = {handleShowFormClick}>Dodaj autko </span>)}
        
        <AutkoInfo kolor={auto1.kolor} marka={auto1.marka} rok={auto1.rok} url={auto1.url} />
        <AutkoInfo  kolor={auto2.kolor} marka={auto2.marka} rok={auto2.rok} url={auto2.url} />
        {
          auta.map((fura) => (
            <AutkoInfo 
                key={fura.url}    //Potrzebne do optymalizacji unikalne id (jeśli brak to losujemy w tabeli np. id:crypto.randomUUID() )
                kolor={fura.kolor} 
                marka={fura.marka} 
                rok={fura.rok} 
                url={fura.url} />
          ))
        }
      {enter}1:57:30 Komunikacja komponentów.
      </div>
  )
}

export default App
*/