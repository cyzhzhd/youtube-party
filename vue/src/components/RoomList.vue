<template>
  <div class="board">
    <ul class="roomlist-room">
      <div class="roomlist-room-wrapper create-room">
        <img src="../assets/image/plus.png" @click="createRoom" />
        <p>방 이름과 소개 메세지를 입력해주세요.</p>
        <div class="input wrapper">
          <div class="input-room-name">
            이름: <input type="text" v-model.trim="name" />
          </div>
          <div class="input-room-intro">
            소개: <input type="text" v-model.trim="desc" />
          </div>
        </div>
      </div>
      <li v-for="room in roomlist" :key="room.id">
        <router-link :to="{ name: 'room', params: { roomId: room.id } }">
          <div class="roomlist-room-wrapper">
            <div class="roomlist-cover-image">
              <img src="../assets/image/cover.png" />
            </div>
            <div class="roomlist-details-wrapper">
              <div class="roomlist-detail">
                <div>{{ room.name }}</div>
                <div>{{ room.host }}</div>
                <div>{{ room.numMembers }}</div>
              </div>
              <div class="roomlist-intro">{{ room.intro }}</div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchPartyList, createParty } from '../api/index.js';

export default {
  name: 'room-list',
  data() {
    return {
      name: '',
      desc: '',
      roomlist: [
        {
          name: 'room1',
          id: '12345',
          host: 'ehyun',
          numMembers: 0,
          intro: '아무거나 다봐',
        },
        {
          name: 'room2',
          id: '12346',
          host: 'ekwon',
          numMembers: 0,
          intro: '유행 지난 드라마 보는 방',
        },
        {
          name: 'room3',
          id: '12347',
          host: 'kwon',
          numMembers: 0,
          intro: '인기 드라마 몰아보기',
        },
        {
          name: 'room3',
          id: '12348',
          host: 'kwon',
          numMembers: 0,
          intro: '가수 ㅇㅇㅇ 방송 몰아보기',
        },
      ],
    };
  },

  created() {
    fetchPartyList().then((response) => {
      console.log(response);
    });
  },

  methods: {
    async createRoom() {
      console.log(this.name, this.desc);
      const options = {
        name: this.name,
        description: this.desc,
      };
      await createParty(options);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: #42b983;
  transition: 300ms;
}
.roomlist-room {
  display: flex;
  flex-wrap: wrap;
}
.roomlist-room-wrapper {
  border: 1px #9097fd solid;
  margin: 1rem;
}
.create-room {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
}
.create-room img {
  cursor: pointer;
  width: 50px;
}
.roomlist-details-wrapper {
  display: flex;
  flex-direction: column;
}
.roomlist-detail {
  display: flex;
  justify-content: space-around;
}
.roomlist-intro {
  text-align: center;
  border-top: 1px gainsboro solid;
}
</style>
