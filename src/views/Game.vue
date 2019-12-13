<template>
  <div class="container">
      <b-form-group id="input-group-3" label="Option:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.option"
          :options="cards"
          required
        ></b-form-select>
      </b-form-group>
      <button @click.prevent="addOption">submit</button>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
      return {
        form: {
          option: ''
        },
        cards: [{ text: 'Select One', value: null }, 'Rock', 'Scissor', 'Paper'],
        show: true
      }
    },
    methods: {
      addOption() {
        this.$store.dispatch('updatePosition', {room: this.$route.params.room, option: this.form.option})
      },
    },
    mounted: function() {
      this.$store.dispatch('fetchData', this.$route.params.room)
    }
}
</script>

<style>

</style>