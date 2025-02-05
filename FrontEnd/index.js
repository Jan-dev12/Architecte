// Récupération des données de l'API en JSON pour les Projets
const reponse = await fetch("http://localhost:5678/api/works");
let data = await reponse.json();

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

//Pour se déconnecter
document.getElementById("login").addEventListener("click", () =>
{
    if(token)
    {
        localStorage.removeItem("token");
        window.location.href = "index.html";
        
    }
    else
    {
        window.location.href = "login.html";
    }
})

//Redirige sur login si il n'est pas authentifier et change le texte une fois authentifier
const token = localStorage.getItem("token");
const loginbtn = document.getElementById("login");
const btnModifier = document.querySelector(".modal-btn");

if(token)
{
    console.log("Acces autorise");
    loginbtn.textContent = "logout";
    document.querySelector(".modal-btn").style.display = "block";
}
else
{
    document.querySelector(".modal-btn").style.display = "none";

}
// if (!token)
// {
//     alert(">Accès refusé ! Vous devez être connecté !");
//     window.location.href = "login.html";
//     document.querySelector(".modal-btn").style.display = "none";
// }
// else
// {
//     console.log("Acces autorise");
//     loginbtn.textContent = "logout";
// }

//Pour afficher le modal quand on click sur le button modifier et qu'on le quitte avec le bouton croix
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal()
{
    modalContainer.classList.toggle("active");
};

//afficher la gallerie dans le modal avec la corbeille
function modalGenererFiches(data)
{
    for (let i = 0; i < data.length; i++)
    {
        const sectiongallery = document.querySelector(".modal-gallery");
        
        const contenuElement = document.createElement("div");
        contenuElement.classList.add("contenu-photo-modal");

        const imageElement = document.createElement("img");
        imageElement.src = data[i].imageUrl;
        imageElement.classList.add("mode-photo");
        const corbeilleElement = document.createElement("div");
        corbeilleElement.classList.add("corbeille");
        corbeilleElement.id = data[i].id;
        corbeilleElement.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        
        sectiongallery.appendChild(contenuElement);
        contenuElement.appendChild(imageElement);
        contenuElement.appendChild(corbeilleElement);

    };  
}

modalGenererFiches(data);

//Permet de supprimer une photo
document.addEventListener("click", async function (event)
{
    const idCorbeille = event.target.closest(".corbeille");

    if(idCorbeille)
    {
        console.log(idCorbeille.id);
        const reponse = await fetch(`http://localhost:5678/api/works/${idCorbeille.id}`, 
        {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response =>
        {
            if(response.ok)
            {
                data = data.filter(item => item.id !== parseInt(idCorbeille.id));

                document.querySelector(".modal-gallery").innerHTML = "";
                document.querySelector(".gallery").innerHTML = "";

                genererFiches(data);
                modalGenererFiches(data);
            }
            else
            {
                console.error("Erreur lors de la suppression :", reponse.status)
            }
        })

        document.querySelector(".modal-gallery").innerHTML = "";
        document.querySelector(".gallery").innerHTML = "";
        genererFiches(data);
        modalGenererFiches(data);

    }
})

//Pour switch entre les différent modal
const modalFenetre1 = document.querySelector(".modal-fenetre1");
const modalFenetre2 = document.querySelector(".modal-fenetre2");
const returnModal = document.querySelectorAll(".return-modal");
const modalAjoutPhoto = document.querySelector(".modal-ajout-photo");

modalAjoutPhoto.addEventListener("click", function ()
{
    modalFenetre2.classList.toggle("active");
    modalFenetre1.classList.toggle("active");
})

returnModal.forEach(trigger => trigger.addEventListener("click", togglenextmodal))

function togglenextmodal()
{
    modalFenetre1.classList.toggle("active");
    modalFenetre2.classList.toggle("active");
}

//permet d'afficher les catégories dans le modal
for (let i = 0;i < dataCategorie.length; i++)
    {
        const selectElement = document.getElementById("categories");

    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", dataCategorie[i].id);
    optionElement.innerHTML = dataCategorie[i].name;

    selectElement.appendChild(optionElement);
}

document.querySelector(".btn-ajout-photo").addEventListener("click", function ()
{
    document.getElementById("modal-file").click();
});

document.getElementById("modal-preview").addEventListener("click", function ()
{
    document.getElementById("modal-file").click();
});

let file;

//Pour charger une image et l'afficher sur le modal
document.getElementById("modal-file").addEventListener("change", function (event)
{
    file = event.target.files[0];

    if (file)
    {
        console.log(file);
        const reader = new FileReader();
        reader.onload = function (e)
        {
            const img = document.getElementById("modal-preview");
            img.src = e.target.result;
            img.style.display = "block";
        };
        reader.readAsDataURL(file);
    }

    document.querySelector(".contenu-ajout-photo").style.display = "none";
})

//bouton pour envoyer la requette et ajouter un projet
document.getElementById("ajout").addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const titre = document.getElementById("titre");
    const categorie = document.getElementById("categories");
    
    console.log(titre.value, categorie.value, file.name);

    modalFenetre1.classList.toggle("active");
    modalFenetre2.classList.toggle("active");
    
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", titre.value);
    formData.append("category", categorie.value);
    
    const reponse = await fetch("http://localhost:5678/api/works",
    {
        method: "POST",
        headers: {
            
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    })
    if(reponse.ok)
    {
        const newPhoto = await reponse.json();

        data.push(newPhoto);
        document.querySelector(".gallery").innerHTML = "";
        document.querySelector(".modal-gallery").innerHTML = "";
        
        genererFiches(data);
        modalGenererFiches(data);
        document.getElementById("ajout").reset();

        
    }
    else
    {
        console.error("Erreur lors de la suppression :", reponse.status)
    }
    
    
});