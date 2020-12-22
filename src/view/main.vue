<template>
  <div class="main-wrapper">
    <room-list class="room-list"></room-list>
    <friends-list class="friends-list"></friends-list>
  </div>
</template>

<script>
import RoomList from '../components/RoomList.vue';
import FriendsList from '../components/FriendsList.vue';

export default {
  components: {
    RoomList,
    FriendsList,
  },
};
</script>

<style>
.main-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas: 'roomList friendsList';
  height: 100vh;
}
.room-list {
  grid-area: roomList;
}

.friends-list {
  grid-area: friendsList;
  border-left: 1px #42b983 solid;
}
</style>
