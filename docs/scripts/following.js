import * as mockroblog from './mockroblog.js'
import * as mockroblog2 from './extraData.js'
window.mockroblog = mockroblog

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
    if (!duplicate)
    {
        followArr.push(temp)
        if (window.location.pathname === '/followers.html') {
            let timelinePost = document.createElement('div')
            timelinePost.className = 'p-5 m-5 rounded-lg bg-black hover:bg-purple-700'
    
            timelinePost.innerHTML += mockroblog2.getUsername(timeline[i].user_id)
            
            document.getElementById("timeline").append(timelinePost)
        }
    }
}
window.sessionStorage.setItem("follow-arr", JSON.stringify(followArr))