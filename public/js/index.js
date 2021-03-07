
console.log("File ")
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    p1.textContent = 'Loading....';
    p2.textContent = '';
    fetch(`/weather?address=${search.value}`, ).then(res => res.json())
.then(data=> {
    if (data.error) {
        p1.textContent = data.error;
    }
    else{
        p1.textContent = '';
        p2.textContent = `You're currently in ${data.location}. The temperature is ${data.temperature}. 
        But it feels like ${data.feelslike}. It's actually ${data.weather_descriptions}`
    }
})
.catch(err => console.log(err))
})