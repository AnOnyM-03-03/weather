let city = 'Samara';
const inputSearch = document.querySelector('.input__search');
const cityNameBlock = document.querySelector('.title__weather');
const tempBlock = document.querySelector('.weather__temp');
const timeBlock = document.querySelector('.weather__time');
const descriptionBlock = document.querySelector('.weather__description');
const weatherBlock = document.querySelector('.weather__wind');

document.addEventListener('keydown', (e) => {
   if (e.key === 'Enter') {
      let value = inputSearch.value;
      if (!value) false;
      city = value;
      init();
      inputSearch.value = '';
   }
});

function init() {
   fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a8f1c47ed68b7a3b449d82e5389b028`
   )
      .then((resp) => resp.json())
      .then((data) => {
         console.log(data);

         cityNameBlock.textContent = data.name;

         tempBlock.innerHTML = `${temperature()}` + '&deg';

         function temperature() {
            let getTemp = data.main.temp;
            let tempC = Math.floor(getTemp) - 273;
            return tempC;
         }

         const date = new Date();
         timeBlock.textContent = `Local time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

         descriptionBlock.textContent = data.weather[0].description;

         weatherBlock.textContent = `wind speed: ${data.wind.speed}`;
      })
      .catch((e) => {
         alert('City is not found');
         city = 'Samara';
         init();
         inputSearch.value = '';
      });
}
init();

setInterval(() => {
   init();
}, 1000);
