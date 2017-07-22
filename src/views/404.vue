<style scoped>
    
</style>
<template>
    <div class="fontSize_32" style="text-align: center">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQBAMAAAAVaP+LAAAAGFBMVEUAAABTU1NNTU1TU1NPT09SUlJSUlJTU1O8B7DEAAAAB3RSTlMAoArVKvVgBuEdKgAAAJ1JREFUeF7t1TEOwyAMQNG0Q6/UE+RMXD9d/tC6womIFSL9P+MnAYOXeTIzMzMzMzMzaz8J9Ri6HoITmuHXhISE8nEh9yxDh55aCEUoTGbbQwjqHwIkRAEiIaG0+0AA9VBMaE89Rogeoww936MQrWdBr4GN/z0IAdQ6nQ/FIpRXDwHcA+JIJcQowQAlFUA0MfQpXLlVQfkzR4igS6ENjknm/wiaGhsAAAAASUVORK5CYII=">
        <p style="padding-top: 30px">未连接到互联网。</p>
    </div>
</template>
<script>

    export default {
        filters: {
        },
        data () {
            return {

            }
        },
        ready () {
            this.$dispatch('isLoading',false)

            localStorage.removeItem('USER');

        },
        methods: {
            
        }
    }
</script>
