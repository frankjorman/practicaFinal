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
        <q-btn
          color="secondary"
          label="Agregar Favorito"
          @click="AgregarFavoritos(pelicula.id)"
        />
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
import { Notify } from "quasar";

export default {
  name: "ListarPeliculas",
  components: {},
  props: {},
  mounted() {
    this.getPeliculas();
  },
  methods: {
    async getPeliculas() {
      var url = "https://api.themoviedb.org/3/discover/movie";

      const params = {
        api_key: "0d875707b106a6c6b453a0167a423d41",
        page: 22,
      };

      await axios
        .get(url, { params })
        .then((response) => {
          debugger;
          this.peliculas = response.data.results;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    async AgregarFavoritos(id) {
      const options = {
        method: "POST",
        url: "https://api.themoviedb.org/3/account/20708625/favorite",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDg3NTcwN2IxMDZhNmM2YjQ1M2EwMTY3YTQyM2Q0MSIsInN1YiI6IjY1NTU3NzYzYjU0MDAyMDExYjdkODI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jTonMo3BEEILTouKdK8k8NRBfRJeRhemrd0yo_NLlCY",
        },
        data: { media_type: "movie", media_id: id, favorite: true },
      };

      axios
        .request(options)
        .then(function (response) {
          Notify.create({
            type: "positive",
            message: "Agregado exitosamente",
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  data() {
    return {
      peliculas: [],
    };
  },
};
</script>
