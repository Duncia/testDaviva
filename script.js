/*
Initializing getData function at the very beginning to display the first car on page load.
*/

getData();

/*
ID and allCars array is declared here and used to generate ID (which is used in HTML construction) at the start (first car) and later update each car with new data.
*/

let id;

const allCars = [];

const getId = function(arr) {
    if (arr.length > 0) {
        id = arr.length;
        return id;
    } else {
        id = 0;
        return id;
    }
} 

/*
Function to get data from API. Seems clumsy, but oh well. :)

I used https://cors-anywhere.herokuapp.com/ to get data and avoid CORS error.
*/

function getData() {
    
    // 1. Fetch used to retrieve data from JSON.
            fetch
            (`https://cors-anywhere.herokuapp.com/https://backend.daviva.lt/API/InformacijaTestui`)
            .then(result => {
            return result.json();
        })
            .then(data => {
                
    // 2. Then data is assigned to variables that will be used further.      
                let make = data.marke;
                let model = data.modelis;
                let year = data.metai;
                let price = data.kaina;
                let photos = data.nuotraukos;
                let photo = data.nuotraukos[0];
                let photo2 = data.nuotraukos[1];
                let photo3 = data.nuotraukos[2];
                let photo4 = data.nuotraukos[3];
                let photo5 = data.nuotraukos[4];
                let newAuto;
                
    // 3. Function constructor is used to create new object from received data.
                newAuto = new NewCar(make, model, year, price, photos);
                
    // 4. New car is pushed to array which is used to get ID later and maybe for future.
                allCars.push(newAuto);
                
    // 5. ID is received using function above and new array of cars.
                let autoID = getId(allCars);
    
    /*
    6. Content block which is used to create new car - content box with images and text.
    The last part of it inserts the newly generate HTML to the page.
    */
                var content, newContent;
                
                content = `<div class="card" style="width: 18rem;"><div id="carousel-${autoID}" class="carousel slide" data-ride="carousel"><div class="carousel-inner"><div class="carousel-item active"><img id="cardImage-1" class="d-block" src="%autoImage1%" alt="Nuotrauka įkeliama." width="288" height="216"></div><div class="carousel-item"><img id="cardImage-2" class="d-block" src="%autoImage2%" alt="Nuotrauka įkeliama." width="288" height="216"></div><div class="carousel-item"><img id="cardImage-3" class="d-block" src="%autoImage3%" alt="Nuotrauka įkeliama." width="288" height="216"></div><div class="carousel-item"><img id="cardImage4" class="d-block" src="%autoImage4%" alt="Nuotrauka įkeliama." width="288" height="216"></div><div class="carousel-item"><img id="cardImage-5" class="d-block" src="%autoImage5%" alt="Nuotrauka įkeliama." width="288" height="216"></div></div><a class="carousel-control-prev" href="#carousel-${autoID}" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Atgal</span></a><a class="carousel-control-next" href="#carousel-${autoID}" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Pirmyn</span></a></div><div class="card-body"><h5 id="autoTitle" class="card-title">%carTitleNew%</h5><p id="autoModel" class="card-text">Modelis: %autoModelNew%</p><p id="autoYear" class="card-text">Metai: %year%</p><div id="autoPrice" class="showPrice">%priceNew% EUR</div></div></div>`;
                
                newContent = content.replace('%carTitleNew%', make);
                newContent = newContent.replace('%autoModelNew%', model);
                newContent = newContent.replace('%year%', year);
                newContent = newContent.replace('%priceNew%', price);
                newContent = newContent.replace('%autoImage1%', photo);
                newContent = newContent.replace('%autoImage2%', photo2);
                newContent = newContent.replace('%autoImage3%', photo3);
                newContent = newContent.replace('%autoImage4%', photo4);
                newContent = newContent.replace('%autoImage5%', photo5);
    
                document.querySelector('.cardSection').insertAdjacentHTML('beforeend', newContent);
           
            })

        }
        
// 7. Button addAuto generates new car in the page.

document.getElementById('addAuto').addEventListener('click', function() {
    getData()
      
});

// 8. Function contructor for the new object of car.

const NewCar = function(make, model, year, price, photos = []) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.price = price;
    this.photos = photos;
}
