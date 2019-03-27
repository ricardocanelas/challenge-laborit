const local = {
  getStore: function () {
    const data = localStorage.getItem('laborit_cars_favourites');
    return data ? JSON.parse(data) : [];
  },

  setStore: function (data) {
    localStorage.setItem('laborit_cars_favourites', JSON.stringify(data));
  },
}

export default local;
