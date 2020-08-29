class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
    console.log(this.url);
    console.log(this.headers);
  }

  getServerUserInfo = () => {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then((res) => {
     return this._getResponseData(res)
    });
  }

  getInitialCards= () => {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) => {
     return this._getResponseData(res)
    });
  }

  serverUpdateUserInfo = (name, job) => {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH", 
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then((res) => {
     return this._getResponseData(res)
    });
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }
}
