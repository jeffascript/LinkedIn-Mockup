const PutAPI = async (userName,password, whatToUpdate, theUpdate, theID) => {
    let URL = undefined
    switch(whatToUpdate){
        case 'experience':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"+ userName + "/experiences/".concat(theID)
        break
        case 'profile':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"
        break
    }
    try {
        let response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(theUpdate)
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}   

export default PutAPI;