<script>
import StatesBarChart from './StatesBarChart';

import PartnersMixin from './mixins/Partners';
import PartnersBarChartMixin from './mixins/PartnersBarChart';


export default StatesBarChart.extend({
  type: "donors",

  mixins: [
    PartnersMixin,
    PartnersBarChartMixin,
  ],

  data() {
    return {
      state_type: "donor",

      columns: {
        programmes: {
          source: "DPP",
          name: "Donor programme partners",
          type: String,
        },
        projects: {
          source: "PJDPP",
          name: "Donor project partners",
          type: Object,
        },
      },
    }
  },

  created() {
    // need to re-remove donors from filters, because it's re-added
    // by PartnersMixin. silly.
    const col = "donor"
    const idx = this.filter_by.indexOf(col)
    if (idx !== -1)
      this.filter_by.splice(idx, 1)
  },

  computed: {
    STATES() {
      return this.DONORS
    },

    longestText() {
      return this.longestDonor
    },

    clickFunc() {
      return this.toggleDonor
    },
  },

  methods: {
    handleFilterDonor() {
      this.handleStateFilter()
    },
  }
});
</script>
