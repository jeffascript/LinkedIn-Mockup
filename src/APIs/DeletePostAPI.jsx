
const DeletePostAPI = async (userName,password, postID) => {
    let URL = "https://strive-school-testing-apis.herokuapp.com/api/posts/".concat(postID) 
    try {
        let response = await fetch(URL, {
            method: "DELETE",
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

export default DeletePostAPI