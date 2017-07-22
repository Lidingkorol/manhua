<style scoped>
    @-webkit-keyframes fadeInLeft{
        0%{opacity:0;-webkit-transform:translate3d(-150%,-50%,0);transform:translate3d(-150%,-50%,0)}
        100%{opacity:1;}
    }

    @keyframes fadeInLeft{
        0%{opacity:0;-webkit-transform:translate3d(-150%,-50%,0);-ms-transform:translate3d(-150%,-50%,0);transform:translate3d(-150%,-50%,0)}
        100%{opacity:1;}
    }

    @-webkit-keyframes fadeOutRight{
        0%{opacity:1}
        100%{opacity:0;-webkit-transform:translate3d(150%,-50%,0);transform:translate3d(150%,-50%,0)}
    }

    @keyframes fadeOutRight{
        0%{opacity:1}
        100%{opacity:0;-webkit-transform:translate3d(150%,-50%,0);-ms-transform:translate3d(150%,-50%,0);transform:translate3d(150%,-50%,0)}
    }
	
	.public-show{
	    padding: .1rem .15rem;
	    -webkit-border-radius: .03rem;
	    -moz-border-radius: .03rem;
	    border-radius: .03rem;
	    background: rgba(0, 0, 0, .7);
	    position: fixed;
	    left: 50%;
	    margin:auto;
	    bottom: 50%;
	    max-width: 100%;
	    z-index: 9999;
	
	    color: #FFF;
	    font-size: .24rem;
	    -webkit-transform: translate3d(-50%, 100%, 0);
	    opacity: 1;
	
	}
	
	.public-toast {
	    padding: .1rem .15rem;
	    -webkit-border-radius: .03rem;
	    -moz-border-radius: .03rem;
	    border-radius: .03rem;
	    background: rgba(0, 0, 0, .7);
	    position: fixed;
	    left: 50%;
	    top: 50%;
	    z-index: 9999;
	    color: #FFF;
	    font-size: .12rem;
	    /*-webkit-transform: translateX(-50%);*/
	    -webkit-transform: translate3d(-50%, -50%, 0);
	    opacity: 1;
	}
</style>
<template>

    <!--confirm弹窗-->
    <div class="mask"  v-show="statusPop">
        <div class="client-pop animated" v-show="statusPop" transition="pop" transition-mode="out-in">
            <p>{{msg}}</p>
            <div class="client-btns">
                <slot></slot>
            </div>
        </div>
    </div>

    <!--toast弹窗-->
    <div class="public-toast animated" v-show="statusToast" transition="toast" transition-mode="out-in">{{msg}}</div>





</template>

<!--alert组件-->

<script>
    module.exports = {
        props:{
           msg:{
               type:String,
               default:''
           },
           statusPop:{
                type:Boolean,
               default:false
           },
            statusToast:{
                type:Boolean,
                default:false
            },
            delay:{
                type:Number,
                default:2000
            },



        },
        data() {
            return {



            }
        },
        watch:{
            statusPop(value){
                if(value)  this.$parent.statusToast=false;
            },
            statusToast(value){

                if(value)  this.$parent.statusPop=false;setTimeout(()=>{this.$parent.statusToast=false;},this.delay);
            }
        },
        ready() {


        },
        beforeDestroy() {

        },
        methods: {},
        transitions:{
            'pop':{
                enterClass:'zoomInLeft',
                leaveClass:'fadeOutUp'
            },
            'toast':{
                enterClass:'fadeInLeft',
                leaveClass:'fadeOutRight'
            }
        }

    }
</script>
