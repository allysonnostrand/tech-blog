document.querySelector("#post").addEventListener("submit", e => {
    e.preventDefault();
    const postObj = {
        title:document.querySelector("#title").value,
        text:document.querySelector("#text").value,
    }
    fetch("/api/posts", {
        method:"POST",
        body:JSON.stringify(postObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then (res => {
        if(res.ok){
            location.reload()
        } else {
            alert("wooo")
        }
    })
})
