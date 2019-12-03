
const FetchEachExperienceByID = async (ID) => {


    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/user18/experiences/".concat(ID)
    try {
        let response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": "Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=",
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

export default FetchEachExperienceByID