// Récupération des données de l'API en JSON pour les Projets
const reponse = await fetch("http://localhost:5678/api/works");
const data = await reponse.json();

function genererFiches(data)
{
    for (let i = 0; i < data.length; i++)
    {
        const sectiongallery = document.querySelector(".gallery");
        
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = data[i].imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = data[i].title;
        
        sectiongallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaption);
    };  
}

genererFiches(data);

// Récupération des données de l'API en JSON pour les Catégories
const categorie = await fetch("http://localhost:5678/api/categories");
const dataCategorie = await categorie.json();

const navElement = document.querySelector(".navigation");

const ulElement = document.createElement("ul");

const liElementTous = document.createElement("li");
liElementTous.classList.add("btn-tous");
const btnElementTous = document.createElement("button");
btnElementTous.innerHTML = "Tous";

navElement.appendChild(ulElement);
ulElement.appendChild(liElementTous);
liElementTous.appendChild(btnElementTous);

for (let i = 0; i < dataCategorie.length; i++)
{
    const liElement = document.createElement("li");
    liElement.classList.add(`btn-${i}`);
    const btnElement = document.createElement("button");
    btnElement.innerHTML = dataCategorie[i].name;

    navElement.appendChild(ulElement);
    ulElement.appendChild(liElement);
    liElement.appendChild(btnElement);
};

console.log(dataCategorie)
console.log(data);

//bouton pour trier les projets part catégories
const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function ()
{
    const filtreTous = data.filter(function (data)
    {
        return data;
    });
    
    document.querySelector(".gallery").innerHTML = "";
    genererFiches(filtreTous);
});

const boutonObjets = document.querySelector(".btn-0");
boutonObjets.addEventListener("click", function () 
{
    const filtreObjets = data.filter(function (data) 
    {
        return data.categoryId == 1;
    });

    document.querySelector(".gallery").innerHTML = "";
    genererFiches(filtreObjets);
});

const boutonAppartements = document.querySelector(".btn-1");
boutonAppartements.addEventListener("click", function () 
{
    const filtreAppartements = data.filter(function (data)
    {
        return data.categoryId == 2;
    });

    document.querySelector(".gallery").innerHTML = "";
    genererFiches(filtreAppartements);
});

const boutonHotelsRestaurants = document.querySelector(".btn-2");
boutonHotelsRestaurants.addEventListener("click", function () 
{
    const filtreHotelRestaurants = data.filter(function (data)
    {
        return data.categoryId == 3
    });
    
    document.querySelector(".gallery").innerHTML = "";
    genererFiches(filtreHotelRestaurants);
});