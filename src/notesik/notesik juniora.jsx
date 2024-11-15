/* eslint-disable react/prop-types */
//import React from 'react'
import ReactDOM from 'react-dom/client'

function getRandomNumber() {
  return Math.round(Math.random()*100)
}
const element1 = <div>random: {getRandomNumber()}</div>
const element2 = <div>cztery: {2+2}</div>
const element3 = (<> <span>123</span> <span>567</span> </>)     //"fragment" bo wyrażenia JSX muszą mieć jeden element nadrzędny.
const auto1 = {marka:"Mazda", rok: 2010, kolor:"zielona", url: "some.url"}    //obiekt
const auto2 = {marka:"Kamaz", rok: 1992, kolor:"szary", url: "some.other.url"}
const Url = (props) => <a href={props.url}>{props.url}</a>   //komponent dostaje propertisy jako obiekt
const enter = <br />
const AutkoInfo = (props) => <div>{props.kolor} <b>{props.marka}</b> z roku {props.rok} url: <Url url={props.url} /></div>

const wszystko = 
    <div>
      {element1}{element2}{element3} 
      {enter} url auta1: <Url url={auto1.url}></Url> 
      {enter} url auta2: <Url url={auto2.url} />
      <AutkoInfo kolor={auto1.kolor} marka={auto1.marka} rok={auto1.rok} url={auto1.url} />
      <AutkoInfo  kolor={auto2.kolor} marka={auto2.marka} rok={auto2.rok} url={auto2.url} />
    </div>
//console.log(wszystko)

ReactDOM.createRoot(document.getElementById('root')).render(wszystko)

/*
random: 23
cztery: 4
123 567
url auta1: some.url
url auta2: some.other.url
zielona Mazda z roku 2010 url: some.url
szary Kamaz z roku 1992 url: some.other.url
*/