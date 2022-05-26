document.querySelector("#login").addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#loginUsername").value,
        password:document.querySelector("#loginPassword").value,
    }
    fetch("/api/users/login", {
        method:"POST",
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

document.querySelector("#signup").addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value
    }
    fetch("/api/users/", {
        method:"POST",
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