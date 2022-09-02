<template>
    <CElementCover
        :opacity="0.8"
    >   
        <div  :class="showByElement"></div>
    </CElementCover>
</template>
<script>
//computed 
function showByElement() {
    switch( this.element ){
        case 'table':
            return 'loading-icon';
        case 'select':
            return 'loading-select';
        default: 
            return 'loading-icon';
    }
}
export default {
    props:{
        element:{
            type: String,
            default: 'table'
        }
    },
    computed:{
        showByElement,
    }
};
</script>
