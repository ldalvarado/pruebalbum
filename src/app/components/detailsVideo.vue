<template>
    <div class="mt-5" >
        <iframe width="100%" height="600" :src="'https://www.youtube.com/embed/'+details.id"></iframe>
    </div>
</template>

<script>
    export default {
        props:{
            details:{
                type: Object,
                default: {},
            },
        }
    }
</script>