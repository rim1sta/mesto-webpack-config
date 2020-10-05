export default class UserInfo {
  constructor(name, job) {
    this._nameElem = name;
    this._jobElem = job;
    this._name = '';
    this._job = '';
  }
  setUserInfo = (newName, newJob) => {
    this._name = newName;
    this._job = newJob
  };
  updateUserInfo = () => {
    this._nameElem.textContent = this._name;
    this._jobElem.textContent = this._job;
  }
  getUserInfo = () => {
return {
  name: this._name,
  job: this._job
}
  }
}
