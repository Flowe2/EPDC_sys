<template>
  <div id="singlec_body" class="singlec_body">
    <!-- 分页 -->
    <el-pagination
      id="singlec_pagination"
      :total="displayCounter"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="curtPageSize"
      :hide-on-single-page="onlySinglePage"
      :pager-count="limitPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>

    <el-table
      :data="
        displayList.slice(
          (currentPage - 1) * curtPageSize,
          currentPage * curtPageSize
        )
      "
      :height="tableHeight"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="关键词">
              <span>{{ props.row.keyword }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"> </el-table-column>
      <el-table-column
        prop="keyword"
        label="关键词"
        width="100"
        :filters="displayKeywordFilter"
        :filter-method="keywordFilter"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="primary" disable-transitions>{{
            scope.row.keyword
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SingleChoice",
  data() {
    return {
      // loading: true,
      tableHeight: 600,
      displayList: [],
      displayCounter: 0,
      displayKeywordFilter: [], // 过滤器
      currentPage: 1, // 初始页为 1
      pageSizes: [10, 20, 50, 100],
      curtPageSize: 10,
      limitPage: 6, // 大于5页折叠多余页码按钮
      onlySinglePage: false,
    };
  },
  methods: {
    // 改变分页大小
    handleSizeChange: function (size) {
      console.log(size + " per page.");
      this.curtPageSize = size;
    },
    // 改变当前页码
    handleCurrentChange: function (currentPage) {
      console.log("current page: " + currentPage);
      this.currentPage = currentPage;
    },
    // 动态设置table高度, 固定表头
    dynamicTableHeight: function () {
      let pagiHeight = document.getElementById("singlec_pagination")
        .clientHeight;
      let bodyHeight = document.getElementById("singlec_body").clientHeight;
      this.tableHeight = bodyHeight - pagiHeight - 15;
    },
    // 生成过滤器
    keywordFilterGenerator: function (res) {
      let temp = [];
      res.forEach((element) => {
        if (temp.indexOf(element.keyword) == -1) {
          temp.push(element.keyword);
          this.displayKeywordFilter.push({
            text: element.keyword,
            value: element.keyword,
          });
        }
      });
    },
    // role标签过滤器
    keywordFilter: function (value, row) {
      return row.keyword === value;
    },
  },
  mounted() {
    let test = [
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃1",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987123",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃2",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987125",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃3",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987126",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃1",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃2",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃3",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃1",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃2",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃3",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃1",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃2",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃3",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃1",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃2",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃3",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
      {
        id: "12987122",
        name: "好滋好味鸡蛋仔",
        keyword: "小吃1",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
      },
    ];
    this.displayList = test;
    this.displayCounter = test.length;
    if (this.displayCounter < this.curtPageSize) {
      this.onlySinglePage = true;
    }
    this.keywordFilterGenerator(test);
    // 初始化窗口
    this.dynamicTableHeight();
    // 窗口大小改变时
    window.onresize = () => {
      this.dynamicTableHeight();
    };
  },
};
</script>

<style scoped>
.singlec_body {
  width: 100%;
  height: 100%;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>