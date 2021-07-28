import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

let timeline = null

if (document.querySelector("#home_tl") === document.querySelector('.active'))
{
    timeline = mockroblog.getHomeTimeline('ProfAvery') //Change to get home timeline
}
else if (document.querySelector("#user_tl") === document.querySelector('.active'))
{
    timeline = mockroblog.getUserTimeline('ProfAvery') //Change to get user timeline
}
else if (document.querySelector('#public_tl') === document.querySelector('.active'))
{
    timeline = mockroblog.getPublicTimeline() //Change to get public timeline
}

for (let i = 0; i < timeline.length; i++) {
    let timelinePost = document.createElement('div')
    timelinePost.className = 'p-5 m-5 rounded-lg bg-black hover:bg-purple-700'

    timelinePost.innerHTML += "User " + timeline[i].user_id
    timelinePost.innerHTML += "<span class = 'float-right'>" + timeline[i].timestamp + "</span>" + "<br>"  + "<hr>"
    timelinePost.innerHTML += timeline[i].text
    
    document.getElementById("timeline").append(timelinePost)
}

// New post dropdown menu

const newPostBtn = document.querySelector("button.new-post-button")
const newPostArea = document.querySelector(".new-post-area")

newPostBtn.addEventListener("click", () => {
    newPostArea.classList.toggle("hidden")
})
