<template>
  <div class="study">
    <div class="study-course">
      <div class="study-read-title">课程管理</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="courseName" label="课程名称" width="180">
        </el-table-column>
        <el-table-column prop="courseProgress" label="课程进度" width="180">
        </el-table-column>
        <el-table-column prop="courseOrigin" label="课程来源">
          <template slot-scope="scope">
            <a :href="scope.row.courseOrigin">{{ scope.row.courseOrigin }}</a>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editeCourse(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="deletCourse(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 8px" type="primary" @click="fn"
        >添加</el-button
      >

      <el-dialog
        :title="dialogTitle"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-form label-width="80px" :model="formLabelAlign">
          <el-form-item label="课程名称">
            <el-input v-model="formLabelAlign.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程进度">
            <el-input v-model="formLabelAlign.courseProgress"></el-input>
          </el-form-item>
          <el-form-item label="课程来源">
            <el-input
              v-model="formLabelAlign.courseOrigin"
              placeholder="输入课程地址"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCourse">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="study-read">
      <div class="study-read-title">阅读任务</div>
      <div class="read-content">
        <div class="want-read">
          <div class="read-title">想读</div>
          <el-card class="read-card">
            <el-checkbox
              v-for="item in list0"
              :key="item.id"
              @change="changeReading(item.id)"
              >{{ item.bookName }}</el-checkbox
            >
            <div class="read-type">
              <!-- <el-tag size="mini">类型</el-tag> -->
            </div>
          </el-card>
          <el-input placeholder="请输入书名" v-model="bookName"></el-input>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="addBook"
            >添加</el-button
          >
        </div>
        <div class="reading">
          <div class="read-title">在读</div>
          <el-card class="read-card">
            <div v-for="item in list1" :key="item.id">
              <el-checkbox @change="changeReaded(item.id)">{{
                item.bookName
              }}</el-checkbox>
              <router-link :to="{path:'/detaile',query: {id:item.id}}" >详情</router-link>
            </div>
            <div class="read-type">
              <!-- <el-tag size="mini">类型</el-tag> -->
            </div>
          </el-card>
        </div>
        <div class="readed">
          <div class="read-title">读过</div>
          <el-card class="read-card">
            <el-checkbox v-for="item in list2" :key="item.id" disabled>{{
              item.bookName
            }}</el-checkbox>
            <div class="read-type">
              <!-- <el-tag size="mini">类型</el-tag> -->
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list0: [],
      list1: [],
      list2: [],
      bookName: "",
      tableData: [
        // {
        //   id: 0,
        //   courseName: "2016-05-02",
        //   courseProgress: "王小虎",
        //   courseOrigin: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   id: 1,
        //   courseName: "2016-05-04",
        //   courseProgress: "王小虎",
        //   courseOrigin: "上海市普陀区金沙江路 1517 弄",
        // },
        // {
        //   id: 2,
        //   courseName: "2016-05-01",
        //   courseProgress: "王小虎",
        //   courseOrigin: "上海市普陀区金沙江路 1519 弄",
        // },
      ],
      dialogTitle: "编辑课程",
      centerDialogVisible: false,
      formLabelAlign: {
        courseName: "",
        courseOrigin: "",
        courseProgress: "",
      },
      id: 0,
    };
  },
  methods: {
    fn() {
      this.centerDialogVisible = true;
      this.dialogTitle = "添加课程";
    },
    deletCourse(row) {
      let id = row.id;
      this.$axios.post("/course/deleteCourseList", { id: id }).then(
        (res) => {
          this.getCourse();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    editeCourse(row) {
      //编辑课程
      this.centerDialogVisible = true;
      this.formLabelAlign = {
        courseName: row.courseName,
        courseOrigin: row.courseOrigin,
        courseProgress: row.courseProgress,
      };
      this.id = row.id;
    },
    addCourse() {
      // 添加课程
      this.id ? this.operationCourse(this.id) : this.operationCourse();
      //编辑课程
    },
    operationCourse(flag) {
      let url = flag ? "course/editeCourseList" : "course/addCourseList";
      console.log(flag);
      let param = flag
        ? Object.assign(this.formLabelAlign, { id: flag })
        : this.formLabelAlign;
      console.log("param", param);
      this.$axios.post(url, param).then(
        (res) => {
          this.getCourse();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getCourse() {
      // 获取课程列表
      this.$axios.get("/course/getCourseList").then(
        (res) => {
          console.log(res);
          this.tableData = res.data.data;
          this.centerDialogVisible = false;
          this.formLabelAlign = {
            courseName: "",
            courseOrigin: "",
            courseProgress: "",
          };
          this.id = 0;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getBook() {
      this.$axios.get("/study/getBookList").then((res) => {
        let data = res.data;
        // 这里记得返回 id 来获取书籍详情
        this.list0 = data.list0;
        this.list1 = data.list1;
        this.list2 = data.list2;
      });
    },
    changeReading(id) {
      this.updateBookList(1, id);
    },
    changeReaded(id) {
      this.updateBookList(2, id);
    },
    updateBookList(bookState, id) {
      const param = {
        bookState,
        id,
      };
      this.$axios.post("/study/updateBookList", param).then(
        (res) => {
          console.log(res);
          this.getBook();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addBook() {
      this.$axios.post("/study/addBookList", { bookName: this.bookName }).then(
        (res) => {
          this.$message.success(res.data.message);
          this.getBook();
          this.bookName = "";
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {
    this.getCourse();
    this.getBook();
  },
};
</script>

<style lang="scss">
.study-read {
  &-title {
    font-weight: 500;
    font-size: 20px;
    margin: 14px 0;
  }
  .read-title {
    font-weight: 500;
    font-size: 20px;
    margin: 10px 0;
    color: #ffc001;
  }
  .read-card {
    margin-bottom: 8px;
    // .el-checkbox {
    //   display: block;
    // }
    .read-type {
      margin-top: 8px;
    }
  }
  .read-content {
    background-color: #f3ebeb;
    display: flex;
    justify-content: flex-start;
    padding-bottom: 14px;
    .want-read {
      margin: 0 8px;
      flex: 1;
    }
    .reading {
      margin: 0 8px;
      flex: 1;
    }
    .readed {
      margin: 0 8px;
      flex: 1;
    }
  }
}
</style>