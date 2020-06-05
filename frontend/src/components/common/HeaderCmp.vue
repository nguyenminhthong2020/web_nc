<template>
  <header id="myHeader" class="header-bar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/"></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">
              TẢI APP
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/post/list">VIỆC LÀM</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/post/search">TUYỂN DỤNG</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">ĐĂNG NHẬP</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link
              class="nav-link dropdown-toggle"
              to="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >TIỆN ÍCH</router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/">Tra cứu lương</router-link>
              <router-link class="dropdown-item" to="/">Tính lương Gross/Net</router-link>
            </div>
          </li>

          <li class="nav-item dropdown">
            <router-link
              class="nav-link dropdown-toggle"
              to="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="far fa-user"></i>
              XIN CHÀO! MINH THÔNG
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/">Đăng xuất</router-link>
              <router-link class="dropdown-item" to="/admin">Xem thông tin</router-link>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Nhập tên công việc"
            aria-label="Search"
          />
          <button class="btn btn-info my-2 my-sm-0" type="submit">Tìm</button>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "header-comp",
  props: {
    username: String
  },
  data() {
    return {
      text: "Hello Header"
    };
  }
};
</script>

<style scoped>
.header-bar {
  transition: all 0.5s;
}

.bg-light {
  background: rgb(9, 31, 38);
  background: linear-gradient(
    90deg,
    rgba(9, 31, 38, 1) 0%,
    rgba(60, 130, 147, 1) 43%,
    rgba(76, 103, 159, 1) 67%,
    rgba(57, 96, 125, 1) 100%,
    rgba(43, 136, 136, 1) 100%,
    rgba(84, 64, 24, 1) 100%,
    rgba(0, 212, 255, 1) 100%,
    rgba(42, 49, 224, 1) 100%
  );
  color: white;
}

.navbar-brand {
  color: #ff9f43 !important;
  font-size: 30px !important;
  background-position: center;
  background-size: cover;
  height: 6rem;
  width: 10rem;
  background-image: url("https://cdn3.iconfinder.com/data/icons/fintech-color-pop-vol-2/64/internet-banking-512.png") !important;
}

.nav-link {
  color: white !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 15px;
  transition: all 0.5s;
}

.nav-link:hover {
  color: rgb(243, 160, 34) !important;
}
</style>
