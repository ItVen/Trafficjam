{% extends '../base/layout.swig' %}
{# 声明本页面调用的模块 #}
{% set module = 'page/image' -%}
{% block stylesheets -%}
<link href="{{ path.style }}/image.css" rel="stylesheet" type="text/css"/>
<style>
	.div{
		display: flex;
		width: 300px;
		height: 450px;
		margin-top: 10px;
		margin-left: 10px;
		flex-direction: column;
		text-align: center;
	}

	#name{
		font-size: 0.5rem;
	}
	img{
		margin-left: 25px;
	}
	/*span{
		margin-left: 10px;
	}*/
</style>
{%- endblock %}
{% block title -%}{{ title }}{%- endblock %}
{% block content -%}
<div class ='top'>
	<div class="top">
		<h2>Images</h2>
	</div>
	<div class = "form">
		<form method="post" action="/home/add" enctype="multipart/form-data" class="ui form">
			<input type="file" id="upload" name="upload">
			<input type="submit">
		</form>
		<form action="/home/delet" method="post">
			<input  name="name" type="text" placeholder="Delet name"/>
			<button class="ui positive button" type="submit">提交Delte</button>
		</form>
	</div>
	
</div>
<div class="top">
	{% for item in images -%}
	<div class="div">
		
		<img class="image" src="{{ path.image }}{{item}}" alt="{{item}}">
		<span id="name">{{item}}</span>

	</div>
	{%- endfor %}
</div>

{%- endblock %}