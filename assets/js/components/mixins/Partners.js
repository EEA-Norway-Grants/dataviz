export default {
  type: "partners",

  data() {
    return {
      colours: {
        programmes: '#30b729',
        projects: '#fea500',
      },
    };
  },

  created() {
    this.filter_by.push('donor');

    for (const col of this.aggregate_on) {
      // remove the filtering
      if (typeof col == "object")
        delete col.filter_by;
    }

    for (const colspec of [
      {source: 'donor', destination: 'donors', type: String},
      {source: 'partnership_programmes', type: Object},
    ]) {
      this.aggregate_on.push(colspec);
    }
  },
};