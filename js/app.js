const loadMeals = item => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
    .catch(error => {
        console.log(error);
    })
}

const displayMeals = meals =>{
    //console.log(meals);
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = '';
    meals.forEach(meal => {
        //console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
            <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,300)}</p>
            <button onclick="modalOpen('${meal.idMeal}')" type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#myModal">
            Details
            </button>
            </div>
            </div>
        `;
        foodContainer.appendChild(mealDiv);
    })
}

document.getElementById('button').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const inputValue = searchField.value;
    console.log(inputValue);
    loadMeals(inputValue);
})

const modalOpen = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayModals(data.meals[0]))
    .catch(error => {
        console.log(error);
    })
}
const displayModals = item => {
    console.log(item);
    const modalContainer = document.getElementById('modals');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContainer.innerHTML = ``;
    modalContent.innerHTML = `

        <div class="modal-header">
        <h1 class="modal-title">${item.strCategory}</h1>
        <button type="button" class="close" data-dismiss="modal">×</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
        <div class='col'>
        <div class="card">
            <img src="${item.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-title"><span class="fw-bold">Meal Name : </span>${item.strMeal}</p>
            <p ><span class="fw-bold">Description : </span>${item.strInstructions}</p>
            <br/>
            <p><span class="fw-bold">Area : </span>${item.strArea}</p>
            <p><span class="fw-bold">Category : </span>${item.strCategory}</p>
            </div>
            </div>
        </div>    
        </div>          
        <!-- Modal footer -->
        <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>  
    `;
    modalContainer.appendChild(modalContent);

}

loadMeals('');