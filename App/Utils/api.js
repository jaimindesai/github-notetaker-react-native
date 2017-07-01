const api = {
    getBio(userName){
         userName = userName.toLowerCase().trim();
        const url = `https://api.github.com/users/${userName}`;
        return fetch(url).then((res) => res.json());
    },
    getRepos(userName){
        userName = userName.toLowerCase().trim();
        const url = `https://api.github.com/users/${userName}/repos`;
        return fetch(url).then((res) => res.json());
    },
    getNotes(username){
    username = username.toLowerCase().trim();
    var url = `https://native-gh-notetaker.firebaseio.com/${username}.json`;
    return fetch(url).then((res) => res.json())
  },
  addNote(username, note){
    username = username.toLowerCase().trim();
    var url = `https://native-gh-notetaker.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }

}

export default api;