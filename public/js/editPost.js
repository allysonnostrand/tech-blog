
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
            location.reload()
        } else {
            alert("wrong credentials")
        }
    })
})

document.querySelector("#delete").addEventListener("click", e => {
    e.preventDefault();
    console.log("clicked")
    const id = parseInt(window.location.pathname.split('/')[2])
    fetch(`/api/posts/${id}`, {
        method:"DELETE",
        body:JSON.stringify({
            post_id: id
        }),
        headers: {
            "Content-Type":"application/json"
        }
    }).then (res => {
        if(res.ok){
            location.href="/dashboard";
        } else {
            alert("wrong credentials")
        }
    })
})

