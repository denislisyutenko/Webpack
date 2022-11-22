import '@css/style.css'
import './less/style.less'
import './sass/style.sass'
import './sass/style.scss'

// import '@babel/polyfill'

import React from "react";
import {render} from 'react-dom'
import * as ReactDOM from 'react-dom/client';

import '@model/lodash'

import * as $ from 'jquery'
import Post from '@model/post'
import json from '@assets/data'
import logo from '@assets/images.png'
import xml from '@assets/data.xml'
// import csv from '@a/data.scv'


const post = new Post('Webpack Post Title', logo);

$('pre').html(post.toString())

console.log('JSON:', json)
console.log('XML:', xml)

async function start() {
    return await new Promise((resolve) => {
        setTimeout (() => {
            resolve('Async function DONE!')
        }, 3000)
    })
}

start().then(res => console.log(res))

const arr = [1, 2, 3]
console.log(...arr)

const root = ReactDOM.createRoot(document.getElementById('root'))
const App = () => (
    <div className="container">
        <h1>Webpack training with REACT App</h1>
        <div className="logo"/>
        <pre/>

        <div className="less">
            <h2>LESS</h2>
        </div>

        <div className="sass">
            <h2>SASS</h2>
        </div>

        <div className="scss">
            <h2>SCSS</h2>
        </div>
    </div>
);

root.render(<App/>)