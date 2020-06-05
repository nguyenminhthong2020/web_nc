<template>
  <div class="dashboard-container">
    <div class="row">
      <div class="col-lg-12">
        <CustomerNavBarCmp />
      </div>
      <div class="col-lg-3 col-md-4 col-sm-12" style="margin-top:20px">
        <CustomerSidebarCmp />
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12" style="margin-top:20px">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerNavBarCmp from './customer-common/CustomerNavBarCmp'
import CustomerSidebarCmp from './customer-common/CustomerSidebarCmp'
export default {
  name: "user-dashboard",
  data: function() {
    return {
      imgAva:
        "https://thegioidienanh.vn/stores/news_dataimages/anhvu/032020/09/16/in_article/0545_Ynh_4.jpg",
      title: "Thông tin cá nhân"
    };
  },
  methods: {
    onOpenFile: function() {
      let inputFile = document.getElementById("input-image");
      inputFile.click();
    },
    onChooseFile: function(e) {
      this.imgAva = URL.createObjectURL(e.target.files[0]);
    }
  },
  components: {
    CustomerNavBarCmp,
    CustomerSidebarCmp
  },
  watch: {}
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.nav-item {
  transition: all 0.5s;
}

.nav-item:hover {
  background-color: #245970;
}

.nav-item:hover .nav-link:hover {
  color: white;
}

.nav-link {
  color: black;
  font-family: "Montserrat", sans-serif !important;
  font-size: 15px;
  transition: all 0.5s;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background-color: #245970;
  color: white;
  border-top: 2px solid #dc4f22;
}

.nav-link:hover {
  color: rgb(255, 255, 255);
}

.dashboard-container {
  padding: 20px;
}

.dashboard-content {
  padding: 20px;
  box-shadow: 1px 0px 10px 0px #ebebeb;
}
</style>
