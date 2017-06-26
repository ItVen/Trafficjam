{% extends 'base/layout.swig' %}
{# 声明本页面调用的模块 #}
{% set module = 'default/index' -%}

{% block title -%}上传数据测试{%- endblock %}
{% block content -%}
     <form class="ui form" action="/feedback" method="post">
        <h1 class="ui dividing header">请上传数据测试</h1>
        {% if err -%}
            <div class="ui error message" style="display: block">
                <div class="header">提交失败</div>
                <p>提交失败,请检查错误</p>
            </div>
        {%- endif %}
        <div class="field">
            <input id="f_type" name="f_type" type="text" placeholder="反馈类型"/>
        </div>
      
        <div class="field">
            <textarea id="f_content" name="f_content" placeholder="填写反馈内容"></textarea>
        </div>
        <div class="field">
            <div class="ui buttons">
                <button class="ui positive button" type="submit">提交</button>
                
            </div>
        </div>
    </form>
{%- endblock %}