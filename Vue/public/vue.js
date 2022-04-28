let vm = new Vue({
  el: '#vue-app',
  data: {
    cartelera: [],
    info: null,
    details: false,
    movie: null,
    cinema: null
  },
  methods: {
    async getAll() {
      this.cartelera.splice(0);
      let response = await axios.get("https://api.movie.com.uy/api/shows/rss/data");
      this.info = response.data.contentCinemaShows;
      let e = document.querySelector(".cinema");
      let selectedCinema = e.options[e.selectedIndex].text;
      this.cinema = selectedCinema;
      for(movie of this.info) {
        for(cinemaShows of movie.cinemaShows) {
          let display = [];
          if(cinemaShows.cinema == selectedCinema) {
            for(shows of cinemaShows.shows) {
              display.push({language: shows.formatLang, rating: shows.rating, ratingDescription: shows.ratingDescription, screenName: shows.screenName, timeToDisplay: shows.timeToDisplay});
            }
            this.cartelera.push({cinema: selectedCinema, movie: movie.movie, description: movie.description, genre:movie.genre, poster: movie.posterURL, display});
          }
        }
      }
    },
    selectCinema: function() {
      this.getAll();
    },
    showDetails(movie) {
      this.details = true;
      this.movie = movie;
    }
  },
  mounted () {
    this.getAll();
  }
});
