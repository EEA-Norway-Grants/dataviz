{#- === ohai. i is a jinja template. === -#}

{#
Usage:

<div id="somecontainer">
  <script src="//dataviz-host/embed/grants/mechanisms.js" async></script>
</div>

#}

{%- autoescape false -%}
(function() {
{% for f in jsfiles -%}
  {% set s = 's%d' % (loop.index0) %}
  var {{ s }} = document.createElement("script");
  {{ s }}.type = "text/javascript";
  {{ s }}.src = "{{ f }}";
  {{ s }}.async = false;
  {{ s }}.defer = true;
  document.head.appendChild({{ s }});
{%- endfor %}

{% for f in cssfiles -%}
  {% set c = 'c%d' % (loop.index0) %}
  var {{ c }} = document.createElement("link");
  {{ c }}.rel = "stylesheet";
  {{ c }}.type = "text/css";
  {{ c }}.href = "{{ f }}";
  document.head.appendChild({{ c }});
{%- endfor %}

  {%- set elid = '%s-%s-%s' % (scenario, component, randomness) %}
  var _s = document.getElementsByTagName('script'), s;

  for (var i = _s.length - 1; i != 0; i--) {
    if (_s[i].src.indexOf("{{ embedurl }}") == 0) {
      s = _s[i];
      break;
    }
  }

  if (s === undefined) {
    console.error("script not found!");
    return;
  }

  var parent = document.createElement('div');
  parent.classList.add('dataviz');

  var el = document.createElement("div");
  el.id = "{{ elid }}";
  parent.appendChild(el)
  s.parentNode.insertBefore(parent, s);

{% set inlinescript -%}
  {#- careful: only apostrophes here, and double quotes below -#}
  (function() {
    function _() {
      if (window.$dataviz === undefined) {
        setTimeout(_, 16);
        return;
      }

      new {{ object|replace('components.', '$dataviz.') }}({
        el: '#{{ elid }}',
        propsData: {
          embedded: true,
  {% if opts %}
          opts: @@opts@@,
  {% endif %}
  {% for prop, value in props.items() %}
          {{ prop }}: '{{ value }}'
          {%- if not loop.last %},{% endif -%}
  {% endfor %}
        }
      });
    };
    _();
  })();
{% endset -%}

  {% set x = 'x' %}
  var {{ x }} = document.createElement("script");
  {{ x }}.type = "text/javascript";
  {{ x }}.text = "{{
    inlinescript
    |replace('\n', '')
    |replace(' ','')
    |replace('function_', 'function _')
    |replace('new$', 'new $')
    |replace('@@opts@@', opts)
  }}";
  s.parentNode.insertBefore({{ x }}, s);
})();
{%- endautoescape -%}
