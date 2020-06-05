<template>
<tr>
    <th scope="row text-center" style="vertical-align: middle">1</th>
    <td style="vertical-align: middle" class="text-center">VCBank</td>
    <td style="vertical-align: middle" class="text-center">
        <p>Ngân hàng Vietcombank</p>
    </td>
    <td style="vertical-align: middle" class="text-center">
        <p>2000000</p>
    </td>
    <td class="text-center text-wrap" style="vertical-align: middle">
        <p>23/01/2019</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item">Cập nhật</button>
                <button class="dropdown-item">Xóa</button>
            </div>
        </div>
    </td>
</tr>
</template>

<script>
export default {};
</script>

<style scoped>
p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    margin-bottom: 0px;
}

.btn-outline-success {
    padding: 5px;
    font-size: 12px;
    border-radius: 20px;
}

.btn-outline-danger {
    padding: 5px;
    font-size: 12px;
    border-radius: 20px;
}

.btn-outline-info {
    font-size: 12px;
}

h6 {
    font-size: 13px;
}

td {
    font-size: 13px;
}

th {
    font-size: 13px;
}

.dropdown-item {
    font-size: 13px;
}
</style>
