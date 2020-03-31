<template>

    <div class="navbar-header" @click="handleSidebarToggle">
        
        <button
            @click="mainmenuToggle"
            class="navbar-toggler"
            type="button"
        >
        <i class="fa fa-bars"></i>
        </button>

        <!-- <sidebar-collapse></sidebar-collapse> -->
    </div>



</template>
<script>

export default {
	name: 'sidebar-header',
    data(){
        return{
            clickable: true
        }
    },
	methods: {
        handleSidebarToggle(e){
            e.target.parentElement.classList.toggle('navbar-collapse');
        },

        mainmenuToggle(){
            document.body.classList.toggle('navbar-expand');
        }


	  }
}
</script>

<style lang="scss" scoped>
    .navbar {
        .navbar-brand{
            justify-content: flex-start;
            padding-left:10%;
        }
    }



</style>
