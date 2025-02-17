document.getElementById("login").addEventListener("submit", async function (event)
{
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;
    const form = event.target;

    try
    {
        const reponse = await fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await reponse.json();

        if (reponse.ok)
        {
            localStorage.setItem("token", result.token);
            window.location.href = "index.html";
        }
        else
        {
            const information = document.querySelector(".information");
            information.style.display = "block";
            setTimeout(() => {
                information.style.display = "none";
            }, 3000);
            form.reset();
        }

    }
    catch (error)
    {
        console.error("Erreur :", error);
    }
})