<template>
  <div class="schedule">
    <div class="schedule-form">
      <el-form
        ref="newSchedule"
        :model="newSchedule"
        label-width="80px"
        style="width: 700px; margin: 20px auto"
        size="mini"
      >
        <!-- <el-form-item label="日程名称">
          <el-input v-model="newSchedule.title"></el-input>
        </el-form-item> -->
        <el-form-item label="日程内容">
          <el-input type="textarea" v-model="newSchedule.title"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="newSchedule.start"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="newSchedule.end"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-button @click="add" size="small" type="primary">新建日程</el-button>
      </el-form>
    </div>
    <div>
      <span style="font-size: 24px; margin-right: 10px">{{
        calendarDate
      }}</span>
      <el-button type="primary" size="small" @click="changeToday"
        >今天</el-button
      >
      <i class="el-icon-back my-el-icon" @click="movePre"></i>
      <i class="el-icon-right my-el-icon" @click="moveNext"></i>
    </div>
    <div id="calendar" style="height: 800px"></div>
  </div>
</template>
<script lang="ts">
import Calendar from "tui-calendar"; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import * as moment from "moment";
export default {
  data() {
    return {
      calendar: null,
      scheduleFlag: false,
      calendarDate: moment(Date.now()).format("YYYY MM"),
      schedules: [],
      newSchedule: {
        id: "",
        // calendarId: "1",
        title: "",
        category: "time",
        // body: "ffhdfdh",
        start: "",
        end: "",
      },
    };
  },
  created() {
    this.getSchedules();
  },
  beforeDestroy(): void {
    (this as any).calendar.destroy();
    (this as any).calendar = null;
  },
  methods: {
    changeToday() {
      this.calendar.today();
      this.calendarDate = moment(this.calendar._renderDate._date).format(
        "YYYY MM"
      );
    },
    movePre() {
      this.calendar.prev();
      this.calendarDate = moment(this.calendar._renderDate._date).format(
        "YYYY MM"
      );
    },
    moveNext() {
      this.calendar.next();
      this.calendarDate = moment(this.calendar._renderDate._date).format(
        "YYYY MM"
      );
    },
    init(): void {
      (this as any).calendar = new Calendar("#calendar", {
        defaultView: "month",
        template: {
          monthDayname: function (dayname) {
            return (
              '<span class="calendar-week-dayname-name">' +
              dayname.label +
              "</span>"
            );
          },
        },
      });
      this.calendar.createSchedules(this.schedules);
      this.calendar.on("clickSchedule", (event) => {
        var id = event.schedule.id;
        if (id) {
          this.open(id);
        }
      });
    },
    open(id) {
      this.$confirm("此操作将删除该日程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post("/schedule/deleteSchedule", { id: id }).then(
            (res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              location.reload();
            },
            (err) => {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    getSchedules() {
      //获取日程表,放在 this.schedules 里面
      this.$axios
        .get("/schedule/getScheduleList", {
          params: { userId: localStorage.getItem("userId") },
        })
        .then(
          (res) => {
            console.log(res.data.schedules);
            this.schedules = res.data.schedules;
            this.init();
          },
          (err) => {
            console.log(err);
          }
        );
    },
    add(): void {
      // this.schedules.push(this.newSchedule);
      let { title, start, end } = this.newSchedule;
      const param = {
        userId: localStorage.getItem("userId"),
        title,
        start,
        end,
      };
      this.$axios.post("schedule/addScheduleList", param).then(
        (res) => {
          if (res.data.state == "success") {
            this.$message.success(res.data.message);
            location.reload();
          } else {
            this.$message.error(res.data.message);
          }
        },
        (err) => {
          console.log(err);
        }
      );
      // this.calendar.createSchedules([this.newSchedule]);
      console.log(this.newSchedule);
    },
  },
};
</script>
<style lang="scss">
.my-el-icon {
  font-size: 32px;
  margin-left: 10px;
}
.my-el-icon:hover {
  color: blue;
  cursor: pointer;
}
</style>