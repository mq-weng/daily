<template>
  <div class="schedule">
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
    };
  },
  mounted():void {
    (this as any).init();
  },
  beforeDestroy():void {
      (this as any).calendar.destroy();
      (this as any).calendar = null;
  },
  methods: {
    init(): void {
      (this as any).calendar = new Calendar("#calendar", {
        defaultView: "month",
        taskView: true,
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
    },
  },
};
</script>