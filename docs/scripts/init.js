import * as mockroblog from './mockroblog.js'
import * as mockroblog2 from './extraData.js'

window.mockroblog = mockroblog

// Determine what type of content to display

let timeline = null
const username = window.sessionStorage.getItem('username')

if (document.getElementById('home_tl') === document.querySelector('.active')) {
  timeline = mockroblog.getHomeTimeline(username)
} else if (document.getElementById('user_tl') === document.querySelector('.active')) {
  timeline = mockroblog.getUserTimeline(username)
} else if (document.getElementById('public_tl') === document.querySelector('.active')) {
  timeline = mockroblog.getPublicTimeline()
}

// Logged in as {username} on navbar

const loginStatus = document.getElementsByClassName('login-status')

for (let i = 0; i < loginStatus.length; i++)
{
  loginStatus[i].innerHTML = 'Logged in as @' + username
}

// Logout when hitting logout button

function logout() {
  window.sessionStorage.clear()
  window.location.href = './'
}

document.getElementById('logout-button').onclick = function () { logout() }
document.getElementById('mobile-logout-button').onclick = function () { logout() }

// Redirect to login page if not logged in

if (!window.sessionStorage.getItem('username')) {
  window.location.href = './'
  window.sessionStorage.setItem('login-error', 'Error: You must log in first!')
}


// Mobile dropdown navbar

const mobileBtn = document.getElementById('mobile-menu-button')
const mobileMenu = document.getElementById('mobile-menu')
const menuBtnIcon = document.getElementById('mobile-menu-button-icon-menu')

mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden')

  if (menuBtnIcon.id === 'mobile-menu-button-icon-menu') {
    menuBtnIcon.setAttribute('d', 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293' +
        ' 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z')
    menuBtnIcon.setAttribute('id', 'mobile-menu-button-icon-x')
  } else {
    menuBtnIcon.setAttribute('d', 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110' +
        ' 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z')
    menuBtnIcon.setAttribute('id', 'mobile-menu-button-icon-menu')
  }
})

// Generate div for each blog post

if (timeline !== null) {
  for (let i = 0; i < timeline.length; i++) {
    let tempID = mockroblog2.getUsername(timeline[i].user_id)
    const timelinePost = document.createElement('div')
    timelinePost.className = 'p-5 m-5 rounded-lg bg-black hover:bg-purple-700'
    timelinePost.innerHTML += "<div class='flex flex-row text-center items-center justify-between mb-2'>"
    + "<p>" + tempID + "</p>"
    + "<button class='"+tempID+"-follow-button bg-indigo-500 rounded-lg p-1'></button></div><hr>"
    timelinePost.innerHTML += "<div class='post-text m-2'>" + timeline[i].text + "</div>"
    timelinePost.innerHTML += "<hr><p class='mt-2'>" + timeline[i].timestamp + "</p>"
  
    document.getElementById('timeline').append(timelinePost)
    // follow/unfollow
    let followArr = window.sessionStorage.getItem("follow-arr")
    followArr = JSON.parse(followArr)
    //console.log("followArr ==" + followArr)
    let found = false
    for(let j = 0; j< followArr.length; j++)
    {
      //console.log("followArr[j]ID=="+followArr[j]+" tempID ==" + tempID)
      if(tempID === followArr[j]) // if found, button is unfollow
      {
          //console.log("followArr[j]ID=="+followArr[j]+" tempID ==" + tempID)
          found = true
          let buttonArr = document.getElementsByClassName(tempID+"-follow-button")
          for(let k = 0; k < buttonArr.length; k++)
          {
              buttonArr[k].innerHTML = "UNFOLLOW"
          }
      }
    }
    if(!found)  // if not found, button is follow
    {
      let buttonArr = document.getElementsByClassName(tempID+"-follow-button")
      for(let l = 0; l < buttonArr.length; l++)
      {
        buttonArr[l].innerHTML = "FOLLOW!"
      }
    }
  }
}

// New post dropdown menu

const newPostBtn = document.getElementById('new-post-button')
const newPostArea = document.getElementById('new-post-area')

newPostBtn.addEventListener('click', () => {
  newPostArea.classList.toggle('hidden')
})

// Post button functionality

function publishPost () {
  const newPostText = document.getElementById('new-post-text').value
  if (newPostText) {
    const postData = mockroblog.postMessage(window.sessionStorage.getItem('uid'), newPostText)
    document.getElementById('new-post-text').value = ''

    // Generate and display new div
    const newPostDiv = document.createElement('div')
    newPostDiv.className = 'p-5 m-5 rounded-lg bg-black hover:bg-purple-700'

    newPostDiv.innerHTML += window.sessionStorage.getItem('username')
    newPostDiv.innerHTML += "<span class = 'float-right'>" + postData.timestamp + '</span>' + '<br>' + '<hr>'
    newPostDiv.innerHTML += postData.text

    document.getElementById('new-post-area').after(newPostDiv)
    newPostArea.classList.toggle("hidden")
  }
}

document.getElementById('post-button').onclick = function () { publishPost() }
