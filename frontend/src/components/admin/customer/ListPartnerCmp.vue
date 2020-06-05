<template>
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-handshake icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách đối tác</span>
                    <span class="sub-title">(Danh sách những ngân hàng liên kết với GO)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                <multiselect v-model="statusValue" :options="statusOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo trạng thái" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                <multiselect v-model="sortValue" :options="sortOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo thời gian" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
            </div>
            
        </div>
    </div>

    <div class="col-lg-12 table-responsive-md">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col" class="text-center">Mã đối tác</th>
                    <th scope="col" class="text-center">Tên đối tác</th>
                    <th scope="col" class="text-center">Địa chỉ</th>
                    <th class="text-center" scope="col">Ngày liên kết</th>
                    <th class="text-center" scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <PartnerItemCmp />
                <PartnerItemCmp />
                <PartnerItemCmp />
                <PartnerItemCmp />
                <PartnerItemCmp />
            </tbody>
        </table>
    </div>

    <div class="col-12 text-center" style="margin-top:20px">
        <paginate :page-count="5" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index"></paginate>
    </div>

    <!-- Modal thêm nhân viên -->
    <div class="modal fade" id="addEmployeeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM NHÂN VIÊN</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="accordionExample">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Username
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Password
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Email
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Số điện thoại
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Ngày sinh
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <datepicker :language="vi" :bootstrap-styling="true">
                                    </datepicker>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Thời gian bắt đầu
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <datepicker :language="vi" :bootstrap-styling="true">
                                    </datepicker>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Địa chỉ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success">
                                    <i class="far fa-save"></i>
                                    Lưu
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
import Datepicker from 'vuejs-datepicker';
import EmployeeItemCmp from "./list-item/EmployeeItemCmp";
import PartnerItemCmp from './list-item/PartnerItemCmp'
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
        EmployeeItemCmp,
        PartnerItemCmp,
        Datepicker
    }
};
</script>

<style scoped>
.header-title {
    display: inline-flex;
    flex-direction: column;
}

.icon-title {
    font-size: 48px;
}

.main-title {
    font-size: 20px;
}

.sub-title {
    font-size: 15px;
}
</style>
