import '@css/style.css'

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