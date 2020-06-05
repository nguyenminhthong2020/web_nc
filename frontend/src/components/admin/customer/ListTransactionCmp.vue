<template>
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fab fa-bitcoin icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách giao dịch</span>
                    <span class="sub-title">(Danh sách giao dịch giữa ngân hàng GO với ngân hàng liên kết)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                <multiselect v-model="statusValue" :options="statusOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo ngân hàng" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                <datepicker :placeholder="fromDateText"  :language="vi" :bootstrap-styling="true">
                </datepicker>
            </div>
             <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                <datepicker :placeholder="toDateText"  :language="vi" :bootstrap-styling="true">
                </datepicker>
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
                    <th scope="col" class="text-center">Số tiền GD</th>
                    <th class="text-center" scope="col">Ngày GD</th>
                    <th class="text-center" scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <TransactionItemCmp />
                <TransactionItemCmp />
                <TransactionItemCmp />
                <TransactionItemCmp />
                <TransactionItemCmp />
            </tbody>
        </table>
    </div>

    <div class="col-12 text-center" style="margin-top:20px">
        <paginate :page-count="5" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index"></paginate>
    </div>

</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from 'vuejs-datepicker';
import EmployeeItemCmp from "./list-item/EmployeeItemCmp";
import PartnerItemCmp from './list-item/PartnerItemCmp'
import TransactionItemCmp from './list-item/TransactionItemCmp'
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
            fromDateText: "Từ ngày",
            toDateText: "Đến ngày",
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
        TransactionItemCmp,
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
