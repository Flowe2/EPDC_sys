<template>
  <el-container id="dtQustion_body" class="dtQustion_body">
    <!-- 删除列表操作 -->
    <el-header height="40px">
      <el-row :gutter="10">
        <el-col :span="8">
          <b
            >准备删除题目数: <el-tag type="info">{{ deleteCounter }}</el-tag></b
          >
        </el-col>
        <el-col :span="4" :offset="4">
          <el-button
            type="primary"
            :disabled="tableBtnDisabled"
            @click="delAllFromDQ"
            >清空</el-button
          >
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            :disabled="tableBtnDisabled"
            @click="delOneFromDQ"
            >移除</el-button
          >
        </el-col>
        <el-col :span="4">
          <el-button type="danger" :disabled="tableBtnDisabled">删除</el-button>
        </el-col>
      </el-row>
    </el-header>

    <!-- 删除预览 -->
    <el-main style="padding: 0 20px" height="100%">
      <el-table
        :data="Array.from(deleteList)"
        @selection-change="handleSelectionChange"
        :max-height="tableHeight"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="type"
          label="类型"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="_id"
          label="ID"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column label="题面" show-overflow-tooltip align="center">
          <template #default="scope">
            <el-popover trigger="click" placement="right-start" width="300px">
              <template #default>
                <el-form label-position="top" label-width="80" size="mini">
                  <el-form-item label="题目内容">
                    <el-tag>
                      {{ scope.row.question }}
                    </el-tag>
                  </el-form-item>
                  <el-form-item label="所属科目">
                    <el-tag>
                      {{ scope.row.subject }}
                    </el-tag>
                  </el-form-item>
                  <el-form-item label="入库时间">
                    <el-tag>
                      {{ scope.row.additionTime }}
                    </el-tag>
                  </el-form-item>
                </el-form>
              </template>
              <template #reference>
                <div>
                  {{ scope.row.question }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "DeleteQuestion",
  data() {
    return {
      tableBtnDisabled: true,
      tableHeight: 100,
    };
  },
  methods: {
    // 动态设置table高度, 固定表头
    dynamicTableHeight: function () {
      let containerHeight = document.getElementById("dtQustion_body")
        .clientHeight;
      this.tableHeight = containerHeight * 0.9;
    },
    
    // 暂存至tempList
    handleSelectionChange: function (val) {
      // 传入的为对象, JSON.toStringfy后在JSON.parse解析
      this.$emit("toTempList", "del", JSON.parse(JSON.stringify(val)));
    },
    // 移除所选
    delOneFromDQ: function () {
      this.$emit("delOneFromDQ", "del");
    },
    // 移除所有
    delAllFromDQ: function () {
      this.$emit("delAllFromDQ", "delAll");
    },
  },
  props: ["deleteCounter", "deleteList"],
  mounted() {
    this.deleteCounter>0 ? this.tableBtnDisabled = false : {};
    // 初始化窗口
    this.$nextTick(() => {
      this.dynamicTableHeight();
    });
    // 窗口大小改变时
    window.onresize = () => {
      this.dynamicTableHeight();
    };
  },
  watch: {
    deleteCounter: function () {
      if (this.deleteCounter > 0) {
        this.tableBtnDisabled = false;
      }
    },
  },
};
</script>

<style scoped>
.dtQustion_body {
  height: calc(100% - 52px);
}
</style>