<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 15:42
 */
    $username = $_GET["username"];
    $passwd = $_GET["password"];
    if($username=="root"&&$passwd=="123456"){
        echo "success";
    }
    else{
        echo "用户名或密码错误，请重试";
    }
