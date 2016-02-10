<?php
	class Validate_login {

		public $u ;
		public $s ;

		function __construct(){
			require_once('controller/auth_controller.php');
			$this->u = "";
			$this->s = "";
			$this->is_session_active();
		}

		public function is_session_active(){
			if(isset($_COOKIE['s']) && isset($_COOKIE['u'])){
				
			}else{
				echo "Session not valid";
			}
		}

	}

	$check_login = new Validate_login();
?>