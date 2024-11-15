import { useState } from "react";

export const Form = () => {
    const [name, setName] = useState("");   //Zaleca się do każdego pola formularza przypisać zmienną stanową
    const [rok, setRok] = useState("");      //to tzw. kontrolowane inputy
    const [kolor, setKolor] =useState("");
    const [url, setUrl] = useState("");
    return (
        <form
            onSubmit = {(e) => {            //Reactowy event handler dla eventa "submit"
                e.preventDefault();         //żeby nie przeładował strony po kliknięciu "Zapisz"
                console.log({name, rok, kolor, url});
            }}
        >
            <div>
                <input 
                    defaultValue={name}                             //tu i niżej - synchronizacja zmiennej stanowej i imputa
                    onChange={(e) => { setName(e.target.value); }}  //jako funkcja anonimowa, żeby złapać event e
                    type = "text" 
                    name = "marka" 
                    placeholder = "Marka" />
            </div>
            <div>
                <input 
                    defaultValue={rok}                              
                    onChange={(e) => { setRok(e.target.value); }}   
                    type = "text" 
                    name = "rok" 
                    placeholder = "Rok produkcji" />
            </div>
            <div>
                <input 
                    defaultValue={kolor}
                    onChange={(e) => { setKolor(e.target.value); }}
                    type = "text" 
                    name = "kolor" 
                    placeholder = "Kolor" />
            </div>
            <div>
                <input 
                    defaultValue={url}
                    onChange={(e) => { setUrl(e.target.value); }}
                    type = "text" 
                    name = "url" 
                    placeholder = "Adres URL" />
            </div>
            <button disabled = {name.length * rok.length * kolor.length * url.length === 0} >Zapisz</button>
        </form>
    );
};