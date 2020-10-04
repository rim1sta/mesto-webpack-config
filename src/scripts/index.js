import Api from "./Api";
import Card from "./Card";
import CardList from "./CardList";
import FormValidator from "./FormValidator";
import Popup from "./Popup";
import UserInfo from "./UserInfo";
import "../pages/index.css";

(function () {
  const placesList = document.querySelector(".places-list");
  const popupOpenButton = document.querySelector(".button");
  const popupCloseAddButton = document.querySelector(".popup__close-add");
  const popupCloseImgButton = document.querySelector(".popup__close-img");
  const popupCloseEditButton = document.querySelector(".popup__close-edit");
  const nameInput = document.querySelector(".popup__input_type_name");
  const linkInput = document.querySelector(".popup__input_type_link-url");
  const buttonEdit = document.querySelector(".button-edit");
  const name = document.querySelector(".user-info__name");
  const job = document.querySelector(".user-info__job");
  const authorInput = document.querySelector('input[name="forename"]');
  const jobInput = document.querySelector('input[name="job"]');
  const formEdit = document.forms.editForm;
  const formAdd = document.forms.addForm;
  const popupImage = document.querySelector(".popup__image");
  const errorMessages = {
    empty: "Это обязательное поле",
    wrongLength: "Должно быть от 2 до 30 символов",
    wrongUrl: "Здесь должна быть ссылка",
    wrongPattern: "Введите данные в верном формате",
  };

  const NODE_ENV = process.env.NODE_ENV === 'production';
  const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
  const options = {
    url: `${API_URL}/cohort11`,
    headers: {
      authorization: "c5fbe4a5-cce6-4eaa-a017-c7202eda4b40",
      "Content-Type": "application/json",
    },
  };

  function createCard(dataForElement) {
    const card = new Card(dataForElement, openImg);
    return card.create();
  }

  const addPopup = new Popup(document.querySelector(".popup_add"));
  const editPopup = new Popup(document.querySelector(".popup_edit"));
  const imgPopup = new Popup(document.querySelector(".popup_img"));
  const userInfo = new UserInfo(name, job);
  const addFormValidator = new FormValidator(formAdd, errorMessages);
  addFormValidator.setEventListeners();
  const editFormValidator = new FormValidator(formEdit, errorMessages);
  editFormValidator.setEventListeners();
  const cardList = new CardList(placesList, createCard);
  const api = new Api(options);

  api
    .getInitialCards()
    .then((res) => {
      cardList.render(res);
    })
    .catch((err) => {
      console.log(`ошибка:${err}. Запрос не выполнен`);
    });

  api.getServerUserInfo().then((res) => {
    console.log(res);
    userInfo.setUserInfo(res.name, res.about);
    userInfo.updateUserInfo();
  })
  .catch((err) => {
    console.log(`ошибка:${err}. Запрос не выполнен`);
  });

  function openImg(url) {
    popupImage.setAttribute("src", url);
    imgPopup.open();
  }

  //callback

  popupOpenButton.addEventListener("click", () => {
    addFormValidator.setSubmitButtonState(false);
    addPopup.open();
  });

  buttonEdit.addEventListener("click", () => {
    const user = userInfo.getUserInfo();
    authorInput.value = user.name;
    jobInput.value = user.job;
    editPopup.open();
  });

  formEdit.addEventListener("submit", (evt) => {
    evt.preventDefault();
    api.serverUpdateUserInfo(authorInput.value, jobInput.value).then((res) => {
      console.log(res);
      userInfo.setUserInfo(res.name, res.about);
      userInfo.updateUserInfo();
      editPopup.close();
    })
    .catch((err) => {
      console.log(`ошибка:${err}. Запрос не выполнен`);
    }); 
  });

  formAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    cardList.addCard(
      createCard({ name: nameInput.value, link: linkInput.value })
    );
    formAdd.reset();
    addPopup.close();
  });
  popupCloseAddButton.addEventListener("click", () => {
    addFormValidator.deleteErrors();
    addFormValidator.setSubmitButtonState(false);
    formAdd.reset();
    addPopup.close();
  });
  popupCloseEditButton.addEventListener("click", () => {
    editFormValidator.setSubmitButtonState(true);
    editFormValidator.deleteErrors();
    editPopup.close();
  });
  popupCloseImgButton.addEventListener("click", () => {
    imgPopup.close();
  });
})();

/** REVIEW:
 * 
 * Все критические ошибки были исправлены, отличная работа! Спасибо за усилия и старания, удачи в следующем спринте и 
 * успехов в дальнейшем обучении
 * 
 */