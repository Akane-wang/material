<template>
	<div id="app">
    	<table id="datatable">
				<tr hidden>
 					<td>我是被隐藏的那个呀，仙女呀，咿呀咿呀咦儿呀</td>
 				</tr>
 				<tr>
 					<th>我是一只小表格</th>
 					<th>咿呀咿呀呦</th>
 				</tr>
 				<tr>
					<td>我是一颗小小的石头</td>
					<td>深深的埋在泥土之中 </td>
 				</tr>
 			</table>
 			<a download="我是被导出的表格.xls" href="#" onclick="return ExcellentExport.excel(this, 'datatable', 'Sheet Name Here')">Export table to Excel</a>
 		</div>
</template>
<script>
	export default {
 		name: 'App'
	}
</script>
<style scoped>

</style>
