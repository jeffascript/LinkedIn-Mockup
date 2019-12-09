
const GetAPI = async (userName, password, whatToFetch, userName2, ID) => {
    let URL = undefined

    switch (whatToFetch) {
        default:
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"
            break
        case 'experience':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/" + userName + "/experiences/".concat(ID)
            break
        case 'experiences':
            !userName2
            ?
            URL = `https://strive-school-testing-apis.herokuapp.com/api/profile/${userName}/experiences`
            :
            URL = `https://strive-school-testing-apis.herokuapp.com/api/profile/${userName2}/experiences`
            break
        case 'posts':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/posts/"
            break
        case 'profile':
            !userName2
            ?
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/".concat(userName)
            :
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/".concat(userName2)
        break
        case 'post':
                URL = "https://strive-school-testing-apis.herokuapp.com/api/posts/" + ID
    }

    try {
        let response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default GetAPI