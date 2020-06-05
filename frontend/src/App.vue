<template>
  <div id="app" class="row">
    <div class="col-lg-12">
      <router-view></router-view>
    </div>
    <button v-on:click="this.onScrollTop" class="btn-scroll btn btn-dark" id="btn-scroll-top">
      <i class="fas fa-arrow-circle-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    onScrollTop() {
      window.scrollTo(0, 0);
    },
    handleScroll() {
      let header = document.getElementById("myHeader");
      let btnScroll = document.getElementById("btn-scroll-top");
      // let listButton = document.getElementById("list-button")
      if (window.scrollY > 200) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
      if (window.scrollY > 500) {
        // btnScroll.style.display = "block";
        btnScroll.style.opacity = "1";
        // listButton.classList.add("sticky-list-button");
      } else {
        // btnScroll.style.display = "none";
        btnScroll.style.opacity = "0";
        //  listButton.classList.remove("sticky-list-button");
      }
    }
  }
};
</script>

<style>
body {
  font-family: "Montserrat", sans-serif !important;
  transition: all 0.5s;
}
.btn-scroll {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.5s;
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;
}
.sticky-list-button {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 20;
  left: 30%;
}
</style>