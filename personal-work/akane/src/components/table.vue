<template>
  <div>
    <table id="ttt">
      <tr hidden>
        <td>我是被隐藏的重要线索</td>
      </tr>
      <tr>
        <td>我是一只小表格,yahe</td>
        <td>咿呀咿呀呦</td>
      </tr>
      <tr>
        <td>我是一颗小小的石头</td>
        <td>深深的埋在泥土之中 </td>
      </tr>
    </table>
    <a download="somedata.xls" href="#" onclick="return ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');">Export to Excel</a>
  </div>
</template>

<script>

export default {
  name: 'table',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table, tr, td {
  border: 1px black solid;
}
</style>
