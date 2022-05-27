document.querySelector("#update").addEventListener("submit", e => {
    e.preventDefault();
    const id = parseInt(window.location.pathname.split('/')[2])
    const userObj = {
        title:document.querySelector("#title").value,
        text:document.querySelector("#text").value
    }
    fetch(`/api/posts/${id}`, {
        method:"PUT",
        body:JSON.stringify(userObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then (res => {
        if(res.ok){
            location.href="/"
        } else {
            alert("wrong credentials")
        }
    })
})

