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
} else if (document.getElementById('following_tl') === document.querySelector('.active')) {
  timeline = mockroblog.getPublicTimeline() // Change to getFollowers (will need to implement this in extraData.js)
}

// Logged in as {username} on navbar

const loginStatus = document.getElementById('login-status')
loginStatus.innerHTML = 'Logged in as @' + username
const loginStatusMobile = document.getElementById('login-status-mobile')
loginStatusMobile.innerHTML = 'Logged in as @' + username



// Logout when hitting logout button

function logout() {
  window.sessionStorage.clear()
  window.location.href = './'
}

// Redirect to login page if not logged in

if (!window.sessionStorage.getItem('username')){
  alert("Error: You must be logged in!")
  window.location.href = './'
}

document.getElementById('logout-button').onclick = function () { logout() }

// Generate div for each blog post

for (let i = 0; i < timeline.length; i++) {
  const timelinePost = document.createElement('div')
  timelinePost.className = 'p-5 m-5 rounded-lg bg-black hover:bg-purple-700 break-words'

  timelinePost.innerHTML += mockroblog2.getUsername(timeline[i].user_id)
  timelinePost.innerHTML += "<span class = 'float-right'>" + timeline[i].timestamp + '</span>' + '<br>' + '<hr>'
  timelinePost.innerHTML += timeline[i].text

  document.getElementById('timeline').append(timelinePost)
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

    newPostDiv.innerHTML += mockroblog2.getUsername(parseInt(postData.user_id))
    newPostDiv.innerHTML += "<span class = 'float-right'>" + postData.timestamp + '</span>' + '<br>' + '<hr>'
    newPostDiv.innerHTML += postData.text

    document.getElementById('new-post-area').after(newPostDiv)
    newPostArea.classList.toggle("hidden")
  }
}

document.getElementById('post-button').onclick = function () { publishPost() }
