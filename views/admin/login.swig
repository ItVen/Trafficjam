<!-- {% extends '../base/layout.swig' %}
{% set module = 'admin/login' %}
{% block title -%}欢迎登录{%- endblock %}
{% block form_content -%} -->
  
   <!--  dfsgnjdfngjksdfsgkfgksdfghsjdfkgsdjfhgjksdhruhjkej
{%- endblock %} -->
{% extends '../base/layout.swig' %}
{# 声明本页面调用的模块 #}
{% set module = 'page/feedback' -%}

{% block title -%}feedback{%- endblock %}
{% block content -%}

  <form class="ui form" action="/web/login" method="post">
        <h1 class="ui dividing header">登录</h1>
        
        {% if err -%}
            <div class="ui error message" style="display: block">
                <div class="header">登录失败</div>
                <p>账号或密码错误</p>
            </div>
        {%- endif %}
         <div class="field">
            <input id="username" name="username" type="text" placeholder="UserName">
        </div>
        <div class="field">
            <input id="password" name="password" type="password" placeholder="PassWorld"/>
        </div>
       
        <div class="field">
            <div class="ui buttons">
                <button class="ui positive button" type="submit">登录</button>
                
            </div>
        </div>
    </form>

{%- endblock %}