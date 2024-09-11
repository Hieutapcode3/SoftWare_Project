<?php
    function connectdb(){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "webtintuc";
        $conn = new mysqli($servername, $username, $password, $database);
    }
    function checkuser($user,$password) {
        $conn = connectdb();

    }
?>