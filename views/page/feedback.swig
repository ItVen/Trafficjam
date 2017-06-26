{% extends '../base/layout.swig' %}
{# 声明本页面调用的模块 #}
{% set module = 'page/feedback' -%}

{% block title -%}{{ title }}{%- endblock %}
{% block content -%}

<h1>{{ title }}</h1>
<ul>
	{% for item in data -%}
	<li>
		<div> 
			<h3>{{ item.f_type }}</h3>
			<span> {{ item.f_content }}</span>
		</div>
	</li>
	<div id = line></div>
	{%- endfor %}
</ul>

{%- endblock %}