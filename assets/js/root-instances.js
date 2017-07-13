/*
 * WARNING: this file is parsed in python.
 *          if you modify or rename it, make sure
 *          embedding code still works.
 */

import {default as Root} from './components/Root';
import * as components from './components';


export const Base = Root.extend({
  name: 'Base',

  components: {
    globalfilters: components.GlobalFilters,
    siteheader: components.Header,
  },
});


export const Index = Base.extend({
  name: 'Index',

  components: {
    overview: components.Overview,
  },
});


const Viz = Base.extend({
  components: {
    sidebar: components.Sidebar,
  },
});


export const Grants = Viz.extend({
  name: 'Grants',

  components: {
    mechanisms: components.Mechanisms,
    sectors: components.Sectors,
    xmap: components.AllocationMap,
    beneficiaries: components.Beneficiaries,
    overview: components.Summary,
    programmes: components.Programmes,
    results: components.Results,
  },
});

export const Projects = Viz.extend({
  name: 'Projects',

  components: {
    mechanisms: components.ProjectsMechanisms,
    sectors: components.ProjectsSectors,
    xmap: components.ProjectsMap,
    beneficiaries: components.ProjectsBeneficiaries,
    overview: components.ProjectsSummary,
    programmes: components.Programmes,
    news: components.News,
  },
});
