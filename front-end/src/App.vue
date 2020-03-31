<template>
  <div id="app">
      <div v-if="monitorings" class="admin-container">
        <Sidebar :navItems="createNav"/>
        <div id="right-panel" class="right-panel">
          <div class="content pb-0">
              <transition enter-active-class="animated fadeIn">
                <router-view></router-view>
              </transition>
          </div>
        </div>
      </div>

    <div class="admin-container" v-else>
      <loader :color="'#fe1c45'" :borderWidth="10" :duration=".5" :size="70" :background="'#f1f1f7'"/>
    </div>

      
  </div>
</template>


<script>
import nav from './nav'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import AuthLayout from './layouts/AuthLayout.vue';
import { mapGetters } from 'vuex'
import { loaderDots } from '@nulldreams/vue-loading/src/components/dots'
import loader from '@nulldreams/vue-loading/src/components/loader'

export default {
  data () {
    return {
      nav: nav.items
    }
  },
  components: {
    AuthLayout,
    Header,
    Sidebar,
    loader
  },
  mounted() {
    this.$store.dispatch('monitorings/read');
    this.$store.dispatch('search/reset');
  },
  computed: {
    ...mapGetters('monitorings', ['monitorings']),
    ...mapGetters('search', ['search']),
    createNav: function() {
      var items = [{
        name: 'Monitoramento',
        icon: 'fa fa-dashboard',
        children: []
      },
      {
          divider: true
      },
      {
          title: true,
          name: 'Filtros'
      },
      {
        name: 'Ano',
        icon: 'fa fa-filter',
        children: [{
          name: '2020',
          url: '/dashboard/y/' + '2020',
          icon: 'fa fa-search'
        }]
      },
      {
        name: 'Mês',
        icon: 'fa fa-filter',
        children: []
      }, {
        name: 'Dia',
        icon: 'fa fa-filter',
        children: []
      }];

      for(var i in this.monitorings) {
        items[0].children.push({
            name: this.monitorings[i].name,
            url: '/dashboard/i/' + i,
            icon: 'fa fa-search'
        })
      }

      let year = new Date().getFullYear(), count = 1;

      while(year - 2020 > 0) {
        items[3].children.push({
          name: (2020 + count),
          url: '/dashboard/y/' + (2020 + count),
          icon: 'fa fa-search'
        });
        
        count++;
        year--;
      }

      let month = new Date().getMonth();

      let monthsName = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

      for(let i = new Date().getFullYear() == 2020 ? 1 : 0; i <= month; i++) {
        let monthNumber = new String(i+1).length == 1 ? '0' + new String(i+1) : new String(i+1);

        items[4].children.push({
          name: monthsName[i],
          url: '/dashboard/m/' + monthNumber,
          icon: 'fa fa-search'
        });
      }

      items[0].children.push({
        name: 'Novo',
        url: '/auth/register',
        icon: 'fa fa-plus'
      });

      if(this.search.month) {
        let maxDaysInMonth;

        if(this.search.month == (new Date().getMonth() + 1)) {
          maxDaysInMonth = new Date().getDate();
        } else{
          maxDaysInMonth = new Date(new Date().getFullYear(), this.search.month, 0).getDate()
        }

        for(let i = 1; i <= maxDaysInMonth; i++) {
          let number = i.toString().length == 2 ? i.toString() : '0' + i.toString();
          items[5].children.push({
              name: number,
              url: '/dashboard/d/' + number,
              icon: 'fa fa-search'
          });
        };
        return items;
      }

      return [items[0], items[1], items[2], items[3], items[4]];
    }
  }
}
</script>

<style lang="scss">
@import url('./assets/css/font-awesome.min.css');
@import url('./assets/css/themify-icons.css');
@import url('./assets/css/pe-icon-7-filled.css');
@import url('./assets/css/flag-icon.min.css');
@import url('./assets/css/cs-skin-elastic.css');

@import "./assets/scss/style";

button{
  cursor: pointer;
}


.img-avatar {
  height: 200px;
  width: 200px; 
  overflow: hidden;
}

.navbar .navbar-nav li.menu-item-has-children .sub-menu a {
  padding: 0px 0 2px 30px;
}

aside.left-panel .navbar .navbar-nav li a .menu-title-text {
  font-size: 12px;
}

.navbar-expand .navbar-toggler {
    display: block
}
.navbar-expand .navbar-collapse {
    display: block;
    flex-basis: auto;
}

</style>
