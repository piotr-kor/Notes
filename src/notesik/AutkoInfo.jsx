import { useState } from "react";
import { Url } from "./Url";

/* eslint-disable react/prop-types */
export const AutkoInfo = (props) => {
    let stateArray = useState(false);   //argument useState to wartość początkowa i staje się...
    let isExpanded = stateArray[0];     //pierwszą wartość do tablicy, czyli false
    let setIsExpanded = stateArray[1];  //druga wartość tablicy to funkcja aktualizująca komponent

    const buttonik =(
        <span
            onClick={() => {
                setIsExpanded(!isExpanded);
            }}
        > {isExpanded ? <> &lt;--</> :<> ...</>}
        </span>);

    return (
    <div>
        {props.kolor} <b>{props.marka}</b>
        {isExpanded && (<> z roku {props.rok} url: <Url url={props.url} /></>)}
        {buttonik}
    </div>
)};