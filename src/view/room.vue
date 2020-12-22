<template>
  <div>hi {{ id }}</div>
</template>

<script>
export default {
  name: 'room',
  data() {
    return {
      id: this.$route.params.roomId,
    };
  },
};
</script>

<style></style>
