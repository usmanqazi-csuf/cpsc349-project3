import * as mockroblog from './mockroblog.js'
import * as mockroblog2 from './extraData.js'
window.mockroblog = mockroblog
//import * as extraData from './extraData.js'  //will need this line for project 4, when I add to extraData.js
/*const followers = mockroblog.addFollower(6,7)

const display = document.querySelector('#followers-json')
display.textContent = JSON.stringify(followers, null, 2)
*/
let timeline = null
const username = window.sessionStorage.getItem('username')
timeline = mockroblog.getHomeTimeline(username)

let followArr = []
for (let i = 0; i < timeline.length; i++) {
    let temp = mockroblog2.getUsername(timeline[i].user_id)
    let duplicate = false
    for (let j = 0; j < followArr.length; j++)
    {
        if(temp === (followArr[j]))
        {
            duplicate = true
        }
    }
    if(!duplicate)
    {
        followArr[i] = temp
        let timelinePost = document.createElement('div')
        timelinePost.className = 'p-5 m-5 rounded-lg bg-black hover:bg-purple-700'

        timelinePost.innerHTML += mockroblog2.getUsername(timeline[i].user_id)
        //timelinePost.innerHTML += "<span class = 'float-right'>" + timeline[i].timestamp + "</span>" + "<br>"  + "<hr>"
        //timelinePost.innerHTML += timeline[i].text
        
        document.getElementById("timeline").append(timelinePost)
    }
}