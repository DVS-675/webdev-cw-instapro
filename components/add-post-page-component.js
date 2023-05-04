import { onAddPostClick } from "../api.js";
import { POSTS_PAGE } from "../routes.js";
import { getToken, goToPage } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
          <h3 class="form-title">
                Добавить пост
           </h3>
            <div class="form-inputs">
                <div class="upload-image-container"></div>
                <p class='photo_description'>Опишите фотографию</p>
                <textarea type="text" id="description-input" class="input_description"></textarea>
                <button class="button" id="add-button">Добавить</button>
            </div>       
      </div>     
    </div>
  `;

    appEl.innerHTML = appHtml;

    //рендер шапки
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    //рендер формы добавления фото
    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      const postDescription =
        document.getElementById("description-input").value;

      if (!imageUrl) {
        alert("Не выбрана фотография");
        return;
      }

      if (!postDescription) {
        alert("Добавьте описание фотографии");
        return;
      }

      onAddPostClick({
        token: getToken(),
        description: postDescription,
        imageUrl,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          goToPage(POSTS_PAGE);
        });
    });
  };

  render();
}
