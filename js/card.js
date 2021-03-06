'use strict';

(function () {
  var getHouseType = function (completeOffer) {
    var houseType = '';

    switch (completeOffer.offer.type) {
      case 'palace':
        houseType = 'Дворец';
        break;
      case 'flat':
        houseType = 'Квартира';
        break;
      case 'house':
        houseType = 'Дом';
        break;
      case 'bungalo':
        houseType = 'Бунгало';
        break;
    }

    return houseType;
  };

  var getFeatures = function (features, card, cardElement, completeOffer) {
    var cardFeature = card.querySelector('.popup__feature');
    var cardFeaturesElement = cardElement.querySelector('.popup__features');

    features.textContent = '';
    completeOffer.offer.features.forEach(function (item) {
      var featureSelector = 'popup__feature--' + item;
      var cardFeatureElement = cardFeature.cloneNode(true);

      cardFeatureElement.classList.remove('popup__feature--wifi');
      cardFeatureElement.classList.add(featureSelector);
      cardFeaturesElement.appendChild(cardFeatureElement);
    });
  };

  var getPhotos = function (photo, card, cardElement, completeOffer) {
    var cardImage = card.querySelector('.popup__photo');
    var cardImagesElement = cardElement.querySelector('.popup__photos');

    photo.src = completeOffer.offer.photos[0];
    for (var i = 1; i < completeOffer.offer.photos.length; i++) {
      var cardImageElement = cardImage.cloneNode(true);

      cardImageElement.src = completeOffer.offer.photos[i];
      cardImagesElement.appendChild(cardImageElement);
    }
  };

  var createOfferInfo = function (completeOffer) {
    var card = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = card.cloneNode(true);
    var avatar = cardElement.querySelector('.popup__avatar');
    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var rooms = cardElement.querySelector('.popup__text--capacity');
    var time = cardElement.querySelector('.popup__text--time');
    var features = cardElement.querySelector('.popup__features');
    var description = cardElement.querySelector('.popup__description');
    var photo = cardElement.querySelector('.popup__photo');

    if (completeOffer.offer.title) {
      title.textContent = completeOffer.offer.title;
    } else {
      title.style.display = 'none';
    }

    if (completeOffer.offer.address) {
      address.textContent = completeOffer.offer.address;
    } else {
      address.style.display = 'none';
    }

    if (completeOffer.offer.price) {
      price.textContent = completeOffer.offer.price + '₽/ночь';
    } else {
      price.style.display = 'none';
    }

    if (completeOffer.offer.type) {
      type.textContent = getHouseType(completeOffer);
    } else {
      type.style.display = 'none';
    }

    if (completeOffer.offer.rooms !== undefined && completeOffer.offer.guests !== undefined) {
      rooms.textContent = completeOffer.offer.rooms +
      ' комнаты для ' + completeOffer.offer.guests + ' гостей';
    } else {
      rooms.style.display = 'none';
    }

    if (completeOffer.offer.checkin && completeOffer.offer.checkout) {
      time.textContent = 'Заезд после ' +
      completeOffer.offer.checkin + ', выезд до ' + completeOffer.offer.checkout;
    } else {
      time.style.display = 'none';
    }

    if (completeOffer.offer.features.length) {
      getFeatures(features, card, cardElement, completeOffer);
    } else {
      features.style.display = 'none';
    }

    if (completeOffer.offer.description) {
      description.textContent = completeOffer.offer.description;
    } else {
      description.style.display = 'none';
    }

    if (completeOffer.offer.photos.length > 0) {
      getPhotos(photo, card, cardElement, completeOffer);
    } else {
      photo.style.display = 'none';
    }

    if (completeOffer.author.avatar) {
      avatar.src = completeOffer.author.avatar;
    } else {
      avatar.style.display = 'none';
    }

    return cardElement;
  };


  window.card = {
    create: createOfferInfo
  };
})();
