(()=>{"use strict";var e={487:(e,t,n)=>{e.exports=n.p+"bed8c136e13907f5eefb.svg"},706:(e,t,n)=>{e.exports=n.p+"6666407ac3aa5af1d5de.jpg"},539:(e,t,n)=>{e.exports=n.p+"84a69e2a88582107beb5.jpg"},92:(e,t,n)=>{e.exports=n.p+"81f9808b88871ce01200.jpg"},137:(e,t,n)=>{e.exports=n.p+"d54fc136d7e0d52199e6.jpg"},266:(e,t,n)=>{e.exports=n.p+"8a65f75d3d836c291cc9.svg"},811:(e,t,n)=>{e.exports=n.p+"2af49b82d305a6ea3442.svg"},228:(e,t,n)=>{e.exports=n.p+"6c7bf05444b9793fdf6e.svg"},370:(e,t,n)=>{e.exports=n.p+"a7ffe37dcb927ba0c46c.svg"},231:(e,t,n)=>{e.exports=n.p+"df0c965524717a3fd8e9.svg"},903:(e,t,n)=>{e.exports=n.p+"0863e5bc26221680f1e2.svg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}function r(e,t,n,r,o){var c=t.cloneNode(!0),p=c.querySelector(".places__item"),a=p.querySelector(".card__title"),d=p.querySelector(".card__image"),s=p.querySelector(".card__delete-button"),u=p.querySelector(".card__like-button");return a.textContent=e.name,d.setAttribute("src",e.link),d.setAttribute("alt",e.name),s.addEventListener("click",(function(){r(p)})),u.addEventListener("click",n),d.addEventListener("click",(function(){o(e)})),c}function o(e){e.target.classList.toggle("card__like-button_is-active")}function c(e){e.remove()}function p(e){e.classList.add("popup_is-opened"),e.querySelector(".popup__close").addEventListener("click",d),document.addEventListener("keydown",s),e.addEventListener("click",u)}function a(){var e=document.querySelector(".popup_is-opened"),t=e.querySelector(".popup__close");e.classList.remove("popup_is-opened"),t.removeEventListener("click",d),document.removeEventListener("keydown",s),e.removeEventListener("click",u)}function d(e){a()}function s(e){"Escape"===e.key&&a()}function u(e){e.currentTarget===e.target&&a()}n.m=e,n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="",n.b=document.baseURI||self.location.href,new URL(n(487),n.b),new URL(n(706),n.b),new URL(n(539),n.b),new URL(n(92),n.b),new URL(n(137),n.b),new URL(n(266),n.b),new URL(n(811),n.b),new URL(n(228),n.b),new URL(n(370),n.b),new URL(n(231),n.b),new URL(n(903),n.b);var i=document.querySelector("#card-template").content,l=document.querySelector(".places__list"),_=document.querySelector(".profile__add-button"),f=document.querySelector(".popup_type_new-card"),m=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_image"),b=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),L=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),q=y.querySelector(".popup__image"),x=y.querySelector(".popup__caption");function S(e){e.classList.add("popup_is-animated")}function h(e){p(y),q.src=e.link,q.alt=e.name,x.textContent=e.name}f.querySelector(".popup__form").addEventListener("submit",(function(e){l.insertBefore(r(function(e,t){var n=t.querySelector(".popup__input_type_card-name"),r=t.querySelector(".popup__input_type_url");e.preventDefault();var o={name:n.value,link:r.value};return e.target.reset(),o}(e,f),i,o,c),l.firstChild),a()})),v.querySelector(".popup__form").addEventListener("submit",(function(e){e.preventDefault(),L.textContent=b.value,g.textContent=k.value,a()})),document.querySelector('[placeholder="Имя"]').placeholder=L.textContent,document.querySelector('[placeholder="Занятие"]').placeholder=g.textContent,S(f),S(v),S(y),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){l.append(r(e,i,o,c,h))})),_.addEventListener("click",(function(){p(f)})),m.addEventListener("click",(function(){p(v)}))})();