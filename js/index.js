var signup = document.getElementById("signup");
var login = document.getElementById("login");
signup.addEventListener("click",function () {
    var username = document.getElementById('userName').value;
    var passwd = document.getElementById('password').value;
    var passwdre = document.getElementById("passwordRe").value;
    var tip1 = document.getElementById("ustip");
    var tip2 = document.getElementById("pdtip");
    var tip3 = document.getElementById("pdrtip");
    var regx1 = /^[a-zA-Z0-9]{1,25}$/;
    var regx2 = /^[a-zA-Z0-9]{6,16}$/;
    function tips(i,msg) {
        if(i===1){
            tip1.innerText = msg;
            tip2.innerText = "";
            tip3.innerText = "";
            document.getElementById('userName').focus();
        }
        else if(i===2){
            tip1.innerText = "";
            tip2.innerText = msg;
            tip3.innerText = "";
            document.getElementById('password').focus();
        }
        else if(i===3){
            tip1.innerText = "";
            tip2.innerText = "";
            tip3.innerText = msg;
            document.getElementById('passwordRe').focus();
        }
        else{
            tip1.innerText = "";
            tip2.innerText = "";
            tip3.innerText = "";
        }
    }
    if(username === "") tips(1,"用户名不能为空！！");
    else if(!regx1.test(username)) tips(1,"用户名必须为长度为25以下的英文字母或数字！！");
    else if(passwd === "") tips(2,"密码不能为空！！");
    else if(!regx2.test(passwd)) tips(2,"密码必须为6~16位英文字母或数字！！");
    else if(passwdre === "") tips(3,"请确认密码！！");
    else if(passwdre !== passwd) tips(3,"两次输入不一致！！");
    else{
        tips(4);
        enLoginOverly(true);
        var signupXhr = new XMLHttpRequest();
        signupXhr.open("GET","signup.php?username="+username+"&password="+passwd,true);
        signupXhr.onreadystatechange = function () {
            if(signupXhr.readyState===4 && signupXhr.status ===200){
                if(signupXhr.responseText === "success"){
                    enLoginOverly(false,"注册成功，正在登陆...",function () {
                        Cookies.set("FMTUser",username,{expires:1,path:''});
                        window.location.href="main.html";
                    });
                }else{
                    enLoginOverly(false,signupXhr.responseText,function () {
                        document.getElementById("loginOverly").style.visibility = "hidden";
                    });
                }
            }
        };
        signupXhr.send();
    }
});
login.addEventListener("click",function () {
    var username = document.getElementById('userName').value;
    var passwd = document.getElementById('password').value;
    if(username==""||passwd==""){
        enLoginOverly(true,"请输入用户名或密码!",function () {
            document.getElementById("loginOverly").style.visibility = "hidden";
        });
    }else{
        var loginXhr = new XMLHttpRequest();
        loginXhr.open("GET","login.php?username="+username+"&password="+passwd,true);
        enLoginOverly(true);
        loginXhr.onreadystatechange = function () {
            if(loginXhr.readyState===4&&loginXhr.status===200){
                if(loginXhr.responseText==="success"){
                    enLoginOverly(false,"登陆成功，正在跳转...",function () {
                        Cookies.set("FMTUser",username,{expires:1,path:''});
                        window.location.href="main.html";
                    });
                }else{
                    enLoginOverly(false,loginXhr.responseText,function () {
                        document.getElementById("loginOverly").style.visibility = "hidden";
                    });
                }
            }
        };
        loginXhr.send();
    }

});

function enLoginOverly(enable,msg,callback){
    if(enable){
        document.getElementById("loginMsg").innerText = msg===undefined? "登陆中...":msg;
        document.getElementById("loginOverly").style.visibility = "visible";
        if(callback) setTimeout(callback,1000);
    }
    else{
        document.getElementById("loginMsg").innerText = msg===undefined? "登陆中...":msg;
        if(callback) setTimeout(callback,1000);
    }
}
