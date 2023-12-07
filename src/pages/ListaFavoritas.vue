<template>
  <h6>Lista Peliculas</h6>
  <div class="pelicula-list">
    <div class="pelicula-grid row">
      <div
        class="pelicula-item"
        v-for="pelicula in peliculas"
        :key="pelicula.id"
        style="padding: 50px"
      >
        <q-card class="my-card">
          <q-img
            :src="'https://image.tmdb.org/t/p/original/' + pelicula.poster_path"
          >
            <div class="absolute-bottom text-h6">{{ pelicula.title }}</div>
          </q-img>

          <q-card-section> {{ pelicula.overview }} </q-card-section>
        </q-card>

        <!-- <div>{{ pelicula.id }}</div> -->
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>

<script>
import axios from "axios";

export default {
  name: "ListarPeliculas",
  components: {},
  props: {},
  mounted() {
    this.getPeliculas();
  },
  methods: {
    async getPeliculas() {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/account/20708625/favorite/movies",
        params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDg3NTcwN2IxMDZhNmM2YjQ1M2EwMTY3YTQyM2Q0MSIsInN1YiI6IjY1NTU3NzYzYjU0MDAyMDExYjdkODI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jTonMo3BEEILTouKdK8k8NRBfRJeRhemrd0yo_NLlCY",
        },
      };

      var ListaPeliculas = [];

      await axios
        .request(options)
        .then(function (response) {
          debugger;
          ListaPeliculas = response.data.results;
        })
        .catch(function (error) {
          console.error(error);
        });

      this.peliculas = ListaPeliculas;
    },
  },
  data() {
    return {
      peliculas: [],
    };
  },
};
</script>
