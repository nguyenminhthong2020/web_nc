<template>
  <tr>
    <th scope="row text-center" style="vertical-align: middle">1</th>
    <td style="vertical-align: middle" class="text-center">
        <p>
            970012847289
        </p>

    </td>
    <td style="vertical-align: middle" class="text-center">
      <p>50.000.000</p>
    </td>
    <td style="vertical-align: middle" class="text-center">23/03/2019</td>
    <td class="text-center text-wrap" style="vertical-align: middle">
      <p>23/03/2020</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
      <p>5.6%</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
      <span>2.800.000</span>
    </td>
     <td class="text-center" style="vertical-align: middle">
      <span>52.800.000</span>
    </td>
    <td class="text-center" style="vertical-align: middle">
      <div class="dropdown">
        <button
          class="btn btn-outline-info"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
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
  max-width: 150px;
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