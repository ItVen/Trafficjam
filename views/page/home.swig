{% extends '../base/layout.swig' %}
{# 声明本页面调用的模块 #}
{% set module = 'page/home' -%}
{% block stylesheets -%}
<link href="{{ path.style }}/home.css" rel="stylesheet" type="text/css"/>
{%- endblock %}
{% block title -%}{{ title }}{%- endblock %}
{% block content -%}
<div class ='top'>
	<div class="top">
		<h2>Images</h2>
		<form class="ui form" action="/web/images" method="get">
			<button class="ui positive button" type="submit">Detatil</button>
		</form>
	</div>
</div>

{% for item in images -%}
<img class="home_image" src="{{ path.image }}{{item}}">
{%- endfor %}

<div>
	<div class="top">
		<h2>show info</h2>
		<form class="ui form" action="/web/info/detail" method="get">
			<button class="ui positive button" type="submit">Detatil</button>
		</form>
	</div>
	
	<div class = "info">
		<h3>reason</h3>
		<div class="top">
			{% for item in reason -%}
			<div class ="item" >
				<span>{{item}}</span>
			</div>
			
			{%- endfor %}
		</div>

		<h3>think</h3>
		<div class="top">
			{% for item in think -%}
			<div class ="item" >
				<span>{{item}}</span>
			</div>
			{%- endfor %}
		</div>

		<h3>fun</h3>

		{% for item in fun -%}
		<p>{{ item.fun }}</p>
		{%- endfor %}
	</div>
	
</div>
<div class="top">
	<h2>feedback</h2>
	
	<form class="ui form" action="/web/feedback" method="get">
		<button class="ui positive button" type="submit">Detatil</button>
	</form>
</div>
{% for item in feedback -%}
<p>{{ item.f_type }}</p>
<p>{{ item.f_content }}</p>
{%- endfor %}

{%- endblock %}