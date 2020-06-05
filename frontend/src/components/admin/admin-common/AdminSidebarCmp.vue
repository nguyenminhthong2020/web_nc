<template>
<div class="container user-sidebar">
    <div class="row">
        <div class="col-lg-12">
            <span class="user-info" style="font-size:20px;color: orange">Minh Thông</span>
            <span class="user-info">22 tuổi</span>
            <div class="progress" style="margin-top:10px">
                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 50%">75%</div>
            </div>
        </div>
        <div class="col-lg-12 thumbnail">
            <div class="thumb">
                <img v-bind:src="this.imgAva" alt="Ảnh đại diện" />
                <div class="thumb-child">
                    <button @click="onOpenFile" title="Cập nhật ảnh đại diện" class="btn btn-outline-light">
                        <i class="fas fa-plus-circle"></i>
                    </button>
                    <input type="file" @input="onChooseFile" id="input-image" class="btn btn-outline-light" />
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="row side-bar-container">
                <div class="col-lg-12">
                    <span style="color:white;font-size:17px;text-transform: uppercase;font-weight:600">Cá nhân</span>
                </div>
                <div class="col-lg-12" style="margin-top:15px">
                    <div class="accordion" id="accordionExample">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <button class="btn btn-light btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <i class="fas fa-users"></i>
                                    &#160;
                                    Quản lý người dùng
                                </button>
                            </div>

                            <div id="collapseOne" class="collapse child-menu" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <router-link to="/admin/customer" class="btn btn-outline-dark btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="fas fa-people-arrows"></i> &#160; Danh sách giao dịch viên
                                            </router-link>
                                        </div>
                                        <div class="col-lg-12">
                                            <router-link to="/admin/partner" class="btn btn-outline-dark btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="fas fa-handshake "></i> &#160; Danh sách đối tác
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <button class="btn btn-light btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                    <i class="fas fa-chart-bar"></i>
                                    &#160; Quản lý giao dịch
                                </button>
                            </div>

                            <div id="collapseTwo" class="collapse child-menu" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <router-link to="/admin/transation" class="btn btn-outline-dark btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="fas fa-exchange-alt"></i> &#160; Danh sách giao dịch
                                            </router-link>
                                        </div>

                                        <div class="col-lg-12">
                                            <router-link to="/admin/customer" class="btn btn-outline-dark btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="fas fa-chart-pie"></i> &#160; Thống kê
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="card">
                            <div class="card-header" id="headingOne">
                                <button class="btn btn-light btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
                                    <i class="fas fa-info-circle"></i>
                                    &#160; Cá nhân
                                </button>
                            </div>

                            <div id="collapseThree" class="collapse child-menu" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <router-link to="/admin/transation" class="btn btn-outline-dark btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="fas fa-sign-out-alt"></i>&#160; Đăng xuất
                                            </router-link>
                                        </div>

                                        <div class="col-lg-12">
                                            <router-link to="/admin/customer" class="btn btn-outline-dark btn-sidebar btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="fas fa-cog"></i> &#160; Đổi mật khẩu
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            imgAva: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaf012ed-edd9-4a67-b735-c3af2dc1063c/dbtszhc-3b39f4bc-be5a-4256-8068-4881d340705c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZWFmMDEyZWQtZWRkOS00YTY3LWI3MzUtYzNhZjJkYzEwNjNjXC9kYnRzemhjLTNiMzlmNGJjLWJlNWEtNDI1Ni04MDY4LTQ4ODFkMzQwNzA1Yy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.KpVBAIBKVIURubqdvGOp2mr01aKefbaNL7d5nxXIq9w",
            title: "Hello"
        };
    },
    methods: {
        onOpenFile: function () {
            let inputFile = document.getElementById("input-image");
            inputFile.click();
        },
        onChooseFile: function (e) {
            this.imgAva = URL.createObjectURL(e.target.files[0]);
        }
    }
};
</script>

<style scoped>
.btn-light.focus,
.btn-light:focus {
    background-color: #194520;
    color: white;
}

.child-menu {
    padding-left: 15px;
}

.btn-sidebar {
    font-size: 14px;
    border: none;
}

.card-body {
    padding: 0px;
}

.card-header {
    padding: 0px;
}

.list-menu {
    list-style: none;
    padding: 0;
}

.list-menu li {
    color: rgb(14, 14, 14);
    background-color: white;
    transition: all 0.5s;
}

.nav-link-user {
    color: black;
    font-family: "Montserrat", sans-serif !important;
    font-size: 17px;
    transition: all 0.5s;
    text-decoration: none;
    display: block;
    padding: 0.5rem 1rem;
}

.nav-link-user:hover {
    color: rgb(243, 160, 34);
}

.list-menu li .nav-link-user {
    color: rgb(14, 14, 14);
    background-color: white;
    transition: all 0.5s;
}

.list-menu li:hover {
    color: white;
    background-color: #f5f5f5;
}

.list-menu li:hover .nav-link-user {
    color: rgb(252, 252, 252);
    background-color: #194520;
}

.active-item .nav-link-user {
    color: rgb(252, 252, 252) !important;
    background-color: #194520 !important;
}

.side-bar-container {
    margin-top: 20px;
}

.thumbnail {
    margin-top: 20px;
    transition: all 0.5s;
}

#input-image {
    width: 0px;
    pointer-events: none;
    opacity: 0;
}

.thumb img {
    width: 100%;
    transition: all 0.5s;
}

.thumb {
    transition: all 0.5s;
    position: relative;
}

.thumb:hover .thumb-child {
    opacity: 1;
}

.thumb:hover img {
    opacity: 0.5;
}

.thumb-child {
    top: 40%;
    left: 40%;
    position: absolute;
    opacity: 0;
    transition: all 0.5s;
}

.user-info {
    display: block;
    font-weight: 500;
    font-size: 15px;
    color: white;
}

.user-sidebar {
    background-color: #0d262e;
    padding: 20px;
}
</style>
