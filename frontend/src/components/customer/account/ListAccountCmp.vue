<template>
<div class="row">
    <div class="col-lg-12">
        <div class="container">
              <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách tài khoản</span>
                    <span class="sub-title">(Danh sách những tài khoản khách hàng đang sử dụng của 3TBank)</span>
                </div>
            </div>
        </div>
        </div>
  
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="container">
            <div class="row container-account">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN TÀI KHOẢN THANH TOÁN</h5>
                </div>
                <div class="col-lg-12" style="margin-top:10px">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Số tài khoản
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Số dư hiện có
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Ngày mở tài khoản
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Ngày hết hạn
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12" style="margin-top:20px">
        <div class="container">
            <div class="row container-account" style="padding-top:20px">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN TÀI KHOẢN TIẾT KIỆM</h5>
                </div>
                <div class="col-lg-12" style="margin-top: 20px">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <multiselect v-model="statusValue" :options="statusOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo trạng thái" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <multiselect v-model="sortValue" :options="sortOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo thời gian" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                        </div>
                        <div class="col-lg-6 text-right">
                            <button class="btn btn-outline-info" data-toggle="modal" data-target="#addEmployeeModal">
                                <i class="fas fa-plus-circle"></i>
                                Thêm tài khoản tiết kiệm
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 table-responsive-md">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col" class="text-center">Mã TK</th>
                                <th scope="col" class="text-center">Số tiền gửi</th>
                                <th scope="col" class="text-center">Ngày gửi</th>
                                <th class="text-center" scope="col">Ngày nhận</th>
                                <th class="text-center" scope="col">Mức lãi suất</th>
                                <th class="text-center" scope="col">Số tiền lãi</th>
                                <th class="text-center" scope="col">Tiền lãi cuối kỳ</th>
                                <th class="text-center" scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AccountItemCmp />
                            <AccountItemCmp />
                            <AccountItemCmp />
                            <AccountItemCmp />
                            <AccountItemCmp />
                            <AccountItemCmp />
                        </tbody>
                    </table>
                </div>
                <div class="col-12 text-center" style="margin-top:20px">
                    <paginate :page-count="5" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index"></paginate>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal thêm tài khoản tiết kiệm -->
    <div class="modal fade" id="addEmployeeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM TÀI KHOẢN TIẾT KIỆM</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="accordionExample">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Nhập số tiền muốn gửi
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="number" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Ngày gửi
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <datepicker :language="vi" :bootstrap-styling="true">
                                    </datepicker>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Ngày nhận
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <datepicker :language="vi" :bootstrap-styling="true">
                                    </datepicker>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Mức lãi suất
                                        <span style="color:red">(*)</span>
                                    </label>
                                     <input type="number" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Lãi cuối kỳ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="number" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success">
                                    <i class="far fa-save"></i>
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from "vuejs-datepicker";
import AccountItemCmp from "./list-item/AccountItemCmp";
export default {
    data: function () {
        return {
            statusValue: [],
            statusOptions: [{
                    id: "ACTIVE",
                    text: "Đang tuyển"
                },
                {
                    id: "EXPIRED",
                    text: "Đã hết hạn"
                }
            ],
            sortValue: [],
            sortOptions: [{
                    id: "ASC",
                    text: "Cũ nhất"
                },
                {
                    id: "DESC",
                    text: "Mới nhất"
                }
            ],
            index: 1
        };
    },
    methods: {
        onSelectCategoryJob: function (obj) {
            let {
                id,
                text
            } = obj;
            console.log(text);
        },
        onRemoveGender: function (obj) {
            let {
                id,
                text
            } = obj;
        }
    },
    components: {
        Multiselect,
        Paginate,
        AccountItemCmp,
        Datepicker
    }
};
</script>

<style scoped>
.container-account {
    box-shadow: 1px 0px 10px 1px #ebebeb;
    padding-top: 10px;
    border-radius: 5px;
    padding-bottom: 10px;
}

.header-title {
    display: inline-flex;
    flex-direction: column;
}

.icon-title {
    font-size: 48px;
}

.main-title {
    font-size: 20px;
    text-transform: uppercase;
}

.sub-title {
    font-size: 15px;
}
</style>
