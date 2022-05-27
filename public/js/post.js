document.querySelector("#update").addEventListener("submit", e => {
    e.preventDefault();
    const id = parseInt(window.location.pathname.split('/')[2])
    const userObj = {
        text:document.querySelector("#text").value 
    }
    fetch(`/api/comments/${id}`, {
        method:"POST",
        body:JSON.stringify(userObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then (res => {
        if(res.ok){
            location.reload()
        } else {
            alert("wrong credentials")
        }
    })
})
