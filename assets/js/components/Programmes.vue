<template>
  <div class="sidebar-tab-pane programmes"
       v-bind:class="{
        'is-selected': selected,
        'is-loading': loading
       }">
    <ul class="sidebar-tab-result-list" v-if="hasData">
      <li v-for="beneficiary in data.beneficiaries">
        <div class="sidebar-result-news">
          <div class="body">
            <div class="title-wrapper">
                <div class="flag">
                    <img :src="`/assets/imgs/${get_flag_name(beneficiary.id)}.png`"/>
                </div>
                <h3 class="title">{{ get_country_name(beneficiary.id) }}</h3>
                <small>({{ beneficiary.programmes.length }} programmes, {{ beneficiary.projectcount }} projects)</small>
            </div>
            <ul class="programme-list">
               <li v-for="programme in beneficiary.programmes"  class="programme-item">
                 <div  @click="toggleContent($event)" class="programme-item-header"> {{ programme.name }} </div>
                 <div class="programme-sublist-wrapper">
                   <small class="programme-sublist-header">{{ programme.sector }}</small>
                   <ul class="programme-sublist">
                     <li class="programme-sublist-item"
                         v-for="n in programme.projectcount"
                         v-if="n <= 10"
                     >
                       Lorem ipsum {{ n }}
                     </li>
                   </ul>
                 </div>
               </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>

    <div class="small muted align-center">
      &ndash;
      <button type="button" class="btn-link">show 10 more results</button>
      |
      <a href="#search" class="muted">show all</a>
      &ndash;
    </div>

  </div>
</template>

<style lang="less">
.programmes{
  li {
    list-style-type: none;
    color: initial;
  }

  .programme-list {
    margin-left: .5rem;
    padding-left: 0;
  }

  .programme-sublist-wrapper {
    display: none;
  }

  .active .programme-sublist-wrapper     {
    display: block;
  }

  .programme-sublist {
    padding-left: 0;
    margin-left: 2rem
  }

  .programme-sublist-item {
    margin: 1rem 0;
  }

  .programme-sublist-item:before {
    content: "●";
    margin-right: .5rem;
    color: #3D90F3;
  }


  .flag {
    width: 30px;
    height: 20px;
    img {
        width: 100%;
    }
  }

  .ind-count {
    display: inline;
    font-size: 2rem;
    color: black;
  }

  .title {
    color: #444;
  }

  .programme-item:before {
    display: inline-block;
    content: "►";
    margin-right: .5rem;
    transition: all 300ms;
  }

  .programme-item {
    margin: 1rem 0;
    font-size: 1.3rem;
  }

  .programme-item-header {
    display: inline;
    cursor: pointer;
  }

  .programme-item.active{
    color: #005494;
    &:before {
        transform: rotate(90deg);
    }
  }

  .title-wrapper > * {
    display: inline-block;
    margin-right: .5rem;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  .country_thumbnail {
    display: inline-block;
    width: 24px;
    margin-right: .5rem;
  }


}
</style>

<script>

import Vue from 'vue';
import * as d3 from 'd3';

import BaseMixin from './mixins/Base';
import WithCountriesMixin, {COUNTRIES, get_flag_name} from './mixins/WithCountries';

export default Vue.extend({
  mixins: [
    BaseMixin, WithCountriesMixin,
  ],

  props: {
    selected: {
      type: Boolean,
      default: false
    },
  },

  watch: {
    selected () { this.loadResults(); },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    projectcount() {
      // this could be useful to the parent?

      // NOTE: WARNING: TODO: this sum is in fact wrong, because a programme
      // can belong to multiple PAs. the sum per-beneficiary needs to be
      // provided by the backend.

      return data.projectcount;
    },

    data() {
      const dataset = this.filter(this.dataset);
      const beneficiaries = {};
      let totalcount = 0;

      for (const d of dataset) {
        const programmes = d.programmes;

        if (!programmes) continue;

        let beneficiary = beneficiaries[d.beneficiary];
        if (beneficiary === undefined)
          beneficiary = beneficiaries[d.beneficiary] = {
            _projectcount: 0,
          };

        for (const p in programmes) {
          const projectcount = +programmes[p];

          if (projectcount == 0) continue;

          let programme = beneficiary[p];
          if (programme === undefined)
            programme = beneficiary[p] = {
              sector: d.sector,
              projectcount: 0,
            };

          programme.projectcount += projectcount;
          beneficiary._projectcount += projectcount;
          totalcount += projectcount;
        }
      }

      const out = {
        beneficiaries: [],
        projectcount: totalcount,
      };

      for (const b in beneficiaries) {
        const programmes = beneficiaries[b],
              beneficiary = {
                id: b,
                programmes: [],
              };

        out.beneficiaries.push(beneficiary);

        for (const p in programmes) {
          const value = programmes[p];
          if (p === '_projectcount') {
            beneficiary.projectcount = value;
            continue;
          }
          beneficiary.programmes.push(Object.assign({name: p}, value));
        }
      }

      return out;
    },
  },

  methods: {
    loadResults() {
      /*
      var self = this;
      self.loading = true;

      window.setTimeout(function() {
        // simulate ajax call
        self.loading = false;
      }, 1000);
      */
    },
    toggleContent(e) {
      //remove comment if you want to toggle between elements

      // let all_programe_items = this.$el.querySelectorAll('.programme-item');
      // for (let item of all_programe_items){
      //     if(item.classList.contains('active'))
      //         item.classList.remove('active')
      // }

      const target = e.target.parentNode
      if(target.classList.contains('active')){
        target.classList.remove('active')
      }
      else {
        target.classList.add('active')
      }
    },

    handleFilter() {
      // vue-only component, doesn't need any special handling
      return;
    },
  },
});

</script>