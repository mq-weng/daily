<template >
  <div>dggh{{ id }}</div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
    };
  },
  created() {
    this.getBook();
  },
  methods: {
    getBook() {
    //   this.$axios.get("/study/getBookList").then((res) => {
    //     let data = res.data;
    //     this.list0 = data.list0;
    //     this.list1 = data.list1;
    //     this.list2 = data.list2;
    //   });
    },
  },
};
</script>