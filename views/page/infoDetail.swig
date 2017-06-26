{% extends '../base/layout.swig' %}
{# 声明本页面调用的模块 #}
{% set module = 'page/infoDetail' -%}
{% block stylesheets -%}
<link href="{{ path.style }}/home.css" rel="stylesheet" type="text/css"/>
{%- endblock %}
{% block title -%}{{ title }}{%- endblock %}
{% block content -%}
<div>
	<div class="top">
		<h2>show info</h2>
		
	</div>
	
	<div class = "info">
		<div class="top">
			<h3 class = "h3">reason</h3>
			<!-- <form class="ui form" action="/feedback/show" method="get">
				<button class="ui positive button" type="submit">Add</button>
			</form> -->
			<div class ="fun_div">
				<form action="/info/add" method="post">
					<input id="reason" name="reason" type="text" placeholder="原因"/>
					
					<input id="think" name="think" type="text" placeholder="想法"/>
					<button class="ui positive button" type="submit">提交Add</button>

				</form>
				<form  action="/info/delet" method="post">

					<input id="reason" name="reason" type="text" placeholder="Delet原因"/>
					
					<input id="think" name="think" type="text" placeholder="Delet想法"/>
					<button class="ui positive button" type="submit">提交Delet</button>
					
					
				</form>

			</div>
		</div>
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

		<div class="top">
			<h3 class = "h3">fun</h3>
			<div class ="fun_div">
				<form class="ui form" action="/fun/add" method="post">
					<input id="fun" name="fun" type="text" placeholder="段子"/>
					<button class="ui positive button" type="submit">提交Add</button>
				</form>
				<form action="/fun/delet" method="post">
					<input  name="id" type="text" placeholder="Delet id"/>
					<button class="ui positive button" type="submit">提交Delte</button>
				</form>
			</div>
			
			
		</div>

		{% for item in fun -%}
		
		id:<i>{{ item.id }}</i>
		<p>{{ item.fun }}</p>
		{%- endfor %}
	</div>
	
</div>
{%- endblock %}
