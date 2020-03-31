<template>
  <li
    class="menu-item-has-children dropdown"
    :to="url"
    :class="className"
    @click="handleClick"
  >
    <a href="#" >
      <i class="menu-icon" :class="icon"></i>
      <span class="menu-title-text">{{name}}</span>
    </a>

    <ul
      class="sub-menu children dropdown-menu"
      :class="className"
      @click="handleClick"
    >
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data (){
    return{
      isShow: false
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    menuShowClick (e) {
      this.isShow = !this.isShow;
    //  e.target.parentElement.classList.toggle('show')
    },
    handleClick (e) {
      e.preventDefault()
      this.isShow = !this.isShow;

      if(this.name != 'Monitoramento') {
        if(this.name  == this.selected) {
          this.$store.dispatch('options/setSelected', '');
        } else {
          this.$store.dispatch('options/setSelected', this.name);
        }
      }
      //e.target.parentElement.classList.toggle('show')
      //this.isShow = !this.isShow;
    }
  },    
  computed: {
    ...mapGetters('options', ['selected']),
    className: function() {

      if(this.name == 'Monitoramento') {
        return this.isShow ? 'show' : '';
      }
      
      return this.selected == this.name ? 'show' : '';
    }
  }
}
</script>
