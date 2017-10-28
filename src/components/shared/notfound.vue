<template>
  <div id="notfound">
    <div class="message"></div>
    <b-message class="is-hidden-mobile" title="404 NOT FOUND" type="is-danger" :closable="false" size="is-large" has-icon>
    요청하신 페이지를 찾을 수 없습니다. ㅠㅠ
    </b-message>
    <b-message class="is-hidden-tablet is-block-mobile" title="404 NOT FOUND" type="is-danger" :closable="false" size="is-small" has-icon>
    요청하신 페이지를 찾을 수 없습니다. ㅠㅠ
    </b-message>
  </div>
</template>

<script>
export default {
  name: 'notfound',
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style src="../../assets/css/notfound.scss" scoped>