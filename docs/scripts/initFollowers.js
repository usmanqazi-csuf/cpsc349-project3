import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog
// import * as extraData from './extraData.js'  //will need this line for project 4, when I add to extraData.js
const followers = mockroblog.addFollower(6, 7)

const display = document.querySelector('#followers-json')
display.textContent = JSON.stringify(followers, null, 2)

/*
DO NOT DELETE THIS FILE! IT SEEMS SUPERFLUOUS RIGHT NOW BUT I HAVE A PLAN TO USE IT LATER.
*/
