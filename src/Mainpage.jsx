import React, { useState } from "react";

function Mainpage(props){


    return <>
        <h1>本周({props.data.curWeek})晨兴与读经进度</h1>
        <hr></hr>
        <h2>{props.data.items[0].name}</h2>
        <h3>书目: {props.data.items[0].book}</h3>
        <h3>进度: <a href={props.data.items[0].link}>{props.data.items[0].chapter} {props.data.items[0].subject}</a></h3>
        <h2>{props.data.items[1].name}</h2>
        <h3>{props.data.items[1].books[0].name}:
            <> <a href={props.data.items[1].link}>
            {props.data.items[1].books[0].books.map((book)=>{
                return <>{book.name} {book.chapters}</>
            })}
        </a></></h3>
        <h3>{props.data.items[1].books[1].name}:
            <> <a href={props.data.items[1].link}>
            {props.data.items[1].books[1].books.map((book)=>{
                return <> {book.name} {book.chapters}</>
            })}
        </a></></h3>
        <h2>{props.data.items[2].name}</h2>
        <h3>进度:
            <> <a href={props.data.items[2].link}>
            {props.data.items[2].books.map((book)=>{
                return <> {book.name} {book.chapters}</>
            })}
        </a></></h3>
        <h3>展览日期:  {props.data.items[2].date}</h3>
    </>;
}

export default Mainpage;