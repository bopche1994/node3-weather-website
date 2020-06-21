const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()    /* preventing default behaviour of the browser for an event e ....*/
    const location = search.value
    // console.log(location)
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
                
            }else{
                // console.log(data.Location)
                // console.log(data.Forecast)
                messageOne.textContent = data.Location
                messageTwo.textContent = data.Forecast
              
            }
        })
    })
})

// console.log('testing how to include client side javascript testing or client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })

// })

// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.Location)
//             console.log(data.Forecast)
//         }
//     })
// })
