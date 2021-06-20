console.log('Your javascript file has been loaded')

fetch('/weather?address=' + location).then( (response)=> {
    response.json().then( (data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
