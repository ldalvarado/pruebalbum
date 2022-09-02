<template>
    <div class="container">
        <loading-overlay :active="loading" :is-full-page="true" loader="bars"/>

        <CModal backdrop="static" size="xl" :visible="visibleStatic" @close="() => { visibleStatic = false }">
            <CModalHeader v-if="Object.keys(details).length !== 0">
                <CModalTitle>{{ details.title }}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div class="container" v-if="Object.keys(details).length !== 0">
                    <div class="row">
                        <div class="col-4">
                            <div style="position:relative" v-on:click="detailsVideo(item)">
                                <img :src="details.src" width="268" hspace="16" height="268" vspace="16"  />
                                <div style="position:absolute; top:0; left:0;">
                                    <img border="0"  src="http://www.legacycitychurch.com/media/cover_art/Play%20Button%20Overlay/playbutton.png" width="300" height="300"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-8">
                            <h6>{{ details.title }}</h6>
                            <p>{{ details.description }}</p>
                        </div>
                    </div>
                </div>
            </CModalBody>
        </CModal>

        <CCollapse :visible="visible">
            <div class="mb-3 mt-5">
                <label for="inputLabelVideo" class="form-label">Añadir nuevo video</label>
                <div class="input-group mb-3">
                    <input type="text" v-model="file_video" class="form-control" placeholder="https://www.youtube.com/watch?v=xgcLwtGlgLU" aria-label="https://www.youtube.com/watch?v=xgcLwtGlgLU" aria-describedby="button-addon2">
                    <button class="btn btn-primary" v-on:click="addVideo()" type="button" id="button-addon2">Añadir</button>
                </div>

                

                <div class="container">
                    <div class="row">
                        <div class="col-md-4 mb-3" v-for="(item, index) in file_array" :key="index">
                            <div class="w-100 imagen-muestra" :style="'background-image: url('+item.src+');'">
                                <span v-on:click="deleteVideo(item,index)" class="boton-especial">x</span>
                                <div v-on:click="modalsVideo(item)" style="width:100%;height:100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CCollapse>
        <CCollapse :visible="!visible">
            <div class="mb-3 mt-5">
                <button type="button" v-on:click="visible = !visible" class="btn btn-outline-primary"><i class="fa fa-history" aria-hidden="true"></i> Volver</button>

                <detailsVideo :details="details"></detailsVideo>
            </div>
        </CCollapse>
    </div>
</template>

<script>
    import detailsVideo from './components/detailsVideo.vue' 
    export default {
        data(){
            return{
                visible: true,
                loading: false,
                file_video:'',
                file_array: [],
                Toast: null,
                details: {},
                visibleStatic: false,
            }
        },
        setup() {
            
        },
        components:{
            detailsVideo
        },
        beforeMount(){
            this.Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })
        },
        mounted(){
            this.loading = true;
            fetch('/api/videos')
            .then(response => response.json())
            .then(data => {
                if(data.statusCode === 200){
                    this.file_array = data.body;
                }
            }).finally(() => {
                this.loading = false;
            })
        },
        methods:{
            addVideo(){
                if(this.file_video !== ''){
                    let video = this.file_video.split('=');
                    let videotext = video[1].replace('&t', '');
                    videotext = video[1].replace('&list', '');
                    this.loading = true;
                    fetch('https://www.googleapis.com/youtube/v3/videos?id='+videotext+'&key=AIzaSyCBiOdlkJ88yK170_OwWus560RrFS3nxTQ&part=snippet')
                    .then(response => response.json())
                    .then(data => {
                        if(data !== null){
                            if(Object.keys(data).length !== 0){
                                if(data.items.length > 0){
                                    const snippet = data.items[0].snippet;

                                    let values = {
                                        id: videotext,
                                        description : snippet.description,
                                        src :  snippet.thumbnails.maxres ? snippet.thumbnails.maxres.url : snippet.thumbnails.high.url,
                                        title : snippet.title,
                                        url: this.file_video,
                                    }
                                    fetch('/api/videos', {
                                        method: 'POST', // or 'PUT'
                                        body: JSON.stringify(values), // data can be `string` or {object}!
                                        headers:{
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(response => response.json())
                                    .then(respuesta => {
                                        if(respuesta.statusCode === 200){
                                            this.file_array.push(values);

                                            this.Toast.fire({
                                                icon: 'success',
                                                title: 'Se ha guardado su video'
                                            })
                                        };
                                    }).catch(error => console.error('Error:', error))
                                    .then(response => console.log('Success:', response));
                                }
                            }
                        }
                    }).finally(() => {
                        this.loading = false;
                    });

                    
                }
                /**/
            },
            modalsVideo(item){
                this.details = item;
                this.visibleStatic = true;
            },
            detailsVideo(){
                this.visible = false;
                this.visibleStatic = false;
            },
            deleteVideo(item,index){
                this.$swal.fire({
                    text: `¿Seguro que quieres eliminar este video?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#136AE4',
                    cancelButtonColor: '#d3d3d3',
                    confirmButtonText: 'ELIMINAR',
                    cancelButtonText: 'CANCELAR',
                    reverseButtons:true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        let values = {
                            id: item.id,
                            description : item.description,
                            src : item.src,
                            title : item.title
                        }

                        fetch('/api/videos/delete', {
                            method: 'POST', // or 'PUT'
                            body: JSON.stringify(values), // data can be `string` or {object}!
                            headers:{
                                'Content-Type': 'application/json'
                            }
                        }).then(response => response.json())
                        .then(respuesta => {
                            if(respuesta.statusCode === 200){
                                this.file_array.splice(index, 1);

                                this.Toast.fire({
                                    icon: 'success',
                                    title: 'Se ha eliminado su video'
                                })
                            };
                        }).catch(error => console.error('Error:', error))
                        .then(response => console.log('Success:', response));
                    }
                })
                
            }
        }
    }
</script>


<style lang="scss">
    .imagen-muestra{
        height: 300px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .boton-especial {
        background: #000;
        border-radius: 3px;
        color: #fff;
        /* border-color: #FFF; */
        border: 1px solid #fff;
        margin-top: 5px;
        float: right;
        padding: 10px;
        padding-top: 0px;
        padding-bottom: 4px;
        margin-right:5px;
        cursor:pointer;
    }
    .swal2-cancel{
        color: #136AE4 !important;
    }
</style>