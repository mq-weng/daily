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
    <div id="calendar" style="height: 800px"></div>
  </div>
</template>

<script lang="ts">
import Calendar from "tui-calendar"; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
export default {
  data() {
    return {
      calendar: null,
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
  // mounted(): void {
  //   (this as any).init();
  // },
  beforeDestroy(): void {
    (this as any).calendar.destroy();
    (this as any).calendar = null;
  },
  methods: {
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
      this.calendar.createSchedules(this.schedules); //
      // this.calendar.on("clickSchedule", function (event:any) {
      //   var schedule = event.schedule;
      //   let lastClickSchedule;
      //   // focus the schedule
      //   if (lastClickSchedule) {
      //     this.calendar.updateSchedule(
      //       lastClickSchedule.id,
      //       lastClickSchedule.calendarId,
      //       {
      //         isFocused: false,
      //       }
      //     );
      //   }
      //   this.calendar.updateSchedule(schedule.id, schedule.calendarId, {
      //     isFocused: true,
      //   });

      //   lastClickSchedule = schedule;

      //   // open detail view
      // });
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
          if(res.data.state == "success"){
            this.$message.success(res.data.message)
            location.reload();
          }else{
            this.$message.error(res.data.message)
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