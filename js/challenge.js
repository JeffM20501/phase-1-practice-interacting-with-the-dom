// DOM ELEMENTS
const counterEl=document.getElementById('counter')
const minusEl = document.getElementById('minus')
const plusEl = document.getElementById('plus')
const formEl = document.getElementById('comment-form')
const inputEl = document.getElementById('comment-input')
const pauseEl  = document.getElementById('pause')
const heartEl = document.getElementById('heart')


//global varibles
let intervalId=null //will later store our interval
let count={} // will store like count

//functions
function leaveComment(form, input){
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const p = document.createElement('p')
        p.textContent= input.value
        document.getElementById('list').appendChild(p)
        form.reset()
    })
}

function incrementDecrement(plus, minus, counter){
    minus.addEventListener('click', ()=>{
        counter.textContent=parseInt(counter.textContent, 10)-1
    })

    plus.addEventListener('click', ()=>{
        counter.textContent=parseInt(counter.textContent, 10)+1
    })
}

function incrementByTime(counter){
    intervalId= setInterval(function(){
        counter.textContent=parseInt(counter.textContent, 10)+1
    }, 1000)
}

function stopIncrement(){
    if(intervalId!==null){
        clearInterval(intervalId)
        intervalId=null//reset 
    }
}


function pauseResumeFunc(pause, counter, form, plus, minus, like){
    pause.addEventListener('click', ()=>{
        if(pause.textContent.trim().toLowerCase()==='pause'&&intervalId!==null){
            stopIncrement()
            pause.textContent='resume'
            form.querySelector('button').disabled=true
            plus.disabled=true
            minus.disabled=true
            like.disabled=true
        }else{
            incrementByTime(counter)
            pause.textContent='pause'
            form.querySelector('button').disabled=false
            plus.disabled=false
            minus.disabled=false
            like.disabled=false
        } 
    })
}

function likerFunc(like, counter){
    like.addEventListener('click', ()=>{
        const li = document.createElement('li')
        const num =parseInt(counter.textContent, 10)
        count[num]=(count[num]||0)+1
        console.log(count[num])
        let text=`${counter.textContent} has been liked ${count[num]} times`
        li.textContent=text
        document.querySelector('.likes').appendChild(li)
    })
}


//function calls
leaveComment(formEl, inputEl)
incrementDecrement(plusEl, minusEl, counterEl)
incrementByTime(counterEl)
pauseResumeFunc(pauseEl, counterEl, formEl, plusEl, minusEl, heartEl)
likerFunc(heartEl, counterEl)