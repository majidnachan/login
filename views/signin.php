<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>

	<style type="text/css">

	::selection { background-color: #E13300; color: white; }
	::-moz-selection { background-color: #E13300; color: white; }

	</style>
	<script>
		var base_url = "<?php echo base_url();?>";
	</script>
	<script src="<?php echo base_url();?>assets/js/jquery_min.js"></script>
	<script src="<?php echo base_url();?>assets/js/common.js"></script>
	<script src="<?php echo base_url();?>assets/js/auth.js"></script>
</head>
<body>

<div>
	<p>Log In</p>
	<div>
		<form id="sign-in">
			<input type="text" class="user-id-signin" placeholder="User ID"/>
			<input type="text" class="password-signin" placeholder="Password"/>
			<br/>
			<input type="submit" value="Submit"/>
		</form>
	</div>
</div>

</body>
</html>