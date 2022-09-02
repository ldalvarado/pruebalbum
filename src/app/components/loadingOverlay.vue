<template>
    <loading-overlay-original v-bind="$props">
        <loading/>
    </loading-overlay-original>
</template>

<script>
    import loading from './loading.vue';
    export default {
        components: { loading },
        props:{
            active:{
                type: Boolean,
                default: false,
            },
            canCancel:{
                type: Boolean,
                default: false,
            },
            onCancel:{
                type: Function,
                default: ()=>{},
            },
            isFullPage:{
                type: Boolean,
                default: true,
            },
            transition:{
                type: String,
                default: 'fade',
            },
            color:{
                type: String,
                default: '#000',
            },
            zIndex:{
                type: Number,
                default: 9999,
            },
            height:{
                type: Number,
            },
            width:{
                type: Number,
            },
            loader:{
                type: String,
                default: 'spinner',
            },
            opacity:{
                type: Number,
                default: 0.5,
            },
            enforceFocus:{
                type: Boolean,
                default: true,
            },
            lockScroll:{
                type: Boolean,
                default: false,
            },
            blur:{
                type: String,
                default: '2px',
            }
        },
    }
</script>